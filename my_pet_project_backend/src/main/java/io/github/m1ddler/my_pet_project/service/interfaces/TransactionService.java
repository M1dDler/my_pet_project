package io.github.m1ddler.my_pet_project.service.interfaces;

import io.github.m1ddler.my_pet_project.dto.CoinQuantityDTO;
import io.github.m1ddler.my_pet_project.dto.PagedResponseDTO;
import io.github.m1ddler.my_pet_project.dto.TransactionDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TransactionService {
    ResponseEntity<PagedResponseDTO<TransactionDTO>> getCurrentUserTransactionsByPortfolioId(Long portfolioId, int page,
                                                                                             int size, String transactionType, String coinName);
    ResponseEntity<TransactionDTO> getCurrentUserTransactionByIdByPortfolioId(Long id, Long portfolioId);
    ResponseEntity<TransactionDTO> saveCurrentUserTransactionByPortfolioId(Long portfolioId, TransactionDTO transactionDTO);
    ResponseEntity<TransactionDTO> updateCurrentUserTransactionByIdByPortfolioId(Long id, Long portfolioId, TransactionDTO transactionDTO);
    ResponseEntity<Void> deleteCurrentUserTransactionByIdByPortfolioId(Long id, Long portfolioId);
    ResponseEntity<List <CoinQuantityDTO>> getCurrentUserCoinsQuantitiesFromTransactions(Long portfolioId);
}
