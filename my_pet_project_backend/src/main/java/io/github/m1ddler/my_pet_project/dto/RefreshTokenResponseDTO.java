package io.github.m1ddler.my_pet_project.dto;

public class RefreshTokenResponseDTO {
    private String accessToken;

    public RefreshTokenResponseDTO(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }
}
