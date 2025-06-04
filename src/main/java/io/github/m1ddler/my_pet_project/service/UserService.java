package io.github.m1ddler.my_pet_project.service;

import io.github.m1ddler.my_pet_project.dto.UserDTO;
import io.github.m1ddler.my_pet_project.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService {
    ResponseEntity<UserDTO> getCurrentUser();
    ResponseEntity<UserDTO> updateCurrentUser(UserDTO userDTO);
    void deleteCurrentUser();
    UserDetails loadUserByUsername(String email) throws ResponseStatusException;
    User getAuthenticatedUser();
}
