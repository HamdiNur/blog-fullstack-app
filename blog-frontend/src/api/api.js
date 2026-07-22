const BASE_URL = "http://localhost:8080";

// Get all posts (summary list)
export async function getPosts() {
  const res = await fetch(`${BASE_URL}/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

// Get one post with comments
export async function getPostById(id) {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

// Create a post
export async function createPost(postData) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}

// Delete a post
export async function deletePost(id) {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete post");
}

// Add a comment to a post
export async function addComment(postId, commentData) {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentData),
  });
  if (!res.ok) throw new Error("Failed to add comment");
  return res.json();
}
// Update a post
export async function updatePost(id, postData) {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
}

// Delete a comment
export async function deleteComment(id) {
  const res = await fetch(`${BASE_URL}/comments/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete comment");
}