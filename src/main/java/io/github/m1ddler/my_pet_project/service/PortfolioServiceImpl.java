package io.github.m1ddler.my_pet_project.service;

import io.github.m1ddler.my_pet_project.dao.PortfolioRepository;
import io.github.m1ddler.my_pet_project.dao.UserRepository;
import io.github.m1ddler.my_pet_project.entity.Portfolio;
import io.github.m1ddler.my_pet_project.entity.User;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public List<Portfolio> getAllPortfolioByUserId(int userId) {
        return portfolioRepository.findAllByUserId(userId);
    }

    @Override
    public Portfolio getPortfolioByUserIdAndPortfolioId(int userId, int portfolioId) {
        return portfolioRepository.findByUserIdAndPortfolioId(userId, portfolioId)
                .orElseThrow(() -> new EntityNotFoundException("Portfolio with ID "+portfolioId+" for user with ID "+userId+" not found"));
    }

    @Override
    public Portfolio savePortfolio(int userId, Portfolio portfolio) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User with id " + userId + " not found"));
        portfolio.setUser(user);
        return portfolioRepository.save(portfolio);
    }

    @Override
    public void deletePortfolio(int userId, int portfolioId) {
        Portfolio portfolio = portfolioRepository
                .findByUserIdAndPortfolioId(userId, portfolioId)
                .orElseThrow(() -> new EntityNotFoundException("Portfolio not found or does not belong to user"));
        portfolioRepository.delete(portfolio);
    }
}
