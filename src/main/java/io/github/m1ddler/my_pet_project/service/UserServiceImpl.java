package io.github.m1ddler.my_pet_project.service;

import io.github.m1ddler.my_pet_project.dao.UserRepository;
import io.github.m1ddler.my_pet_project.dto.UserDTO;
import io.github.m1ddler.my_pet_project.entity.User;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(u-> new UserDTO(u.getId(), u.getUserName(), u.getEmail(), u.getPortfolios()))
                .toList();
    }

    @Override
    public UserDTO getUserById(int userId) {
        return userRepository.findById(userId)
                .map(u-> new UserDTO(u.getId(), u.getUserName(), u.getEmail(), u.getPortfolios()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with ID "+userId+" not found"));
    }

    @Override
    public UserDTO saveUser(UserDTO userdto) {
        User user = new User(userdto.getUserName(), userdto.getEmail(), userdto.getPortfolios());
        User savedUser = userRepository.save(user);
        return new UserDTO(
                savedUser.getId(),
                savedUser.getUserName(),
                savedUser.getEmail(),
                savedUser.getPortfolios()
        );
    }

    @Override
    public UserDTO updateUser(int userId, UserDTO updatedUserDTO) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (!existingUser.getEmail().equals(updatedUserDTO.getEmail())) {
            Optional<User> userWithEmail = userRepository.findByEmail(updatedUserDTO.getEmail());
            if (userWithEmail.isPresent() && userWithEmail.get().getId() != userId) {
                throw new IllegalArgumentException("Email already in use");
            }
            existingUser.setEmail(updatedUserDTO.getEmail());
        }

        existingUser.setUserName(updatedUserDTO.getUserName());

        User savedUser = userRepository.save(existingUser);

        return new UserDTO(
                savedUser.getId(),
                savedUser.getUserName(),
                savedUser.getEmail(),
                savedUser.getPortfolios()
        );
    }


    @Override
    public void deleteUser(int userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "User with ID " + userId + " not found"
            );
        }
        userRepository.deleteById(userId);
    }
}
