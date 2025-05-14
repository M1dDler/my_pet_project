package io.github.m1ddler.my_pet_project.dao;

import io.github.m1ddler.my_pet_project.entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PortfolioRepository extends JpaRepository<Portfolio, Integer> {
    List<Portfolio> findAllByUserId(int userId);
    Optional<Portfolio> findByUserIdAndPortfolioId(int userId, int portfolioId);
}
