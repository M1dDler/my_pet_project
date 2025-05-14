package io.github.m1ddler.my_pet_project.dto;

import io.github.m1ddler.my_pet_project.entity.Portfolio;

import java.util.List;

public class UserDTO {
    private final int id;
    private final String userName;
    private final String email;
    private final List<Portfolio> portfolios;

    public UserDTO(int id, String userName, String email, List<Portfolio> portfolios) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.portfolios = portfolios;
    }

    public int getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public String getEmail() {
        return email;
    }

    public List<Portfolio> getPortfolios() {
        return portfolios;
    }
}
