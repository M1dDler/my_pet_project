package io.github.m1ddler.my_pet_project.service;

import io.github.m1ddler.my_pet_project.dao.PortfolioRepository;
import io.github.m1ddler.my_pet_project.dao.TransactionRepository;
import io.github.m1ddler.my_pet_project.dao.UserRepository;
import io.github.m1ddler.my_pet_project.dto.TransactionDTO;
import io.github.m1ddler.my_pet_project.entity.Portfolio;
import io.github.m1ddler.my_pet_project.entity.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.function.Consumer;
import java.util.function.Supplier;

@Service
public class TransactionServiceImpl implements TransactionService {
    private final TransactionRepository transactionRepository;
    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;

    @Autowired
    public TransactionServiceImpl(TransactionRepository transactionRepository, PortfolioRepository portfolioRepository
                                    , UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.portfolioRepository = portfolioRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ResponseEntity<List<TransactionDTO>> getAllTransactionsByPortfolioId (int portfolioId) {
        if (!portfolioRepository.existsById(portfolioId) && !userRepository.existsById(portfolioId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(transactionRepository.findByPortfolioId(portfolioId)
                .stream()
                .map(this::TransactionToDTO).toList());
    }

    @Override
    public ResponseEntity<TransactionDTO> getTransaction(int transactionId, int portfolioId) {
        if(!portfolioRepository.existsById(portfolioId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(transactionRepository.findById(transactionId)
                .map(this::TransactionToDTO)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
    }

    @Override
    public ResponseEntity<TransactionDTO> saveTransaction(int portfolioId, TransactionDTO tDTO) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Transaction transaction = new Transaction(tDTO.getCoinName(), tDTO.getQuantity(), tDTO.getPricePerUnit()
                ,tDTO.getTransactionDate(), tDTO.getFee(), tDTO.getNote(), portfolio);

        Transaction savedTransaction = transactionRepository.save(transaction);
        return ResponseEntity.status(HttpStatus.CREATED).body(TransactionToDTO(savedTransaction));
    }

    @Override
    public ResponseEntity<TransactionDTO> updateTransaction(int transactionId, int portfolioId, TransactionDTO tDTO) {
        Transaction transaction = transactionRepository.findByIdAndPortfolioId(transactionId, portfolioId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        boolean isUpdated = false;
        isUpdated |= updateIfChanged(transaction::getCoinName, transaction::setCoinName, tDTO.getCoinName());
        isUpdated |= updateIfChanged(transaction::getQuantity, transaction::setQuantity, tDTO.getQuantity());
        isUpdated |= updateIfChanged(transaction::getPricePerUnit, transaction::setPricePerUnit, tDTO.getPricePerUnit());
        isUpdated |= updateIfChanged(transaction::getTransactionDate, transaction::setTransactionDate, tDTO.getTransactionDate());
        isUpdated |= updateIfChanged(transaction::getFee, transaction::setFee, tDTO.getFee());
        isUpdated |= updateIfChanged(transaction::getNote, transaction::setNote, tDTO.getNote());

        return isUpdated ? ResponseEntity.status(HttpStatus.OK).body(TransactionToDTO(transactionRepository.save(transaction)))
                : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Override
    public void deleteTransaction(int transactionId) {
        if (!transactionRepository.existsById(transactionId)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        transactionRepository.deleteById(transactionId);
    }

    private <T> boolean updateIfChanged (Supplier<T> getter, Consumer<T> setter, T newValue) {
        if (!Objects.equals(getter.get(), newValue)) {
            setter.accept(newValue);
            return true;
        }
        return false;
    }

    private TransactionDTO TransactionToDTO(Transaction t) {
        return new TransactionDTO(t.getId(), t.getCoinName(), t.getQuantity(),
                t.getPricePerUnit(), t.getTransactionDate(), t.getFee(), t.getNote());
    }
}
