package io.github.m1ddler.my_pet_project.service;

import io.github.m1ddler.my_pet_project.dto.TransactionDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TransactionService {
    ResponseEntity<List<TransactionDTO>> getAllTransactionsByPortfolioId(int portfolioId);
    ResponseEntity<TransactionDTO> getTransaction(int transactionId, int portfolioId);
    ResponseEntity<TransactionDTO> saveTransaction(int portfolioId, TransactionDTO transactionDTO);
    ResponseEntity<TransactionDTO> updateTransaction(int transactionId, int portfolioId, TransactionDTO transactionDTO);
    void deleteTransaction(int transactionId);
}
