package io.github.m1ddler.my_pet_project.controller;

import io.github.m1ddler.my_pet_project.dto.TransactionDTO;
import io.github.m1ddler.my_pet_project.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/transactions")
public class TransactionController {
    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }


    @GetMapping("/me")
    public ResponseEntity<TransactionDTO> getTransaction() {
        return null;
    }

    @PostMapping("/me")
    public ResponseEntity<TransactionDTO> createTransaction() {
        return null;
    }

    @PutMapping("/me")
    public ResponseEntity<TransactionDTO> updateTransaction() {
        return null;
    }

    @DeleteMapping("/me")
    public void deleteTransaction(){

    }
}
