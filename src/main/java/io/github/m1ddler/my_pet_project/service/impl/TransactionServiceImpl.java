package io.github.m1ddler.my_pet_project.service.impl;

import io.github.m1ddler.my_pet_project.dao.PortfolioRepository;
import io.github.m1ddler.my_pet_project.dao.TransactionRepository;
import io.github.m1ddler.my_pet_project.dto.TransactionDTO;
import io.github.m1ddler.my_pet_project.entity.Portfolio;
import io.github.m1ddler.my_pet_project.entity.Transaction;
import io.github.m1ddler.my_pet_project.service.interfaces.TransactionService;
import io.github.m1ddler.my_pet_project.service.interfaces.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class TransactionServiceImpl implements TransactionService {
    private final UserService userService;
    private final TransactionRepository transactionRepository;
    private final PortfolioRepository portfolioRepository;

    @Autowired
    public TransactionServiceImpl(UserService userService, TransactionRepository transactionRepository,
                                  PortfolioRepository portfolioRepository) {
        this.userService = userService;
        this.transactionRepository = transactionRepository;
        this.portfolioRepository = portfolioRepository;
    }

    Logger log = LoggerFactory.getLogger(getClass());

    @Override
    public ResponseEntity<List<TransactionDTO>> getCurrentUserTransactionsByPortfolioId(Long portfolioId) {
        Portfolio portfolio = portfolioRepository.findByUserIdAndId(userService.getAuthenticatedUser().getId(), portfolioId)
                .orElse(null);

        if (portfolio == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        List<Transaction> transactions = transactionRepository.findAllByPortfolioId(portfolioId);

        List<TransactionDTO> transactionsDTO = transactions.stream()
                .map(this::transactionToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(transactionsDTO);
    }

    @Override
    public ResponseEntity<TransactionDTO> getCurrentUserTransactionByIdByPortfolioId(Long id, Long portfolioId) {
        if (userHasNoAccessToTransaction(id, portfolioId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Transaction transaction = transactionRepository.findByIdAndPortfolioId(id, portfolioId);

        return ResponseEntity.status(HttpStatus.OK).body(transactionToDTO(transaction));
    }

    @Transactional
    @Override
    public ResponseEntity<TransactionDTO> saveCurrentUserTransactionByPortfolioId(Long portfolioId,
                                                                                  TransactionDTO tDTO) {
        Portfolio portfolio = portfolioRepository.findByUserIdAndId(userService.getAuthenticatedUser().getId(), portfolioId)
                .orElse(null);

        if (portfolio == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Transaction transaction = new Transaction(tDTO.getCoinName(), tDTO.getQuantity(), tDTO.getPricePerUnit(),
                tDTO.getTransactionDate(), tDTO.getFee(), tDTO.getNote(), portfolio);

        Transaction savedTransaction = transactionRepository.save(transaction);
        BigDecimal transactionPrice = savedTransaction.getPricePerUnit().multiply(savedTransaction.getQuantity())
                .subtract(savedTransaction.getFee());

        portfolio.setTotalValue(portfolio.getTotalValue().add(transactionPrice));
        portfolioRepository.save(portfolio);
        return ResponseEntity.status(HttpStatus.CREATED).body(transactionToDTO(savedTransaction));
    }

    @Override
    public ResponseEntity<TransactionDTO> updateCurrentUserTransactionByIdByPortfolioId(Long id, Long portfolioId, TransactionDTO transactionDTO) {
        boolean changed = false;

        if (userHasNoAccessToTransaction(id, portfolioId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Transaction transaction = transactionRepository.findByIdAndPortfolioId(id, portfolioId);

        if (!transactionDTO.getCoinName().equals(transaction.getCoinName())) {
            transaction.setCoinName(transactionDTO.getCoinName());
            changed = true;
        }

        if (!transactionDTO.getNote().equals(transaction.getNote())) {
            transaction.setNote(transactionDTO.getNote());
            changed = true;
        }

        if (changed) {
            transactionRepository.save(transaction);
            return ResponseEntity.status(HttpStatus.OK).body(transactionToDTO(transaction));
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Override
    public ResponseEntity<Void> deleteCurrentUserTransactionByIdByPortfolioId(Long id, Long portfolioId) {
        if (userHasNoAccessToTransaction(id, portfolioId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        transactionRepository.delete(transactionRepository.findByIdAndPortfolioId(id, portfolioId));
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    private boolean userHasNoAccessToTransaction(Long transactionId, Long portfolioId) {
        return !(portfolioRepository.existsByUserIdAndId(userService.getAuthenticatedUser().getId(), portfolioId)
                && transactionRepository.existsByIdAndPortfolioId(transactionId, portfolioId));
    }

    private TransactionDTO transactionToDTO(Transaction t) {
        return new TransactionDTO(t.getId(), t.getCoinName(), t.getQuantity(),
                t.getPricePerUnit(), t.getTransactionDate(), t.getFee(), t.getNote());
    }
}
