package io.github.m1ddler.my_pet_project.exception_handling;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleUserEmailException(EmailAlreadyExistsException e,
                                                                  HttpServletRequest request) {
        ErrorResponse data = new ErrorResponse();
        data.setTimestamp(Instant.now().toString());
        data.setStatus(HttpStatus.CONFLICT.value());
        data.setError(e.getMessage());
        data.setPath(request.getRequestURI());
        return new ResponseEntity<>(data, HttpStatus.CONFLICT);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException e,
                                                                   HttpServletRequest request) {
        ErrorResponse data = new ErrorResponse();
        data.setTimestamp(Instant.now().toString());
        data.setStatus(HttpStatus.BAD_REQUEST.value());

        Map<String, String> errors = new HashMap<>();

        for (FieldError fieldError : e.getBindingResult().getFieldErrors()) {
            errors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        data.setError(e.getMessage());
        data.setDetails(errors);
        data.setPath(request.getRequestURI());
        return new ResponseEntity<>(data, HttpStatus.BAD_REQUEST);
    }
}
