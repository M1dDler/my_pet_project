package io.github.m1ddler.my_pet_project.service;

import io.github.m1ddler.my_pet_project.dto.AuthenticationResponseDTO;
import io.github.m1ddler.my_pet_project.dto.LoginRequestDTO;
import io.github.m1ddler.my_pet_project.dto.RegistrationRequestDTO;
import io.github.m1ddler.my_pet_project.dto.UserDTO;
import io.github.m1ddler.my_pet_project.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface AuthenticationService {
    ResponseEntity<UserDTO> register (RegistrationRequestDTO request);
    void revokeAllToken(User user);
    void saveUserToken(String accessToken, String refreshToken, User user);
    ResponseEntity<AuthenticationResponseDTO> authenticate(LoginRequestDTO request);
    ResponseEntity<AuthenticationResponseDTO> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response);

}
