package io.github.m1ddler.my_pet_project.dao;

import io.github.m1ddler.my_pet_project.entity.Portfolio;
import io.github.m1ddler.my_pet_project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    List<Portfolio> findAllByUserId(Long userId);
    Optional<Portfolio> findByUserIdAndId(Long userId, Long portfolioId);
    boolean existsByUserIdAndId(Long userId, Long portfolioId);

    Long user(User user);
}
