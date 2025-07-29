package io.github.m1ddler.my_pet_project.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public class PortfolioDTO {
    private long id;
    @NotBlank(message = "Portfolio name cannot be empty")
    @Size(max = 30, message = "The name is too long. Maximum allowed is 30 characters")
    private String name;
    private BigDecimal totalValue;
    private int position;

    public PortfolioDTO(long id, String name, BigDecimal totalValue, int position) {
        this.id = id;
        this.name = name;
        this.totalValue = totalValue;
        this.position = position;
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

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }
}
