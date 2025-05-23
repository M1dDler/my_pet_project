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
    private final UserRepository userRepository;

    @Autowired
    public PortfolioServiceImpl(PortfolioRepository portfolioRepository, UserRepository userRepository) {
        this.portfolioRepository = portfolioRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ResponseEntity<List<PortfolioDTO>> getAllPortfolioByUserId(int userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.status(HttpStatus.OK).body(portfolioRepository.findAllByUserId(userId).stream()
                .map(p -> new PortfolioDTO(p.getId(), p.getName(), p.getTotalValue(), p.getTransactions()))
                .toList());
    }

    @Override
    public ResponseEntity<PortfolioDTO> getPortfolioByUserIdAndPortfolioId(int userId, int portfolioId) {
        return ResponseEntity.status(HttpStatus.OK).body(portfolioRepository.findByUserIdAndId(userId, portfolioId)
                .map(p -> new PortfolioDTO(p.getId(), p.getName(), p.getTotalValue(), p.getTransactions()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
    }

    @Override
    public ResponseEntity<PortfolioDTO> savePortfolio(int userId, PortfolioDTO portfolioDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Portfolio portfolio = new Portfolio(portfolioDTO.getName(), user);
        portfolioRepository.save(portfolio);
        return  ResponseEntity.status(HttpStatus.OK).body(new PortfolioDTO(
                portfolio.getId(),
                portfolio.getName(),
                portfolio.getTotalValue(),
                portfolio.getTransactions()
        ));
    }

    @Override
    public ResponseEntity<PortfolioDTO> updatePortfolio(int userId, int portfolioId, PortfolioDTO portfolioDTO) {
        boolean changed = false;

        Portfolio portfolio = portfolioRepository.findByUserIdAndId(userId, portfolioId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (!portfolio.getName().equals(portfolioDTO.getName())) {
            portfolio.setName(portfolioDTO.getName());
            changed = true;
        }

        if (changed){
            portfolioRepository.save(portfolio);
            return ResponseEntity.status(HttpStatus.OK).body(new PortfolioDTO(
                    portfolio.getId(),
                    portfolio.getName(),
                    portfolio.getTotalValue(),
                    portfolio.getTransactions()
            ));
        }
        else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
    }

    @Override
    public void deletePortfolio(int userId, int portfolioId) {
        Portfolio portfolio = portfolioRepository
                .findByUserIdAndId(userId, portfolioId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        portfolioRepository.delete(portfolio);
    }
}
