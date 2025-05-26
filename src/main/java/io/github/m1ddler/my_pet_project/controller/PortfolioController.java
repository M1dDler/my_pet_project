package io.github.m1ddler.my_pet_project.controller;

import io.github.m1ddler.my_pet_project.dto.PortfolioDTO;
import io.github.m1ddler.my_pet_project.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/{userId}")
public class PortfolioController {
    private final PortfolioService portfolioService;

    @Autowired
    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping("/portfolios")
    public ResponseEntity<List<PortfolioDTO>> getAllPortfolios(@PathVariable int userId) {
        return portfolioService.getAllPortfolioByUserId(userId);
    }

    @GetMapping("/portfolios/{portfolioId}")
    public ResponseEntity<PortfolioDTO> getPortfolio(@PathVariable int userId, @PathVariable int portfolioId) {
        return portfolioService.getPortfolioByUserIdAndPortfolioId(userId, portfolioId);
    }

    @PostMapping("/portfolios")
    public ResponseEntity<PortfolioDTO> addPortfolio(@PathVariable int userId, @RequestBody PortfolioDTO portfolioDTO) {
        return portfolioService.savePortfolio(userId, portfolioDTO);
    }

    @PutMapping("/portfolios/{portfolioId}")
    public ResponseEntity<PortfolioDTO> updatePortfolio(@PathVariable int userId, @PathVariable int portfolioId, @RequestBody PortfolioDTO portfolioDTO) {
        return portfolioService.updatePortfolio(userId, portfolioId, portfolioDTO);
    }

    @DeleteMapping("/portfolios/{portfolioId}")
    public void deletePortfolio(@PathVariable int userId, @PathVariable int portfolioId) {
        portfolioService.deletePortfolio(userId, portfolioId);
    }
}
