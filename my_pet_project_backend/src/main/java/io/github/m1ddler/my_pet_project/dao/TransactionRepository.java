package io.github.m1ddler.my_pet_project.dao;

import io.github.m1ddler.my_pet_project.dto.CoinAggregatesDTO;
import io.github.m1ddler.my_pet_project.entity.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

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
    @Query(value = """
    SELECT 
        t.coin_name AS coinName,
        COALESCE(SUM(CASE WHEN t.transaction_type = 'TransferIn' THEN t.quantity
                          WHEN t.transaction_type = 'TransferOut' THEN t.quantity ELSE 0 END), 0) AS transferAmount,
        COALESCE(SUM(CASE WHEN t.transaction_type = 'Buy' THEN t.quantity ELSE 0 END), 0) AS buyAmount,
        CASE WHEN SUM(CASE WHEN t.transaction_type = 'Buy' THEN t.quantity ELSE 0 END) > 0
             THEN SUM(CASE WHEN t.transaction_type = 'Buy' THEN t.quantity * t.price_per_unit ELSE 0 END)
                  / SUM(CASE WHEN t.transaction_type = 'Buy' THEN t.quantity ELSE 0 END)
             ELSE 0 END AS avgBuy,
        COALESCE(SUM(CASE WHEN t.transaction_type = 'Sell' THEN t.quantity ELSE 0 END), 0) AS sellAmount,
        CASE WHEN SUM(CASE WHEN t.transaction_type = 'Sell' THEN t.quantity ELSE 0 END) <> 0
             THEN SUM(CASE WHEN t.transaction_type = 'Sell' THEN t.quantity * t.price_per_unit ELSE 0 END)
                  / SUM(CASE WHEN t.transaction_type = 'Sell' THEN t.quantity ELSE 0 END)
             ELSE 0 END AS avgSell,
        SUM(t.quantity) AS totalQuantity
    FROM transactions t
    WHERE t.portfolio_id = :portfolioId
    GROUP BY t.coin_name
""", nativeQuery = true)
    List<CoinAggregatesDTO> findPortfolioCoinAggregates(@Param("portfolioId") Long portfolioId);

}
