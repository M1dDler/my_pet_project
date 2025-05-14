package io.github.m1ddler.my_pet_project.controller;

import io.github.m1ddler.my_pet_project.dto.UserDTO;
import io.github.m1ddler.my_pet_project.entity.User;
import io.github.m1ddler.my_pet_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{userId}")
    public UserDTO getUserById(@PathVariable int userId) {
        return userService.getUserById(userId);
    }

    @PostMapping("/users")
    public UserDTO createUser(@RequestBody UserDTO userdto) {
        return userService.saveUser(userdto);
    }

    @PutMapping("/users/{userId}")
    public UserDTO updateUser(@PathVariable int userId, @RequestBody UserDTO userdto) {
        return userService.updateUser(userId, userdto);
    }

    @DeleteMapping("/users/{userId}")
    public void deleteUser(@PathVariable int userId) {
        userService.deleteUser(userId);
    }
}
