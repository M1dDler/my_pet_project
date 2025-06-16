package io.github.m1ddler.my_pet_project.exception_handling;

public class TransactionException extends RuntimeException {
  public TransactionException(String message) {
    super(message);
  }
}
