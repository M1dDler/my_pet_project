package io.github.m1ddler.my_pet_project.dto;

import java.math.BigDecimal;

public class PortfolioAggregatesDTO {
    private BigDecimal transferAmount;
    private BigDecimal buyAmount;
    private BigDecimal avgBuy;
    private BigDecimal sellAmount;
    private BigDecimal avgSell;

    public PortfolioAggregatesDTO(BigDecimal transferAmount, BigDecimal buyAmount, BigDecimal avgBuy, BigDecimal sellAmount, BigDecimal avgSell) {
        this.transferAmount = transferAmount;
        this.buyAmount = buyAmount;
        this.avgBuy = avgBuy;
        this.sellAmount = sellAmount;
        this.avgSell = avgSell;
    }

    public BigDecimal getTransferAmount() {
        return transferAmount;
    }

    public void setTransferAmount(BigDecimal transferAmount) {
        this.transferAmount = transferAmount;
    }

    public BigDecimal getBuyAmount() {
        return buyAmount;
    }

    public void setBuyAmount(BigDecimal buyAmount) {
        this.buyAmount = buyAmount;
    }

    public BigDecimal getAvgBuy() {
        return avgBuy;
    }

    public void setAvgBuy(BigDecimal avgBuy) {
        this.avgBuy = avgBuy;
    }

    public BigDecimal getSellAmount() {
        return sellAmount;
    }

    public void setSellAmount(BigDecimal sellAmount) {
        this.sellAmount = sellAmount;
    }

    public BigDecimal getAvgSell() {
        return avgSell;
    }

    public void setAvgSell(BigDecimal avgSell) {
        this.avgSell = avgSell;
    }
}
