package io.github.m1ddler.my_pet_project.service;

import io.github.m1ddler.my_pet_project.dao.PortfolioRepository;
import io.github.m1ddler.my_pet_project.dao.UserRepository;
import io.github.m1ddler.my_pet_project.dto.PortfolioDTO;
import io.github.m1ddler.my_pet_project.entity.Portfolio;
import io.github.m1ddler.my_pet_project.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PortfolioServiceImpl implements PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final UserService userService;

    @Autowired
    public PortfolioServiceImpl(PortfolioRepository portfolioRepository, UserService userService) {
        this.portfolioRepository = portfolioRepository;
        this.userService = userService;
    }


    @Override
    public ResponseEntity<List<PortfolioDTO>> getCurrentUserPortfolios() {
        List<Portfolio> portfolios = userService.getAuthenticatedUser().getPortfolios();

        List<PortfolioDTO> portfoliosDTO = portfolios.stream()
                .map(this::portfolioToPortfolioDTO)
                .toList();

        return ResponseEntity.status(HttpStatus.OK).body(portfoliosDTO);
    }

    private PortfolioDTO portfolioToPortfolioDTO(Portfolio portfolio) {
        return new PortfolioDTO(
                portfolio.getId(),
                portfolio.getName(),
                portfolio.getTotalValue(),
                portfolio.getTransactions()
        );
    }
}
