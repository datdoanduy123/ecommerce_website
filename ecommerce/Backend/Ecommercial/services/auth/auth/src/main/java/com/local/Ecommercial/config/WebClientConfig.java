package com.local.Ecommercial.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    @Bean
    public WebClient customerServiceWebClient() {
        return WebClient.builder()
                // Thay localhost:8081 bằng port chạy service khách hàng
                .baseUrl("http://localhost:8050/api/v1/customers")
                .build();
    }
}
