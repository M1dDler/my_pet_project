package io.github.m1ddler.my_pet_project.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public class PortfolioDTO {
    private long id;
    @NotBlank(message = "Portfolio name cannot be empty")
    @Size(max = 30, message = "The name is too long. Maximum allowed is 30 characters")
    private String name;
    private BigDecimal totalValue;
    private int position;
    private boolean includeInTotal;
    @NotBlank(message = "Avatar icon must not be blank")
    @Size(min = 1, max = 5, message = "Avatar icon must be exactly one character")
    private String avatarIcon;
    @Pattern(regexp = "^#([A-Fa-f0-9]{6})$", message = "Invalid hex color")
    private String avatarColor;

    public PortfolioDTO(long id, String name, BigDecimal totalValue, int position,
                        boolean includeInTotal, String avatarIcon, String avatarColor) {
        this.id = id;
        this.name = name;
        this.totalValue = totalValue;
        this.position = position;
        this.includeInTotal = includeInTotal;
        this.avatarIcon = avatarIcon;
        this.avatarColor = avatarColor;
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

    public boolean isIncludeInTotal() {
        return includeInTotal;
    }

    public void setIncludeInTotal(boolean includeInTotal) {
        this.includeInTotal = includeInTotal;
    }

    public String getAvatarIcon() {
        return avatarIcon;
    }

    public void setAvatarIcon(String avatarIcon) {
        this.avatarIcon = avatarIcon;
    }

    public String getAvatarColor() {
        return avatarColor;
    }

    public void setAvatarColor(String avatarColor) {
        this.avatarColor = avatarColor;
    }
}
