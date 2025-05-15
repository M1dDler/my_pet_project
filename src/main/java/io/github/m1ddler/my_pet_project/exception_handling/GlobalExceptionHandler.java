package io.github.m1ddler.my_pet_project.exception_handling;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.Instant;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleException(EmailAlreadyExistsException exception,
                                                         HttpServletRequest request) {
        ErrorResponse data = new ErrorResponse();
        data.setTimestamp(Instant.now().toString());
        data.setStatus(HttpStatus.CONFLICT.value());
        data.setError(exception.getMessage());
        data.setPath(request.getRequestURI());
        return new ResponseEntity<>(data, HttpStatus.CONFLICT);
    }
}
