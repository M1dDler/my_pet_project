package io.github.m1ddler.my_pet_project.dao;

import io.github.m1ddler.my_pet_project.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findAllByPortfolioId(Long portfolioId);
    Transaction findByIdAndPortfolioId(Long transactionId, Long portfolioId);
    boolean existsByIdAndPortfolioId(Long transactionId, Long portfolioId);
}
