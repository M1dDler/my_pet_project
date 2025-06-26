package io.github.m1ddler.my_pet_project.service.impl;

import io.github.m1ddler.my_pet_project.config.JwtProperties;
import io.github.m1ddler.my_pet_project.dao.TokenRepository;
import io.github.m1ddler.my_pet_project.entity.User;
import io.github.m1ddler.my_pet_project.service.interfaces.JwtService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtServiceImpl implements JwtService {
    private final TokenRepository tokenRepository;

    private final JwtProperties jwtProperties;


    @Autowired
    public JwtServiceImpl(TokenRepository tokenRepository, JwtProperties jwtProperties) {
        this.tokenRepository = tokenRepository;
        this.jwtProperties = jwtProperties;
    }


    @Override
    public String generateAccessToken(User user, Date issueAt, Date accessTokenExpiresAt) {
        return generateToken(user, issueAt, accessTokenExpiresAt);
    }

    @Override
    public String generateRefreshToken(User user, Date issueAt, Date refreshTokenExpiresAt) {
        return generateToken(user, issueAt, refreshTokenExpiresAt);
    }

    @Override
    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    @Override
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    @Override
    public boolean isValid(String token, UserDetails user) {
        String username = extractUsername(token);
        boolean isValidToken = tokenRepository.findByAccessToken(token)
                .map(t -> !t.isLoggedOut()).orElse(false);
        return username.equals(user.getUsername())
                && isAccessTokenExpired(token)
                && isValidToken;
    }

    @Override
    public boolean isValidRefresh(String token, User user) {
        String username = extractUsername(token);
        boolean isValidRefreshToken = tokenRepository.findByRefreshToken(token)
                .map(t -> !t.isLoggedOut()).orElse(false);
        return username.equals(user.getUsername())
                && isAccessTokenExpired(token)
                && isValidRefreshToken;
    }



    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64URL.decode(jwtProperties.getSecretKey());
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private String generateToken(User user, Date issueAt, Date tokenExpiresAt) {
        JwtBuilder builder = Jwts.builder()
                .subject(user.getUsername())
                .issuedAt(issueAt)
                .expiration(tokenExpiresAt)
                .signWith(getSigningKey());
        return builder.compact();
    }

    private Claims extractAllClaims(String token) {
        JwtParserBuilder parser = Jwts.parser();
        parser.verifyWith(getSigningKey());
        return parser.build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private boolean isAccessTokenExpired(String token) {
        return !extractExpiration(token).before(new Date());
    }


}
