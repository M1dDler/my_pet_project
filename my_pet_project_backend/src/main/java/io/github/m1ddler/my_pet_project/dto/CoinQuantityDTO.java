package io.github.m1ddler.my_pet_project.dto;

import java.math.BigDecimal;

public class CoinQuantityDTO {
    private String coinName;
    private BigDecimal quantity;

    public CoinQuantityDTO(String coinName, BigDecimal quantity) {
        this.coinName = coinName;
        this.quantity = quantity;
    }

    public String getCoinName() {
        return coinName;
    }

    public void setCoinName(String coinName) {
        this.coinName = coinName;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "Name: " + coinName + ", quantity: " + quantity;
    }
}
