package com.jobportal.jobportal.service;

import com.jobportal.jobportal.dto.AuthResponse;
import com.jobportal.jobportal.dto.LoginRequest;
import com.jobportal.jobportal.dto.RegisterRequest;
import com.jobportal.jobportal.entity.User;
import com.jobportal.jobportal.exception.UnauthorizedException;
import com.jobportal.jobportal.exception.UserAlreadyExistsException;
import com.jobportal.jobportal.repository.UserRepository;
import com.jobportal.jobportal.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(RegisterRequest request) {
        userRepository.findByEmail(request.getEmail()).ifPresent(u -> {
            throw new UserAlreadyExistsException("A user with email " + request.getEmail() + " already exists");
        });

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        User saved = userRepository.save(user);

        String token = jwtUtil.generateToken(saved.getEmail(), saved.getRole().name());
        return new AuthResponse(token, saved.getName(), saved.getEmail(), saved.getRole());
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getName(), user.getEmail(), user.getRole());
    }
}
