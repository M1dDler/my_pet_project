package io.github.m1ddler.my_pet_project.dto;

public class AuthenticationResponseDTO {
    private final String accessToken;
    private final String refreshToken;


    public AuthenticationResponseDTO(String token, String refreshToken) {
        this.accessToken = token;
        this.refreshToken = refreshToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }
}
