package com.blog.blog_api.dto;

import java.time.LocalDateTime;

public record CommentDTO(
        Long id,
        String author,
        String text,
        LocalDateTime createdAt
) {
}