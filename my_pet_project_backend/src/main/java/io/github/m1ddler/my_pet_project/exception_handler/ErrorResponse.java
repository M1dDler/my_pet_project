package io.github.m1ddler.my_pet_project.exception_handler;

import java.util.Map;

public class ErrorResponse {
    private String timestamp;
    private int status;
    private String error;
    private Map<String, String> details;
    private String path;

    public ErrorResponse(){}

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getPath() {
        return path;
    }

    public Map<String, String> getDetails() {
        return details;
    }

    public void setDetails(Map<String, String> details) {
        this.details = details;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
