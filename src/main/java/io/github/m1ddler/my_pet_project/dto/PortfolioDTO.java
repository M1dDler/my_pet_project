package io.github.m1ddler.my_pet_project.dto;

import io.github.m1ddler.my_pet_project.entity.Transaction;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.List;

public class PortfolioDTO {
    private long id;
    @NotBlank(message = "Portfolio name cannot be empty")
    @Size(max = 30, message = "The name is too long. Maximum allowed is 30 characters")
    private String name;
    private BigDecimal totalValue;
    private List<Transaction> transactions;

    public PortfolioDTO(long id, String name, BigDecimal totalValue, List<Transaction> transactions) {
        this.id = id;
        this.name = name;
        this.totalValue = totalValue;
        this.transactions = transactions;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
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
