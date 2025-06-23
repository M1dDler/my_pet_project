package io.github.m1ddler.my_pet_project.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginRequestDTO {
    @NotBlank(message = "Enter your Username or Email")
    private String login;
    @NotBlank(message = "Enter your password")
    private String password;

    public LoginRequestDTO() {}

    public LoginRequestDTO(String login, String password) {
        this.login = login;
        this.password = password;
    }

    public String getLogin() {
        return login;
    }
    public void setLogin(String login) {
        this.login = login;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
