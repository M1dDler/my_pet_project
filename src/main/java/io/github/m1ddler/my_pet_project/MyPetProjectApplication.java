package io.github.m1ddler.my_pet_project;

import io.github.m1ddler.my_pet_project.dotenv.EnvLoader;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyPetProjectApplication {

    public static void main(String[] args) {
        EnvLoader.loadEnv();
        SpringApplication.run(MyPetProjectApplication.class, args);
    }
}
