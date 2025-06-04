package io.github.m1ddler.my_pet_project.dto;

import io.github.m1ddler.my_pet_project.entity.Portfolio;
import io.github.m1ddler.my_pet_project.entity.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.util.List;

public class UserDTO {
    private final long id;
    private final Role role;
    @NotBlank(message = "Username cannot be empty or blank")
    @Pattern(regexp = "^[a-z0-9]{3,}$",
            message = "Username must consist of at least three lowercase letters and must not contain special characters"
    )
    private final String username;
    @NotBlank(message = "Email cannot be empty or blank")
    private final String email;
    private final List<Portfolio> portfolios;

    public UserDTO(long id, Role role, String username, String email, List<Portfolio> portfolios) {
        this.id = id;
        this.role = role;
        this.username = username;
        this.email = email;
        this.portfolios = portfolios;
    }

    public long getId() {
        return id;
    }

    public Role getRole() {
        return role;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public List<Portfolio> getPortfolios() {
        return portfolios;
    }
}
