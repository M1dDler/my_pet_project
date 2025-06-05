package io.github.m1ddler.my_pet_project.service;

import io.github.m1ddler.my_pet_project.dto.PortfolioDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PortfolioService {
    ResponseEntity<List<PortfolioDTO>> getCurrentUserPortfolios();
    ResponseEntity<PortfolioDTO> getCurrentUserPortfolioById(Long id);
    ResponseEntity<PortfolioDTO> saveCurrentUserPortfolio(PortfolioDTO portfolioDTO);
    ResponseEntity<PortfolioDTO> updateCurrentUserPortfolioById(Long id, PortfolioDTO portfolioDTO);
    ResponseEntity<Void> deleteCurrentUserPortfolioById(Long id);
}
