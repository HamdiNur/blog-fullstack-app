package com.blog.blog_api.dto;

import java.time.LocalDateTime;

public record PostDTO(
        Long id,
        String title,
        String content,
        LocalDateTime createdAt
) {
}