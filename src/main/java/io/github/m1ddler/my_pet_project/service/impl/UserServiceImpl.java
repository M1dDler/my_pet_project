package io.github.m1ddler.my_pet_project.service.impl;

import io.github.m1ddler.my_pet_project.dao.UserRepository;
import io.github.m1ddler.my_pet_project.dto.UserDTO;
import io.github.m1ddler.my_pet_project.entity.User;
import io.github.m1ddler.my_pet_project.exception_handler.EntityAlreadyExistsException;
import io.github.m1ddler.my_pet_project.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public ResponseEntity<UserDTO> getCurrentUser() {
        User user = getAuthenticatedUser();
        return ResponseEntity.status(HttpStatus.OK).body(userToUserDTO(user));
    }

    @Override
    public ResponseEntity<UserDTO> updateCurrentUser(UserDTO userDTO) {
        boolean changed = false;

        User existingUser = getAuthenticatedUser();

        if (!existingUser.getEmail().equalsIgnoreCase(userDTO.getEmail())) {
            if (userRepository.existsUserByEmail(userDTO.getEmail())) {
                throw new EntityAlreadyExistsException("Email already exists");
            }
            existingUser.setEmail(userDTO.getEmail());
            changed = true;
        }

        if (!existingUser.getUsername().equals(userDTO.getUsername())) {
            if (userRepository.existsUserByUsername(userDTO.getUsername())) {
                throw new EntityAlreadyExistsException("A user with this username already exists");
            }
            existingUser.setUsername(userDTO.getUsername());
            changed = true;
        }

        if(!changed) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.status(HttpStatus.OK).body(userToUserDTO(userRepository.save(existingUser)));
    }

    @Override
    public void deleteCurrentUser() {
        userRepository.delete(getAuthenticatedUser());
    }

    @Override
    public UserDetails loadUserByUsername(String userName){
        return userRepository.findByUsername(userName)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    private UserDTO userToUserDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getRole(),
                user.getUsername(),
                user.getEmail()
        );
    }
}
