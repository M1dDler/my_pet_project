package io.github.m1ddler.my_pet_project.service;

import io.github.m1ddler.my_pet_project.dao.TransactionRepository;
import io.github.m1ddler.my_pet_project.dto.TransactionDTO;
import io.github.m1ddler.my_pet_project.entity.Portfolio;
import io.github.m1ddler.my_pet_project.entity.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements TransactionService {
    private final UserService userService;
    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionServiceImpl(UserService userService, TransactionRepository transactionRepository) {
        this.userService = userService;
        this.transactionRepository = transactionRepository;
    }


    @Override
    public ResponseEntity<List<TransactionDTO>> getCurrentUserTransactionsByPortfolioId(Long portfolioId) {
        Portfolio portfolio = userService.getAuthenticatedUser().getPortfolios()
                .stream().filter(p -> p.getId() == portfolioId).findFirst().orElse(null);

        if (portfolio == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        List<TransactionDTO> transactionsDTO = portfolio.getTransactions().stream()
                .map(this::transactionToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(transactionsDTO);
    }

    @Override
    public ResponseEntity<TransactionDTO> getCurrentUserTransactionByIdByPortfolioId(Long id, Long portfolioId) {
        Portfolio portfolio = userService.getAuthenticatedUser().getPortfolios()
                .stream().filter(p -> p.getId() == portfolioId).findFirst().orElse(null);

        if (portfolio == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Transaction transaction = portfolio.getTransactions()
                .stream().filter(t -> t.getId() == id).findFirst().orElse(null);

        if (transaction == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.status(HttpStatus.OK).body(transactionToDTO(transaction));
    }

    @Override
    public ResponseEntity<TransactionDTO> saveCurrentUserTransactionByPortfolioId(Long portfolioId,
                                                                                  TransactionDTO tDTO) {
        Portfolio portfolio = userService.getAuthenticatedUser().getPortfolios()
                .stream().filter(p -> p.getId() == portfolioId).findFirst().orElse(null);

        if (portfolio == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Transaction transaction = new Transaction(tDTO.getCoinName(), tDTO.getQuantity(), tDTO.getPricePerUnit(),
                tDTO.getTransactionDate(), tDTO.getFee(), tDTO.getNote(), portfolio);

        return ResponseEntity.status(HttpStatus.CREATED).body(transactionToDTO(transactionRepository.save(transaction)));
    }

    @Override
    public ResponseEntity<TransactionDTO> updateCurrentUserTransactionByIdByPortfolioId(Long id, Long portfolioId, TransactionDTO transactionDTO) {
        boolean changed = false;

        Portfolio portfolio = userService.getAuthenticatedUser().getPortfolios()
                .stream().filter(p -> p.getId() == portfolioId).findFirst().orElse(null);

        if (portfolio == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Transaction transaction = portfolio.getTransactions()
                .stream().filter(t -> t.getId() == id).findFirst().orElse(null);

        if (transaction == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

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
        Portfolio portfolio = userService.getAuthenticatedUser().getPortfolios()
                .stream().filter(p -> p.getId() == portfolioId).findFirst().orElse(null);

        if (portfolio == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Transaction transaction = portfolio.getTransactions()
                .stream().filter(t -> t.getId() == id).findFirst().orElse(null);

        if (transaction == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        transactionRepository.delete(transaction);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    private TransactionDTO transactionToDTO(Transaction t) {
        return new TransactionDTO(t.getId(), t.getCoinName(), t.getQuantity(),
                t.getPricePerUnit(), t.getTransactionDate(), t.getFee(), t.getNote());
    }
}
