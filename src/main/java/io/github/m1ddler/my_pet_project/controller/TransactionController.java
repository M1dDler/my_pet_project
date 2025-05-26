package io.github.m1ddler.my_pet_project.controller;

import io.github.m1ddler.my_pet_project.dto.TransactionDTO;
import io.github.m1ddler.my_pet_project.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/{userId}/portfolios/{portfolioId}")
public class TransactionController {
    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<TransactionDTO>> getAllTransactions(@PathVariable int portfolioId) {
        return transactionService.getAllTransactionsByPortfolioId(portfolioId);
    }

    @GetMapping("/transactions/{transactionId}")
    public ResponseEntity<TransactionDTO> getTransaction(@PathVariable int transactionId, @PathVariable int portfolioId) {
        return transactionService.getTransaction(transactionId, portfolioId);
    }

    @PostMapping("/transactions")
    public ResponseEntity<TransactionDTO> createTransaction(@PathVariable int portfolioId, @RequestBody @Valid TransactionDTO transactionDTO) {
        return transactionService.saveTransaction(portfolioId, transactionDTO);
    }

    @PutMapping("/transactions/{transactionId}")
    public ResponseEntity<TransactionDTO> updateTransaction(@PathVariable int transactionId,
                                                            @PathVariable int portfolioId, @RequestBody @Valid TransactionDTO transactionDTO) {
        return transactionService.updateTransaction(transactionId, portfolioId, transactionDTO);
    }

    @DeleteMapping("/transactions/{transactionId}")
    public void deleteTransaction(@PathVariable int transactionId){
        transactionService.deleteTransaction(transactionId);
    }
}
