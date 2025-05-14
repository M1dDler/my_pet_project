package io.github.m1ddler.my_pet_project.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "coin_name")
    private String coinName;
    @Column(name = "quantity")
    private BigDecimal quantity;
    @Column(name = "price_per_unit")
    private BigDecimal pricePerUnit;
    @Column(name = "transaction_date")
    private LocalDateTime transactionDate;
    @Column(name = "fee")
    private BigDecimal fee;
    @Column(name = "note")
    private String note;
    @ManyToOne
    @JoinColumn(name = "portfolio_id")
    private Portfolio portfolio;

    public Transaction() {}

    public Portfolio getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCoinName() {
        return coinName;
    }

    public void setCoinName(String coinName) {
        this.coinName = coinName;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPricePerUnit() {
        return pricePerUnit;
    }

    public void setPricePerUnit(BigDecimal pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
    }

    public LocalDateTime getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDateTime transactionDate) {
        this.transactionDate = transactionDate;
    }

    public BigDecimal getFee() {
        return fee;
    }

    public void setFee(BigDecimal fee) {
        this.fee = fee;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    public String toString(){
        return "Transaction:\n" +
                "[Id="+id+",\n"
                +"coinName="+coinName+",\n"
                +"quantity="+quantity+",\n"
                +"pricePerUnit="+pricePerUnit+",\n"
                +"transactionDate="+transactionDate+",\n"
                +"fee="+fee+",\n"
                +"note="+note+"]";
    }

}
