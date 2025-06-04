package io.github.m1ddler.my_pet_project.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegistrationRequestDTO {
    @NotBlank(message = "Username cannot be empty or blank")
    @Pattern(regexp = "^[a-z0-9]{3,}$",
             message = "Username must consist of at least three lowercase letters and must not contain special characters"
    )
    private String username;
    @NotBlank(message = "Email cannot be empty or blank")
    private String email;
    @NotBlank(message = "Password cannot be empty or blank")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Pattern(
            regexp = "^(?!\\d+$).{8,}$",
            message = "Password must be at least 8 characters and cannot be only digits"
    )
    private String password;

    public RegistrationRequestDTO() {}

    public RegistrationRequestDTO(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
