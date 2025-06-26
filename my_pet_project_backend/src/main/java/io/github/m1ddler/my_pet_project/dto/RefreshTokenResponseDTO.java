package io.github.m1ddler.my_pet_project.dto;

import java.util.Date;

public class RefreshTokenResponseDTO {
    private String accessToken;
    private Date accessTokenExpiresAt;

    public RefreshTokenResponseDTO(String accessToken, Date accessTokenExpiresAt) {
        this.accessToken = accessToken;
        this.accessTokenExpiresAt = accessTokenExpiresAt;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public Date getAccessTokenExpiresAt() {
        return accessTokenExpiresAt;
    }
}
