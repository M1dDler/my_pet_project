package io.github.m1ddler.my_pet_project.dto;

public class AuthenticationResponseDTO {
    private final String accessToken;
    private final String refreshToken;
    private final UserDTO userDTO;


    public AuthenticationResponseDTO(String token, String refreshToken, UserDTO userDTO) {
        this.accessToken = token;
        this.refreshToken = refreshToken;
        this.userDTO = userDTO;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public UserDTO getUserDTO() {return userDTO;}
}
