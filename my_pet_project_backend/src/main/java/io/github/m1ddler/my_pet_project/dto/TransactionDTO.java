package io.github.m1ddler.my_pet_project.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.validation.constraints.*;

public class TransactionDTO {
    private long id;
    @NotBlank(message = "Coin name cannot be empty or blank")
    @Pattern(regexp = "[A-Z]{1,10}", message = "The name can have a maximum of 10 uppercase characters")
    private String coinName;
    @NotNull(message = "Quantity of coins cannot be empty")
    @Positive(message = "Quantity of coins must be positive")
    private BigDecimal quantity;
    @NotNull(message = "Price per one coin cannot be empty")
    @Min(value = 0, message = "Price per one coin cannot be lower 0")
    private BigDecimal pricePerUnit;
    @NotNull(message = "Transaction date cannot be empty")
    private LocalDateTime transactionDate;
    @Min(value = 0, message = "Fee price cannot be lower 0")
    @NotNull(message = "Fee cannot be empty")
    private BigDecimal fee;
    private String note;
    @NotNull(message = "Transaction type cannot be empty")
    private String transactionType;

    public TransactionDTO(long id, String coinName, BigDecimal quantity, BigDecimal pricePerUnit,
                          LocalDateTime transactionDate, BigDecimal fee, String note, String transactionType) {
        this.id = id;
        this.coinName = coinName;
        this.quantity = quantity;
        this.pricePerUnit = pricePerUnit;
        this.transactionDate = transactionDate;
        this.fee = fee;
        this.note = note;
        this.transactionType = transactionType;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
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

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

}
