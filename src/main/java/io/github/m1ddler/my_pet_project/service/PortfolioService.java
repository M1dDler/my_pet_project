package io.github.m1ddler.my_pet_project.service;

import io.github.m1ddler.my_pet_project.dto.PortfolioDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PortfolioService {
    ResponseEntity<List<PortfolioDTO>> getAllPortfolioByUserId(int userId);
    ResponseEntity<PortfolioDTO> getPortfolioByUserIdAndPortfolioId(int userId, int portfolioId);
    ResponseEntity<PortfolioDTO> savePortfolio(int userId, PortfolioDTO portfolioDTO);
    ResponseEntity<PortfolioDTO> updatePortfolio(int userId, int portfolioId, PortfolioDTO portfolioDTO);
    void deletePortfolio(int userId, int portfolioId);
}
