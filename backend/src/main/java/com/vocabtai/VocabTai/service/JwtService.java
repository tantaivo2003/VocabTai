package com.vocabtai.VocabTai.service;

import com.vocabtai.VocabTai.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {

    private Key secretKey;

    @PostConstruct
    public void init() {
        // Sinh khóa từ chuỗi bí mật
        String secret = "your-256-bit-secret-which-should-be-long-enough-to-secure";
        secretKey = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(User user) {
        Instant now = Instant.now();

        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("id", user.getId())
                .claim("email", user.getEmail())
                .claim("name", user.getName())
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plusSeconds(3600))) // 1 giờ
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

}
