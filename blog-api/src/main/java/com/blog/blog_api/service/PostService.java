package com.blog.blog_api.service;

import com.blog.blog_api.dto.CommentDTO;
import com.blog.blog_api.dto.PostDTO;
import com.blog.blog_api.dto.PostDetailDTO;
import com.blog.blog_api.dto.PostSummaryDTO;
import com.blog.blog_api.entity.Post;
import com.blog.blog_api.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    // CREATE
    public PostSummaryDTO createPost(PostDTO dto) {
        Post post = new Post();
        post.setTitle(dto.title());
        post.setContent(dto.content());
        post.setCreatedAt(LocalDateTime.now());

        Post saved = postRepository.save(post);
        return toSummaryDTO(saved);
    }

    // READ ALL (summary only, no comments)
    public List<PostSummaryDTO> getAllPosts() {
        return postRepository.findAll()
                .stream()
                .map(this::toSummaryDTO)
                .toList();
    }

    // READ ONE (with nested comments)
    public PostDetailDTO getPostById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id " + id));
        return toDetailDTO(post);
    }

    // UPDATE
    public PostSummaryDTO updatePost(Long id, PostDTO dto) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id " + id));

        post.setTitle(dto.title());
        post.setContent(dto.content());

        Post updated = postRepository.save(post);
        return toSummaryDTO(updated);
    }

    // DELETE
    public void deletePost(Long id) {
        if (!postRepository.existsById(id)) {
            throw new RuntimeException("Post not found with id " + id);
        }
        postRepository.deleteById(id);
    }

    // Helper: Entity -> Summary DTO (no comments)
    private PostSummaryDTO toSummaryDTO(Post post) {
        return new PostSummaryDTO(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getCreatedAt()
        );
    }

    // Helper: Entity -> Detail DTO (with comments)
    private PostDetailDTO toDetailDTO(Post post) {
        List<CommentDTO> commentDTOs = post.getComments().stream()
                .map(c -> new CommentDTO(c.getId(), c.getAuthor(), c.getText(), c.getCreatedAt()))
                .toList();

        return new PostDetailDTO(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getCreatedAt(),
                commentDTOs
        );
    }
}