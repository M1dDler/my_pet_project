package io.github.m1ddler.my_pet_project.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class TransactionDTO {
    private int id;
    @NotBlank(message = "Coin name cannot be empty or blank")
    private String coinName;
    @NotNull(message = "Quantity of coins cannot be null")
    @Positive(message = "Quantity of coins must be positive")
    private BigDecimal quantity;
    @NotNull(message = "Price per one coin cannot be null")
    @Positive(message = "Price per one coin must be positive")
    private BigDecimal pricePerUnit;
    @NotNull(message = "Transaction date cannot be null")
    private LocalDateTime transactionDate;
    @Min(value = 0, message = "Fee price cannot be lower 0")
    private BigDecimal fee;
    private String note;

    public TransactionDTO(int id, String coinName, BigDecimal quantity, BigDecimal pricePerUnit,
                          LocalDateTime transactionDate, BigDecimal fee, String note) {
        this.id = id;
        this.coinName = coinName;
        this.quantity = quantity;
        this.pricePerUnit = pricePerUnit;
        this.transactionDate = transactionDate;
        this.fee = fee;
        this.note = note;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public BigDecimal getPricePerUnit() {
        return pricePerUnit;
    }

    public void setPricePerUnit(BigDecimal pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
    }

    public LocalDateTime getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDateTime transactionDate) {
        this.transactionDate = transactionDate;
    }

    public BigDecimal getFee() {
        return fee;
    }

    public void setFee(BigDecimal fee) {
        this.fee = fee;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
