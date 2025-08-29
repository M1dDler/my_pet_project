package io.github.m1ddler.my_pet_project.service.impl;

import io.github.m1ddler.my_pet_project.dao.PortfolioRepository;
import io.github.m1ddler.my_pet_project.dao.TransactionRepository;
import io.github.m1ddler.my_pet_project.dto.CoinSummaryDTO;
import io.github.m1ddler.my_pet_project.dto.PagedResponseDTO;
import io.github.m1ddler.my_pet_project.dto.CoinAggregatesDTO;
import io.github.m1ddler.my_pet_project.dto.TransactionDTO;
import io.github.m1ddler.my_pet_project.entity.Portfolio;
import io.github.m1ddler.my_pet_project.entity.Transaction;
import io.github.m1ddler.my_pet_project.service.interfaces.CryptoDataService;
import io.github.m1ddler.my_pet_project.service.interfaces.TransactionService;
import io.github.m1ddler.my_pet_project.service.interfaces.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class TransactionServiceImpl implements TransactionService {
    private final UserService userService;
    private final TransactionRepository transactionRepository;
    private final PortfolioRepository portfolioRepository;
    private final CryptoDataService cryptoDataService;

    @Autowired
    public TransactionServiceImpl(UserService userService, TransactionRepository transactionRepository,
                                  PortfolioRepository portfolioRepository, CryptoDataService cryptoDataService) {
        this.userService = userService;
        this.transactionRepository = transactionRepository;
        this.portfolioRepository = portfolioRepository;
        this.cryptoDataService = cryptoDataService;
    }

    Logger log = LoggerFactory.getLogger(getClass());

    @Override
    public ResponseEntity<PagedResponseDTO<TransactionDTO>> getCurrentUserTransactionsByPortfolioId(Long portfolioId,
                                                                             int page, int size, String transactionType, String coinName) {
        Portfolio portfolio = portfolioRepository
                .findByUserIdAndId(userService.getAuthenticatedUser().getId(), portfolioId)
                .orElse(null);

        if (portfolio == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Page<Transaction> transactions = transactionRepository.findAllByPortfolioId(
                portfolioId, transactionType, coinName, PageRequest.of(page, size)
        );

        Page<TransactionDTO> transactionsPageDTO = transactions.map(this::transactionToDTO);
        PagedResponseDTO<TransactionDTO> pagedResponse = PagedResponseDTO.from(transactionsPageDTO);

        return ResponseEntity.status(HttpStatus.OK).body(pagedResponse);
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

        if (Objects.equals(tDTO.getTransactionType(), "Sell") || Objects.equals(tDTO.getTransactionType(), "TransferOut")) {
            tDTO.setQuantity(tDTO.getQuantity().abs().negate());
        }

        Transaction transaction = new Transaction(tDTO.getCoinName(), tDTO.getQuantity(), tDTO.getPricePerUnit(),
                tDTO.getTransactionDate(), tDTO.getFee(), tDTO.getNote(), portfolio, tDTO.getTransactionType());

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

    @Override
    public ResponseEntity<List<CoinSummaryDTO>> getCoinsSummaries (BigDecimal currentPrice, Long portfolioId) {
        // USER ACCESS REQUIRED IMPLEMENTATION
        System.out.println("BTC price: " + cryptoDataService.getCoinPrice("bitcoin", "usd"));
//        System.out.println(cryptoDataService.getCryptoCoins());

        List<CoinAggregatesDTO> coinsAggregates = transactionRepository.findPortfolioCoinAggregates(portfolioId);
        List<CoinSummaryDTO> coinsSummaries = new ArrayList<>();

        for (CoinAggregatesDTO coinAggregates : coinsAggregates) {

            BigDecimal profit = (coinAggregates.getBuyAmount().add(coinAggregates.getTransferAmount()))
                    .multiply(currentPrice.subtract(coinAggregates.getAvgBuy()));

            BigDecimal loss = coinAggregates.getSellAmount().multiply(currentPrice.subtract(coinAggregates.getAvgSell()));

            CoinSummaryDTO coinSummary = new CoinSummaryDTO(
                    coinAggregates.getCoinName(),
                    currentPrice,
                    1,
                    1,
                    1, // Need to calculate in future
                    coinAggregates.getQuantity(),
                    coinAggregates.getAvgBuy(),
                    profit.add(loss)
            );
            coinsSummaries.add(coinSummary);
        }
        return ResponseEntity.status(HttpStatus.OK).body(coinsSummaries);
    }

    private boolean userHasNoAccessToTransaction(Long transactionId, Long portfolioId) {
        return !(portfolioRepository.existsByUserIdAndId(userService.getAuthenticatedUser().getId(), portfolioId)
                && transactionRepository.existsByIdAndPortfolioId(transactionId, portfolioId));
    }

    private TransactionDTO transactionToDTO(Transaction t) {
        return new TransactionDTO(t.getId(), t.getCoinName(), t.getQuantity(),
                t.getPricePerUnit(), t.getTransactionDate(), t.getFee(), t.getNote(), t.getTransactionType());
    }
}
