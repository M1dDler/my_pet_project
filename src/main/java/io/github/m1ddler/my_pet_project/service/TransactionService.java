package io.github.m1ddler.my_pet_project.service;

import io.github.m1ddler.my_pet_project.dto.TransactionDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TransactionService {
    ResponseEntity<List<TransactionDTO>> getCurrentUserTransactionsByPortfolioId(Long portfolioId);
    ResponseEntity<TransactionDTO> getCurrentUserTransactionByIdByPortfolioId(Long id, Long portfolioId);
    ResponseEntity<TransactionDTO> saveCurrentUserTransactionByPortfolioId(Long portfolioId, TransactionDTO transactionDTO);
    ResponseEntity<TransactionDTO> updateCurrentUserTransactionByIdByPortfolioId(Long id, Long portfolioId, TransactionDTO transactionDTO);
    ResponseEntity<Void> deleteCurrentUserTransactionByIdByPortfolioId(Long id, Long portfolioId);
}
