package io.github.m1ddler.my_pet_project.dto;

public class CryptoCoinDTO {
    private String id;
    private String symbol;
    private String coinName;

    public CryptoCoinDTO(String id, String symbol, String coinName) {
        this.id = id;
        this.symbol = symbol;
        this.coinName = coinName;
    }

    public CryptoCoinDTO() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCoinName() {
        return coinName;
    }

    public void setCoinName(String coinName) {
        this.coinName = coinName;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    @Override
    public String toString() {
        return "id=" + id + ", symbol=" + symbol + ", coinName=" + coinName + "\n";
    }
}
