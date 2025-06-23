package io.github.m1ddler.my_pet_project.exception_handler;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleEntityAlreadyExistsException(
            EntityAlreadyExistsException e, HttpServletRequest request) {
        log.warn("{} at the path {}", e.getMessage(), request.getRequestURI());
        return buildErrorResponse(e.getMessage(), null, request, HttpStatus.CONFLICT);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException e,
                                                                   HttpServletRequest request) {
        Map<String, String> details = new HashMap<>();

        for (FieldError fieldError : e.getBindingResult().getFieldErrors()) {
            details.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        log.warn("{} at the path {}: {}", "Validation failed", request.getRequestURI(), details);

        return buildErrorResponse("Validation failed", details, request, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleNoResourceFoundException(NoResourceFoundException e,
                                                                        HttpServletRequest request) {
        log.warn("Resource not found at the path {}", request.getRequestURI());
        return buildErrorResponse("Resource not found", null, request, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleException(Exception e, HttpServletRequest request) {
        log.error("Unhandled exception at the path {}:", request.getRequestURI(), e);
        return buildErrorResponse("Internal server error", null, request,
                HttpStatus.INTERNAL_SERVER_ERROR);
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
