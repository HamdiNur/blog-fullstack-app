package com.blog.blog_api.service;

import com.blog.blog_api.dto.CommentDTO;
import com.blog.blog_api.entity.Comment;
import com.blog.blog_api.entity.Post;
import com.blog.blog_api.repository.CommentRepository;
import com.blog.blog_api.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    // CREATE comment under a specific post
    public CommentDTO addComment(Long postId, CommentDTO dto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id " + postId));

        Comment comment = new Comment();
        comment.setAuthor(dto.author());
        comment.setText(dto.text());
        comment.setCreatedAt(LocalDateTime.now());
        comment.setPost(post);

        Comment saved = commentRepository.save(comment);
        return toDTO(saved);
    }

    // DELETE a comment
    public void deleteComment(Long id) {
        if (!commentRepository.existsById(id)) {
            throw new RuntimeException("Comment not found with id " + id);
        }
        commentRepository.deleteById(id);
    }

    private CommentDTO toDTO(Comment comment) {
        return new CommentDTO(
                comment.getId(),
                comment.getAuthor(),
                comment.getText(),
                comment.getCreatedAt()
        );
    }
}