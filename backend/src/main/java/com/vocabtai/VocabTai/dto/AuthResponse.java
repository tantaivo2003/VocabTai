package com.vocabtai.VocabTai.dto;

import com.vocabtai.VocabTai.model.User;

public record AuthResponse(
                String token,
                SimpleUser user) {
        public record SimpleUser(Integer id, String name, String email) {
                public static SimpleUser fromUser(User user) {
                        return new SimpleUser(user.getId(), user.getName(), user.getEmail());
                }
        }
}