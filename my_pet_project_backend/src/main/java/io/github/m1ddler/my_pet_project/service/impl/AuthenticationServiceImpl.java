package io.github.m1ddler.my_pet_project.service.impl;

import io.github.m1ddler.my_pet_project.config.JwtProperties;
import io.github.m1ddler.my_pet_project.dao.TokenRepository;
import io.github.m1ddler.my_pet_project.dao.UserRepository;
import io.github.m1ddler.my_pet_project.dto.*;
import io.github.m1ddler.my_pet_project.entity.Role;
import io.github.m1ddler.my_pet_project.entity.Token;
import io.github.m1ddler.my_pet_project.entity.User;
import io.github.m1ddler.my_pet_project.exception_handler.EntityAlreadyExistsException;
import io.github.m1ddler.my_pet_project.service.interfaces.AuthenticationService;
import io.github.m1ddler.my_pet_project.service.interfaces.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository tokenRepository;
    private final JwtProperties jwtProperties;

    @Autowired
    public AuthenticationServiceImpl(UserRepository userRepository,
                                 JwtService jwtService,
                                 PasswordEncoder passwordEncoder,
                                 AuthenticationManager authenticationManager,
                                 TokenRepository tokenRepository,
                                 JwtProperties jwtProperties) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenRepository = tokenRepository;
        this.jwtProperties = jwtProperties;
    }

    @Override
    public ResponseEntity<UserDTO> register (RegistrationRequestDTO request) {
        if (userRepository.existsUserByUsername(request.getUsername()) ||
                userRepository.existsUserByEmail(request.getEmail())) {
            throw new EntityAlreadyExistsException("User already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        User savedUser = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(new UserDTO(
                savedUser.getId(),
                savedUser.getRole(),
                savedUser.getUsername(),
                savedUser.getEmail()
        ));
    }

    @Override
    public void saveUserToken(String accessToken, String refreshToken, User user) {
        Token token = new Token();
        token.setAccessToken(accessToken);
        token.setRefreshToken(refreshToken);
        token.setLoggedOut(false);
        token.setUser(user);
        tokenRepository.save(token);
    }

    @Transactional
    @Override
    public ResponseEntity<AuthenticationResponseDTO> authenticate(LoginRequestDTO request) {
        try {
            User user = userRepository.findByUsername(request.getLogin())
                    .or(() -> userRepository.findByEmail(request.getLogin()))
                    .orElse(null);

            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            request.getPassword()
                    )
            );

            long dateNow = System.currentTimeMillis();
            Date issuedAt = new Date(dateNow);
            Date accessTokenExpiresAt = new Date(dateNow + jwtProperties.getAccessTokenExpiration());
            Date refreshTokenExpiresAt = new Date(dateNow + jwtProperties.getRefreshTokenExpiration());

            String accessToken = jwtService.generateAccessToken(user, issuedAt, accessTokenExpiresAt);
            String refreshToken = jwtService.generateRefreshToken(user, issuedAt, refreshTokenExpiresAt);

            tokenRepository.deleteAllByUserId(user.getId());
            saveUserToken(accessToken, refreshToken, user);

            return ResponseEntity.status(HttpStatus.OK).body(new AuthenticationResponseDTO(
                    accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt
            ));
        }
        catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @Transactional
    @Override
    public ResponseEntity<RefreshTokenResponseDTO> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = authorizationHeader.substring(7);
        String username = jwtService.extractUsername(token);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("No user found"));

        if (jwtService.isValidRefresh(token, user)) {

            long dateNow = System.currentTimeMillis();
            Date issuedAt = new Date(dateNow);
            Date accessTokenExpiresAt = new Date(dateNow + jwtProperties.getAccessTokenExpiration());

            String accessToken = jwtService.generateAccessToken(user, issuedAt, accessTokenExpiresAt);

            tokenRepository.deleteAllByUserId(user.getId());
            saveUserToken(accessToken, token, user);

            return new ResponseEntity<>(new RefreshTokenResponseDTO(accessToken, accessTokenExpiresAt), HttpStatus.OK);

        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
