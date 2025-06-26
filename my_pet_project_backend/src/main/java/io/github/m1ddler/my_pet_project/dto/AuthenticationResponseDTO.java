package io.github.m1ddler.my_pet_project.dto;

import java.util.Date;

public class AuthenticationResponseDTO {
    private final String accessToken;
    private final String refreshToken;
    private final Date accessTokenExpiresAt;
    private final Date refreshTokenExpiresAt;


    public AuthenticationResponseDTO(String token, String refreshToken,
                                     Date accessTokenExpiresAt, Date refreshTokenExpiresAt) {
        this.accessToken = token;
        this.refreshToken = refreshToken;
        this.accessTokenExpiresAt = accessTokenExpiresAt;
        this.refreshTokenExpiresAt = refreshTokenExpiresAt;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public Date getAccessTokenExpiresAt() {
        return accessTokenExpiresAt;
    }

    public Date getRefreshTokenExpiresAt() {
        return refreshTokenExpiresAt;
    }
}
