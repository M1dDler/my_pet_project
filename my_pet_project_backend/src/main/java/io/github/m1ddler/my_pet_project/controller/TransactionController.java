package io.github.m1ddler.my_pet_project.controller;

import io.github.m1ddler.my_pet_project.dto.CoinQuantityDTO;
import io.github.m1ddler.my_pet_project.dto.PagedResponseDTO;
import io.github.m1ddler.my_pet_project.dto.TransactionDTO;
import io.github.m1ddler.my_pet_project.service.interfaces.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    public ResponseEntity<PagedResponseDTO<TransactionDTO>> getCurrentUserTransactions(@PathVariable Long portfolioId,
                                                                                       @RequestParam(defaultValue = "1") int page,
                                                                                       @RequestParam(defaultValue = "5") int size,
                                                                                       @RequestParam(required = false) String transactionType,
                                                                                       @RequestParam(required = false) String coinName
                                                                                      ) {

        return transactionService.getCurrentUserTransactionsByPortfolioId(portfolioId, page - 1, size, transactionType, coinName);
    }

    @GetMapping("/{portfolioId}/transactions/coins")
    public ResponseEntity<List <CoinQuantityDTO>> getCurrentUserCoinsFromTransactions(@PathVariable Long portfolioId) {
        return transactionService.getCurrentUserCoinsQuantitiesFromTransactions(portfolioId);
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
