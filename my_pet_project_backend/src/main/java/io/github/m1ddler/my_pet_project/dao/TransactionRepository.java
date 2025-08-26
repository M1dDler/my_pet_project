package io.github.m1ddler.my_pet_project.dao;

import io.github.m1ddler.my_pet_project.dto.CoinQuantityDTO;
import io.github.m1ddler.my_pet_project.dto.PagedResponseDTO;
import io.github.m1ddler.my_pet_project.entity.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("""
       SELECT t FROM Transaction t
       WHERE t.portfolio.id = :portfolioId
       AND (:transactionType IS NULL OR t.transactionType = :transactionType)
       AND (:coinName IS NULL OR t.coinName = :coinName)
       """)
    Page<Transaction> findAllByPortfolioId(Long portfolioId, String transactionType, String coinName, Pageable pageable);
    Transaction findByIdAndPortfolioId(Long transactionId, Long portfolioId);
    boolean existsByIdAndPortfolioId(Long transactionId, Long portfolioId);
    @Query("SELECT new io.github.m1ddler.my_pet_project.dto.CoinQuantityDTO(t.coinName, SUM(t.quantity)) " +
            "FROM Transaction t " +
            "WHERE t.portfolio.id = :portfolioId " +
            "GROUP BY t.coinName")
    List<CoinQuantityDTO> findCoinQuantitiesGroupedByPortfolio(@Param("portfolioId") Long portfolioId);

}
