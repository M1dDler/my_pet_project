package io.github.m1ddler.my_pet_project.dto;

import java.math.BigDecimal;

public class CoinSummaryDTO {
    private String coinName;
    private BigDecimal currentPricePerUnit;
    private double profitChangePercentage1h;
    private double profitChangePercentage24h;
    private double profitChangePercentage7d;
    private BigDecimal quantity;
    private BigDecimal avgBuy;
    private BigDecimal profitLoss;

    public CoinSummaryDTO(String coinName, BigDecimal currentPricePerUnit, double profitChangePercentage1h,
                          double profitChangePercentage24h, double profitChangePercentage7d, BigDecimal quantity,
                          BigDecimal avgBuy, BigDecimal profitLoss) {
        this.coinName = coinName;
        this.currentPricePerUnit = currentPricePerUnit;
        this.profitChangePercentage1h = profitChangePercentage1h;
        this.profitChangePercentage24h = profitChangePercentage24h;
        this.profitChangePercentage7d = profitChangePercentage7d;
        this.quantity = quantity;
        this.avgBuy = avgBuy;
        this.profitLoss = profitLoss;
    }

    public String getCoinName() {
        return coinName;
    }

    public void setCoinName(String coinName) {
        this.coinName = coinName;
    }

    public BigDecimal getCurrentPricePerUnit() {
        return currentPricePerUnit;
    }

    public void setCurrentPricePerUnit(BigDecimal currentPricePerUnit) {
        this.currentPricePerUnit = currentPricePerUnit;
    }

    public BigDecimal getProfitLoss() {
        return profitLoss;
    }

    public void setProfitLoss(BigDecimal profitLoss) {
        this.profitLoss = profitLoss;
    }

    public double getProfitChangePercentage1h() {
        return profitChangePercentage1h;
    }

    public void setProfitChangePercentage1h(double profitChangePercentage1h) {
        this.profitChangePercentage1h = profitChangePercentage1h;
    }

    public double getProfitChangePercentage24h() {
        return profitChangePercentage24h;
    }

    public void setProfitChangePercentage24h(double profitChangePercentage24h) {
        this.profitChangePercentage24h = profitChangePercentage24h;
    }

    public double getProfitChangePercentage7d() {
        return profitChangePercentage7d;
    }

    public void setProfitChangePercentage7d(double profitChangePercentage7d) {
        this.profitChangePercentage7d = profitChangePercentage7d;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getAvgBuy() {
        return avgBuy;
    }

    public void setAvgBuy(BigDecimal avgBuy) {
        this.avgBuy = avgBuy;
    }

    @Override
    public String toString() {
        return "coinName" + coinName + "\n"
                + "currentPricePerUnit" + currentPricePerUnit + "\n"
                + "profitChangePercentage1h" + profitChangePercentage1h + "\n"
                + "profitChangePercentage24h" + profitChangePercentage24h + "\n"
                + "profitChangePercentage7d" + profitChangePercentage7d + "\n"
                + "quantity" + quantity + "\n"
                + "avgBuy" + avgBuy + "\n"
                + "profitLoss" + profitLoss;
    }
}
