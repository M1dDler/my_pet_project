package io.github.m1ddler.my_pet_project.service;

import io.github.m1ddler.my_pet_project.dto.UserDTO;
import io.github.m1ddler.my_pet_project.entity.User;

import java.util.List;

public interface UserService {
    List<UserDTO> getAllUsers();
    UserDTO getUserById(int userId);
    UserDTO saveUser(UserDTO userdto);
    UserDTO updateUser(int userId, UserDTO userdto);
    void deleteUser(int userId);
}
