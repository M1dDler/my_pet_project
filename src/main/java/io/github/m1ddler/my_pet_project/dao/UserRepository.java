package io.github.m1ddler.my_pet_project.dao;

import io.github.m1ddler.my_pet_project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsUserByEmail(String email);
    Optional<User> findByEmail(String email);
}