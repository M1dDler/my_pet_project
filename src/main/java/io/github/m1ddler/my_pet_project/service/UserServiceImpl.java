package io.github.m1ddler.my_pet_project.service;

import io.github.m1ddler.my_pet_project.dao.UserRepository;
import io.github.m1ddler.my_pet_project.dto.UserDTO;
import io.github.m1ddler.my_pet_project.entity.User;
import io.github.m1ddler.my_pet_project.exception_handling.EmailAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userRepository.findAll().stream()
                .map(u-> new UserDTO(u.getId(), u.getUserName(), u.getEmail(), u.getPortfolios()))
                .toList());
    }

    @Override
    public ResponseEntity<UserDTO> getUserById(int userId) {
        return ResponseEntity.status(HttpStatus.OK).body(userRepository.findById(userId)
                .map(u-> new UserDTO(u.getId(), u.getUserName(), u.getEmail(), u.getPortfolios()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
    }

    @Override
    public ResponseEntity<UserDTO> saveUser(UserDTO userDTO) {
        if (userRepository.existsUserByEmail(userDTO.getEmail())){
            throw new EmailAlreadyExistsException("Email already exists");
        }
        User user = new User(userDTO.getUserName(), userDTO.getEmail());
        User savedUser = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.OK).body(new UserDTO(
                savedUser.getId(),
                savedUser.getUserName(),
                savedUser.getEmail(),
                savedUser.getPortfolios()
        ));
    }

    @Override
    public ResponseEntity<UserDTO> updateUser(int userId, UserDTO updatedUserDTO) {
        boolean changed = false;

        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (!existingUser.getEmail().equals(updatedUserDTO.getEmail())) {
            Optional<User> userWithEmail = userRepository.findByEmail(updatedUserDTO.getEmail());
            if (userWithEmail.isPresent() && userWithEmail.get().getId() != userId) {
                throw new EmailAlreadyExistsException("Email already exists");
            }
            existingUser.setEmail(updatedUserDTO.getEmail());
            changed = true;
        }

        if (!existingUser.getUserName().equals(updatedUserDTO.getUserName())) {
            existingUser.setUserName(updatedUserDTO.getUserName());
            changed = true;
        }

        if(changed) {
            User savedUser = userRepository.save(existingUser);
            return ResponseEntity.status(HttpStatus.OK).body(new UserDTO(
                    savedUser.getId(),
                    savedUser.getUserName(),
                    savedUser.getEmail(),
                    savedUser.getPortfolios()
            ));
        }
        else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
    }

    @Override
    public void deleteUser(int userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        userRepository.deleteById(userId);
    }
}
