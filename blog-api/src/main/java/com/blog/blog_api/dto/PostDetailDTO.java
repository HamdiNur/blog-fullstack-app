package com.blog.blog_api.dto;

import java.time.LocalDateTime;
import java.util.List;

public record PostDetailDTO(
        Long id,
        String title,
        String content,
        LocalDateTime createdAt,
        List<CommentDTO> comments
) {
}