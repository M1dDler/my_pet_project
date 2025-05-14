package io.github.m1ddler.my_pet_project.controller;

import io.github.m1ddler.my_pet_project.entity.Portfolio;
import io.github.m1ddler.my_pet_project.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolios")
public class PortfolioController {
    private final PortfolioService portfolioService;

    @Autowired
    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping("/users/{userId}")
    public List<Portfolio> getAllPortfolios(@PathVariable int userId) {
        return portfolioService.getAllPortfolioByUserId(userId);
    }

    @GetMapping("/users/{userId}/portfolios/{portfolioId}")
    public Portfolio getPortfolio(@PathVariable int userId, @PathVariable int portfolioId) {
        return portfolioService.getPortfolioByUserIdAndPortfolioId(userId, portfolioId);
    }

    @PostMapping("/users/{userId}/portfolios")
    public Portfolio addPortfolio(@PathVariable int userId, @RequestBody Portfolio portfolio) {
        return portfolioService.savePortfolio(userId, portfolio);
    }

    @PutMapping("/users/{userId}/portfolios")
    public Portfolio updatePortfolio(@PathVariable int userId, @RequestBody Portfolio portfolio) {
        return portfolioService.savePortfolio(userId, portfolio);
    }

    @DeleteMapping("/users/{userId}/portfolios/{portfolioId}")
    public void deletePortfolio(@PathVariable int userId, @PathVariable int portfolioId) {
        portfolioService.deletePortfolio(userId, portfolioId);
    }
}
