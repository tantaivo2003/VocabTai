package com.vocabtai.VocabTai.dto;

public record AuthRequest(
                String name,
                String email,
                String password) {
}
