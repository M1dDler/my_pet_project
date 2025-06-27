package io.github.m1ddler.my_pet_project.service.interfaces;

import io.github.m1ddler.my_pet_project.dto.*;
import io.github.m1ddler.my_pet_project.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface AuthenticationService {
    ResponseEntity<UserDTO> register (RegistrationRequestDTO request);
    void saveUserToken(String accessToken, String refreshToken, User user);
    ResponseEntity<AuthenticationResponseDTO> authenticate(LoginRequestDTO request);
    ResponseEntity<RefreshTokenResponseDTO> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response);

}
