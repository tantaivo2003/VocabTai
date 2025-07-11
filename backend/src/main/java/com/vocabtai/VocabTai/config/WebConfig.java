package com.vocabtai.VocabTai.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Cho phép tất cả endpoint
                .allowedOrigins("http://localhost:5173") // Cho phép từ FE
                .allowedOrigins("http://localhost:3000") // Cho phép từ FE
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true); // Nếu có dùng cookie hoặc auth header
    }
}
