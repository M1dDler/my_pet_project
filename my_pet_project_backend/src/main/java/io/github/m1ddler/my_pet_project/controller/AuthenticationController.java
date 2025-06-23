package io.github.m1ddler.my_pet_project.controller;

import io.github.m1ddler.my_pet_project.dto.AuthenticationResponseDTO;
import io.github.m1ddler.my_pet_project.dto.LoginRequestDTO;
import io.github.m1ddler.my_pet_project.dto.RegistrationRequestDTO;
import io.github.m1ddler.my_pet_project.dto.UserDTO;
import io.github.m1ddler.my_pet_project.service.interfaces.AuthenticationService;
import io.github.m1ddler.my_pet_project.service.interfaces.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService, UserService userService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register (@RequestBody @Valid RegistrationRequestDTO registrationDTO) {
        return authenticationService.register(registrationDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDTO> authenticate(@RequestBody @Valid LoginRequestDTO request) {
        return authenticationService.authenticate(request);
    }

    @PostMapping("/refresh_token")
    public ResponseEntity<AuthenticationResponseDTO> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) {

        return authenticationService.refreshToken(request, response);
    }
}
