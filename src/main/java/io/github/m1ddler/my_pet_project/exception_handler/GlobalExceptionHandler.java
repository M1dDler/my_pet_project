package io.github.m1ddler.my_pet_project.exception_handler;

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
    public ResponseEntity<ErrorResponse> handleEntityAlreadyExistsException(
            EntityAlreadyExistsException e, HttpServletRequest request) {
        return buildErrorResponse(e.getMessage(), null, request, HttpStatus.CONFLICT);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException e,
                                                                   HttpServletRequest request) {
        Map<String, String> details = new HashMap<>();

        for (FieldError fieldError : e.getBindingResult().getFieldErrors()) {
            details.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        return buildErrorResponse("Validation failed", details, request, HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity<ErrorResponse> buildErrorResponse(
            String exception_message, Map<String, String> details, HttpServletRequest request, HttpStatus status) {
        ErrorResponse data = new ErrorResponse();
        data.setTimestamp(Instant.now().toString());
        data.setStatus(status.value());
        data.setError(exception_message);
        data.setDetails(details);
        data.setPath(request.getRequestURI());
        return new ResponseEntity<>(data, status);
    }
}
