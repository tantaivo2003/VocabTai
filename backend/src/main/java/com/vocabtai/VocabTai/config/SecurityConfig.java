package com.vocabtai.VocabTai.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                http
                                .csrf(csrf -> csrf.disable()) // Tắt CSRF
                                .authorizeHttpRequests(auth -> auth
                                                .anyRequest().permitAll() // ✅ Cho phép tất cả request không cần xác
                                                                          // thực
                                )
                                .formLogin(login -> login.disable()) // ❌ Tắt login form mặc định
                                .httpBasic(disable -> disable.disable()); // ❌ Tắt luôn basic auth nếu không dùng

                return http.build();
        }
}
