package io.github.m1ddler.my_pet_project.service.impl;

import io.github.m1ddler.my_pet_project.config.PortfolioProperties;
import io.github.m1ddler.my_pet_project.dao.PortfolioRepository;
import io.github.m1ddler.my_pet_project.dto.PortfolioDTO;
import io.github.m1ddler.my_pet_project.dto.PortfolioPositionDTO;
import io.github.m1ddler.my_pet_project.entity.Portfolio;
import io.github.m1ddler.my_pet_project.entity.User;
import io.github.m1ddler.my_pet_project.service.interfaces.PortfolioService;
import io.github.m1ddler.my_pet_project.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PortfolioServiceImpl implements PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final UserService userService;
    private final PortfolioProperties portfolioProperties;

    @Autowired
    public PortfolioServiceImpl(PortfolioRepository portfolioRepository, UserService userService,
                                PortfolioProperties portfolioProperties) {
        this.portfolioRepository = portfolioRepository;
        this.userService = userService;
        this.portfolioProperties = portfolioProperties;
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
        User user = userService.getAuthenticatedUser();

        if (Objects.equals(countUserPortfolios(user), portfolioProperties.getMaxPortfolioCount())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        Portfolio portfolio = new Portfolio(portfolioDTO.getName(), user, portfolioDTO.isIncludeInTotal(),
                portfolioDTO.getAvatarIcon(), portfolioDTO.getAvatarColor());

        Integer maxPosition = portfolioRepository.findMaxPositionByUserId(user.getId()).orElse(-1);
        portfolio.setPosition(maxPosition + 1);

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

        boolean changed = false;

        if (!portfolioDTO.getName().equals(portfolio.getName())) {
            portfolio.setName(portfolioDTO.getName());
            changed = true;
        }

        if (!portfolioDTO.getAvatarIcon().equals(portfolio.getAvatarIcon())) {
            portfolio.setAvatarIcon(portfolioDTO.getAvatarIcon());
            changed = true;
        }

        if (!portfolioDTO.getAvatarColor().equals(portfolio.getAvatarColor())) {
            portfolio.setAvatarColor(portfolioDTO.getAvatarColor());
            changed = true;
        }

        if (changed) {
            portfolioRepository.save(portfolio);
            return ResponseEntity.status(HttpStatus.OK).body(portfolioToPortfolioDTO(portfolio));
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Override
    public ResponseEntity<Void> updateCurrentUserPortfoliosPosition(
            List<PortfolioPositionDTO> portfolioPositions){
        User user = userService.getAuthenticatedUser();
        Integer countOfUserPortfolios = countUserPortfolios(user);
        Set<Integer> uniquePositions = new HashSet<>();

        boolean isInvalid = portfolioPositions.isEmpty()
                || portfolioPositions.size() > countOfUserPortfolios
                || portfolioPositions.stream().anyMatch(Objects::isNull)
                || portfolioPositions.stream().anyMatch(p -> {
            Integer pos = p.getPosition();
            return pos == null || !uniquePositions.add(pos);
        });

        if (isInvalid) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        OptionalInt maxPosition = portfolioPositions.stream()
                .mapToInt(PortfolioPositionDTO::getPosition)
                .max();

        if (maxPosition.isPresent() && maxPosition.getAsInt() > countOfUserPortfolios) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        List<Long> portfolioIds = portfolioPositions.stream()
                .map(PortfolioPositionDTO::getId)
                .toList();

        List<Portfolio> portfolios = portfolioRepository.findPortfoliosByUserIdAndIds(user.getId(), portfolioIds)
                .orElse(null);

        if (portfolios == null) {return ResponseEntity.status(HttpStatus.NOT_FOUND).build();}

        Map<Long, Integer> idToPositionMap = portfolioPositions.stream()
                .collect(Collectors.toMap(PortfolioPositionDTO::getId, PortfolioPositionDTO::getPosition));

        for (Portfolio portfolio : portfolios) {
            Integer newPosition = idToPositionMap.get(portfolio.getId());
            if (newPosition != null) {
                portfolio.setPosition(newPosition);
            }
        }

        portfolioRepository.saveAll(portfolios);

        return ResponseEntity.status(HttpStatus.OK).build();
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

    private Integer countUserPortfolios(User user) {
        return portfolioRepository.countByUserId(user.getId());
    }

    private PortfolioDTO portfolioToPortfolioDTO(Portfolio portfolio) {
        return new PortfolioDTO(
                portfolio.getId(),
                portfolio.getName(),
                portfolio.getTotalValue(),
                portfolio.getPosition(),
                portfolio.isIncludeInTotal(),
                portfolio.getAvatarIcon(),
                portfolio.getAvatarColor()
        );
    }
}
