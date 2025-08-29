package io.github.m1ddler.my_pet_project.service.interfaces;

import io.github.m1ddler.my_pet_project.dto.CryptoCoinDTO;

import java.math.BigDecimal;
import java.util.List;

public interface CryptoDataService {
    BigDecimal getCoinPrice(String baseCoin, String quoteCoin);
    List<CryptoCoinDTO> getCryptoCoins();
}
