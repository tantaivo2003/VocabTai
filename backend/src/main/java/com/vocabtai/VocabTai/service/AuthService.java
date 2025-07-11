package com.vocabtai.VocabTai.service;

import com.vocabtai.VocabTai.dto.AuthRequest;
import com.vocabtai.VocabTai.dto.AuthResponse;
import com.vocabtai.VocabTai.model.User;
import com.vocabtai.VocabTai.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtService jwtService;

    public AuthResponse register(AuthRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new RuntimeException("Email already in use");
        }

        User user = User.builder()
                .name(request.name())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .createdAt(ZonedDateTime.now())
                .build();

        userRepository.save(user);

        return new AuthResponse("Register success", null);
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateToken(user); // ✅ Đảm bảo bạn có jwtService

        return new AuthResponse(token, AuthResponse.SimpleUser.fromUser(user));
    }
}
