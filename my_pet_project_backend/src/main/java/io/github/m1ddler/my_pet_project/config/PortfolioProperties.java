package io.github.m1ddler.my_pet_project.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "portfolio")
public class PortfolioProperties {
    @Value("${PORTFOLIO_MAX_LIMIT}")
    private Integer maxPortfolioCount;

    public Integer getMaxPortfolioCount() {
        return maxPortfolioCount;
    }

    public void setMaxPortfolioCount(Integer maxPortfolioCount) {
        this.maxPortfolioCount = maxPortfolioCount;
    }
}
