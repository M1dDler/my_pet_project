package io.github.m1ddler.my_pet_project.dao;

import io.github.m1ddler.my_pet_project.dto.CoinQuantityDTO;
import io.github.m1ddler.my_pet_project.dto.PagedResponseDTO;
import io.github.m1ddler.my_pet_project.dto.PortfolioAggregatesDTO;
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
    @Query(value = """
    SELECT 
        COALESCE(SUM(CASE WHEN transaction_type = 'TransferIn' THEN quantity
                          WHEN transaction_type = 'TransferOut' THEN quantity ELSE 0 END), 0) AS transferAmount,
        COALESCE(SUM(CASE WHEN transaction_type = 'Buy' THEN quantity ELSE 0 END), 0) AS buyAmount,
        CASE WHEN SUM(CASE WHEN transaction_type = 'Buy' THEN quantity ELSE 0 END) > 0
             THEN SUM(CASE WHEN transaction_type = 'Buy' THEN quantity * price_per_unit ELSE 0 END)
                  / SUM(CASE WHEN transaction_type = 'Buy' THEN quantity ELSE 0 END)
             ELSE 0 END AS avgBuy,
        COALESCE(SUM(CASE WHEN transaction_type = 'Sell' THEN quantity ELSE 0 END), 0) AS sellAmount,
        CASE WHEN SUM(CASE WHEN transaction_type = 'Sell' THEN quantity ELSE 0 END) <> 0
             THEN SUM(CASE WHEN transaction_type = 'Sell' THEN quantity * price_per_unit ELSE 0 END)
                  / SUM(CASE WHEN transaction_type = 'Sell' THEN quantity ELSE 0 END)
             ELSE 0 END AS avgSell
    FROM transactions
    WHERE portfolio_id = :portfolioId
""", nativeQuery = true)
    PortfolioAggregatesDTO findPortfolioAggregates(@Param("portfolioId") Long portfolioId);

}
