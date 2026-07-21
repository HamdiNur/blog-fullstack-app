package com.blog.blog_api.controller;

import com.blog.blog_api.dto.PostDTO;
import com.blog.blog_api.dto.PostSummaryDTO;
import com.blog.blog_api.dto.PostDetailDTO;
import com.blog.blog_api.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping
    public PostSummaryDTO createPost(@RequestBody PostDTO dto) {
        return postService.createPost(dto);
    }

    @GetMapping
    public List<PostSummaryDTO> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public PostDetailDTO getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    @PutMapping("/{id}")
    public PostSummaryDTO updatePost(@PathVariable Long id, @RequestBody PostDTO dto) {
        return postService.updatePost(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }
}