package io.github.m1ddler.my_pet_project.service;

import io.github.m1ddler.my_pet_project.entity.Portfolio;

import java.util.List;

public interface PortfolioService {
    List<Portfolio> getAllPortfolioByUserId(int userId);
    Portfolio getPortfolioByUserIdAndPortfolioId(int userId, int portfolioId);
    Portfolio savePortfolio(int userId, Portfolio portfolio);
    void deletePortfolio(int userId, int portfolioId);
}
