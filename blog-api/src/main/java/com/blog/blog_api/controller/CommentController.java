package com.blog.blog_api.controller;

import com.blog.blog_api.dto.CommentDTO;
import com.blog.blog_api.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/posts/{postId}/comments")
    public CommentDTO addComment(@PathVariable Long postId, @RequestBody CommentDTO dto) {
        return commentService.addComment(postId, dto);
    }

    @DeleteMapping("/comments/{id}")
    public void deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
    }
}