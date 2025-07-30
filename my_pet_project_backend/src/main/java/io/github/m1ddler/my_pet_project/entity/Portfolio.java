package io.github.m1ddler.my_pet_project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "portfolios")
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    @Column(name = "name")
    private String name;
    @Column(name = "total_value", nullable = false)
    private BigDecimal totalValue = BigDecimal.ZERO;
    @Column(name = "position")
    private int position;
    @Column(name = "include_in_total")
    private boolean includeInTotal;
    @Column(name = "avatar_icon")
    private String avatarIcon;
    @Column(name = "avatar_color")
    private String avatarColor;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @OneToMany(mappedBy = "portfolio", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Transaction> transactions;

    public Portfolio() {}

    public Portfolio(String name, User user, boolean includeInTotal, String avatarIcon, String avatarColor) {
        this.name = name;
        this.user = user;
        this.includeInTotal = includeInTotal;
        this.avatarIcon = avatarIcon;
        this.avatarColor = avatarColor;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(BigDecimal totalValue) {
        this.totalValue = totalValue;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public boolean isIncludeInTotal() {
        return includeInTotal;
    }

    public void setIncludeInTotal(boolean includeInTotal) {
        this.includeInTotal = includeInTotal;
    }

    public String getAvatarIcon() {
        return avatarIcon;
    }

    public void setAvatarIcon(String avatarIcon) {
        this.avatarIcon = avatarIcon;
    }

    public String getAvatarColor() {
        return avatarColor;
    }

    public void setAvatarColor(String avatarColor) {
        this.avatarColor = avatarColor;
    }

    @Override
    public String toString() {
        return "Portfolio:\n"+
                "[Id="+ id +",\n" +
                "name="+name+",\n" +
                "totalValue="+totalValue+"]\n"
        ;
    }
}
