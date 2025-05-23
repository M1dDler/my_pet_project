package io.github.m1ddler.my_pet_project.dto;

import io.github.m1ddler.my_pet_project.entity.Transaction;

import java.math.BigDecimal;
import java.util.List;

public class PortfolioDTO {
    private int id;
    private String name;
    private BigDecimal totalValue;
    private List<Transaction> transactions;

    public PortfolioDTO(int id, String name, BigDecimal totalValue, List<Transaction> transactions) {
        this.id = id;
        this.name = name;
        this.totalValue = totalValue;
        this.transactions = transactions;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(BigDecimal totalValue) {
        this.totalValue = totalValue;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }
}
