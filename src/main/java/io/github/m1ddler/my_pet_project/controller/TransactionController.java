package io.github.m1ddler.my_pet_project.controller;

import io.github.m1ddler.my_pet_project.dto.TransactionDTO;
import io.github.m1ddler.my_pet_project.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users/me/portfolios")
public class TransactionController {
    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }


    @GetMapping("/{portfolioId}/transactions")
    public ResponseEntity<List<TransactionDTO>> getCurrentUserTransactions(@PathVariable Long portfolioId) {
        return transactionService.getCurrentUserTransactionsByPortfolioId(portfolioId);
    }

    @GetMapping("/{portfolioId}/transactions/{id}")
    public ResponseEntity<TransactionDTO> getCurrentUserTransaction(@PathVariable Long id, @PathVariable Long portfolioId) {
        return transactionService.getCurrentUserTransactionByIdByPortfolioId(id, portfolioId);
    }

    @PostMapping("/{portfolioId}/transactions")
    public ResponseEntity<TransactionDTO> saveCurrentUserTransaction(@PathVariable Long portfolioId, @RequestBody @Valid TransactionDTO transactionDTO) {
        return transactionService.saveCurrentUserTransactionByPortfolioId(portfolioId, transactionDTO);
    }

    @PutMapping("/{portfolioId}/transactions/{id}")
    public ResponseEntity<TransactionDTO> updateTransaction(@PathVariable Long portfolioId,
                                                            @PathVariable Long id, @RequestBody TransactionDTO transactionDTO) {
        return transactionService.updateCurrentUserTransactionByIdByPortfolioId(id, portfolioId, transactionDTO);
    }

    @DeleteMapping("/{portfolioId}/transactions/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id, @PathVariable Long portfolioId) {
        return transactionService.deleteCurrentUserTransactionByIdByPortfolioId(id, portfolioId);
    }
}
