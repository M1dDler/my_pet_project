package io.github.m1ddler.my_pet_project.controller;

import io.github.m1ddler.my_pet_project.dto.PortfolioDTO;
import io.github.m1ddler.my_pet_project.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/portfolios")
public class PortfolioController {
    private final PortfolioService portfolioService;

    @Autowired
    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }


    @GetMapping("/me")
    public ResponseEntity<List<PortfolioDTO>> getCurrentUserPortfolios() {
        return portfolioService.getCurrentUserPortfolios();
    }

    @PostMapping("/me")
    public ResponseEntity<PortfolioDTO> addPortfolio(@RequestBody PortfolioDTO portfolioDTO) {
        return null;
    }

    @PutMapping("/me")
    public ResponseEntity<PortfolioDTO> updatePortfolio(@RequestBody PortfolioDTO portfolioDTO) {
        return null;
    }

    @DeleteMapping("/me")
    public void deletePortfolio() {
    }
}
