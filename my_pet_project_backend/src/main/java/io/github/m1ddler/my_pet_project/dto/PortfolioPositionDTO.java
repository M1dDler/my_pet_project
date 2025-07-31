package io.github.m1ddler.my_pet_project.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public class PortfolioPositionDTO {
    @Min(value = 0, message = "ID must be zero or positive")
    private long id;
    @Min(value = 0, message = "Position must be zero or positive")
    private Integer position;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }
}
