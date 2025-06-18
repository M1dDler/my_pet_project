package io.github.m1ddler.my_pet_project.controller;

import io.github.m1ddler.my_pet_project.dto.PortfolioDTO;
import io.github.m1ddler.my_pet_project.service.interfaces.PortfolioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users/me")
@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
public class PortfolioController {
    private final PortfolioService portfolioService;

    @Autowired
    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }


    @GetMapping("/portfolios")
    public ResponseEntity<List<PortfolioDTO>> getCurrentUserPortfolios() {
        return portfolioService.getCurrentUserPortfolios();
    }

    @GetMapping("/portfolios/{id}")
    public ResponseEntity<PortfolioDTO> getCurrentUserPortfolioById(@PathVariable Long id) {
        return portfolioService.getCurrentUserPortfolioById(id);
    }

    @PostMapping("/portfolios")
    public ResponseEntity<PortfolioDTO> saveCurrentUserPortfolio(@RequestBody @Valid PortfolioDTO portfolioDTO) {
        return portfolioService.saveCurrentUserPortfolio(portfolioDTO);
    }

    @PutMapping("/portfolios/{id}")
    public ResponseEntity<PortfolioDTO> updatePortfolio(@PathVariable Long id,
                                                        @RequestBody @Valid PortfolioDTO portfolioDTO) {
        return portfolioService.updateCurrentUserPortfolioById(id, portfolioDTO);
    }

    @DeleteMapping("/portfolios/{id}")
    public ResponseEntity<Void> deletePortfolio(@PathVariable Long id) {
        return portfolioService.deleteCurrentUserPortfolioById(id);
    }
}
