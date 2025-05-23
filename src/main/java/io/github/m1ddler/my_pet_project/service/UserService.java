package io.github.m1ddler.my_pet_project.service;

import io.github.m1ddler.my_pet_project.dto.UserDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    ResponseEntity<List<UserDTO>> getAllUsers();
    ResponseEntity<UserDTO> getUserById(int userId);
    ResponseEntity<UserDTO> saveUser(UserDTO userdto);
    ResponseEntity<UserDTO> updateUser(int userId, UserDTO userdto);
    void deleteUser(int userId);
}
