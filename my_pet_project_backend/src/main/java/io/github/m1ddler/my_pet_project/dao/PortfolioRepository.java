package io.github.m1ddler.my_pet_project.dao;

import io.github.m1ddler.my_pet_project.entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    List<Portfolio> findAllByUserId(Long userId);
    Optional<Portfolio> findByUserIdAndId(Long userId, Long portfolioId);
    boolean existsByUserIdAndId(Long userId, Long portfolioId);
    @Query("SELECT MAX(p.position) FROM Portfolio p WHERE p.user.id = :userId")
    Optional<Integer> findMaxPositionByUserId(Long userId);
    @Query("SELECT p FROM Portfolio p WHERE p.user.id = :userId AND p.id IN :portfolioIds")
    Optional<List<Portfolio>> findPortfoliosByUserIdAndIds(long userId, List<Long> portfolioIds);
}
