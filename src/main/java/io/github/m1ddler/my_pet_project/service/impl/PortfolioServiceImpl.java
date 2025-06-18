package io.github.m1ddler.my_pet_project.service.impl;

import io.github.m1ddler.my_pet_project.dao.PortfolioRepository;
import io.github.m1ddler.my_pet_project.dto.PortfolioDTO;
import io.github.m1ddler.my_pet_project.entity.Portfolio;
import io.github.m1ddler.my_pet_project.service.interfaces.PortfolioService;
import io.github.m1ddler.my_pet_project.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
        List<Portfolio> portfolios = portfolioRepository.findAllByUserId(userService.getAuthenticatedUser().getId());

        List<PortfolioDTO> portfoliosDTO = portfolios.stream()
                .map(this::portfolioToPortfolioDTO)
                .toList();

        return ResponseEntity.status(HttpStatus.OK).body(portfoliosDTO);
    }

    @Override
    public ResponseEntity<PortfolioDTO> getCurrentUserPortfolioById(Long id) {
        Portfolio portfolio = portfolioRepository.findByUserIdAndId(userService.getAuthenticatedUser().getId(), id)
                .orElse(null);

        if (portfolio == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.status(HttpStatus.OK).body(portfolioToPortfolioDTO(portfolio));
    }

    @Override
    public ResponseEntity<PortfolioDTO> saveCurrentUserPortfolio(PortfolioDTO portfolioDTO) {
        Portfolio portfolio = new Portfolio(portfolioDTO.getName(), userService.getAuthenticatedUser());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(portfolioToPortfolioDTO(portfolioRepository.save(portfolio)));
    }

    @Override
    public ResponseEntity<PortfolioDTO> updateCurrentUserPortfolioById(Long id, PortfolioDTO portfolioDTO) {
        Portfolio portfolio = portfolioRepository.findByUserIdAndId(userService.getAuthenticatedUser().getId(), id)
                .orElse(null);

        if (portfolio == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        if (!portfolioDTO.getName().equals(portfolio.getName())) {
            portfolio.setName(portfolioDTO.getName());
            portfolioRepository.save(portfolio);
            return ResponseEntity.status(HttpStatus.OK).body(portfolioToPortfolioDTO(portfolio));
        }

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Override
    public ResponseEntity<Void> deleteCurrentUserPortfolioById(Long id){
        Portfolio portfolio = portfolioRepository.findByUserIdAndId(userService.getAuthenticatedUser().getId(), id)
                .orElse(null);

        if (portfolio == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        portfolioRepository.delete(portfolio);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    private PortfolioDTO portfolioToPortfolioDTO(Portfolio portfolio) {
        return new PortfolioDTO(
                portfolio.getId(),
                portfolio.getName(),
                portfolio.getTotalValue()
        );
    }
}
