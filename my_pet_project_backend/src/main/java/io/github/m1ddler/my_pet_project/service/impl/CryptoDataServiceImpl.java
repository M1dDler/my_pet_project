package io.github.m1ddler.my_pet_project.service.impl;

import io.github.m1ddler.my_pet_project.config.WebClientConfig;
import io.github.m1ddler.my_pet_project.dto.CryptoCoinDTO;
import io.github.m1ddler.my_pet_project.service.interfaces.CryptoDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
public class CryptoDataServiceImpl implements CryptoDataService {
    private final WebClient webClient;

    @Autowired
    public CryptoDataServiceImpl(WebClient webClient, WebClientConfig webClientConfig) {
        this.webClient = webClient;
    }

    @Override
    public BigDecimal getCoinPrice(String baseCoin, String quoteCoin) {
        Map<String, Map<String, BigDecimal>> response = webClient.get()
                .uri("/simple/price?ids={baseCoin}&vs_currencies={quoteCoin}", baseCoin, quoteCoin)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Map<String, BigDecimal>>>() {})
                .block();

        if (response != null && response.containsKey(baseCoin)) {
            return response.get(baseCoin).get(quoteCoin);
        }
        return BigDecimal.ZERO;
    }

    @Override
    @Cacheable("cryptoCoins")
    public List<CryptoCoinDTO> getCryptoCoins() {
        System.out.println("getCryptoCoins writing...");
        return webClient.get()
                .uri("/coins/list")
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<CryptoCoinDTO>>() {})
                .block();
    }
}
