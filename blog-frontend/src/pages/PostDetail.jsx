import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getPostById,
  addComment,
  deleteComment,
  updatePost,
  deletePost,
} from "../api/api";
import ConfirmModal from "../components/ConfirmModal";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);

  useEffect(() => {
    getPostById(id)
      .then((data) => setPost(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  function startEditing() {
    setEditTitle(post.title);
    setEditContent(post.content);
    setIsEditing(true);
  }

  async function handleSaveEdit(e) {
    e.preventDefault();
    if (!editTitle.trim() || !editContent.trim()) return;

    setSavingEdit(true);
    try {
      const updated = await updatePost(id, {
        title: editTitle,
        content: editContent,
      });
      setPost((prev) => ({
        ...prev,
        title: updated.title,
        content: updated.content,
      }));
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update post");
    } finally {
      setSavingEdit(false);
    }
  }

  async function handleDeletePost() {
    try {
      await deletePost(id);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to delete post");
    } finally {
      setShowDeleteModal(false);
    }
  }

  async function handleAddComment(e) {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;

    setSubmitting(true);
    try {
      const newComment = await addComment(id, { author, text });
      setPost((prev) => ({
        ...prev,
        comments: [...prev.comments, newComment],
      }));
      setAuthor("");
      setText("");
    } catch (err) {
      console.error(err);
      alert("Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  }

  async function confirmDeleteComment() {
    try {
      await deleteComment(commentIdToDelete);
      setPost((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c.id !== commentIdToDelete),
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to delete comment");
    } finally {
      setCommentIdToDelete(null);
    }
  }

  if (loading)
    return (
      <p className="text-center mt-10 font-mono text-sm text-ink/50">
        Loading...
      </p>
    );
  if (!post)
    return (
      <p className="text-center mt-10 font-mono text-sm text-ink/50">
        Entry not found.
      </p>
    );

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Link to="/" className="font-mono text-xs text-teal hover:underline">
        &larr; Back to journal
      </Link>

      <div className="mt-6">
        <p className="font-mono text-xs text-gold tracking-widest uppercase mb-2">
          Entry No. {String(post.id).padStart(3, "0")}
        </p>

        {isEditing ? (
          <form onSubmit={handleSaveEdit}>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full bg-transparent border-b border-divider pb-2 mb-4 font-display text-3xl font-bold focus:outline-none focus:border-teal"
            />
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={5}
              className="w-full bg-transparent border-b border-divider pb-2 mb-4 text-ink/80 leading-relaxed focus:outline-none focus:border-teal resize-none"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={savingEdit}
                className="font-mono text-xs uppercase tracking-wide bg-teal text-paper px-4 py-2 rounded-sm hover:bg-teal/90 disabled:opacity-50"
              >
                {savingEdit ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="font-mono text-xs uppercase tracking-wide text-ink/50 hover:text-ink px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <h1 className="font-display text-3xl font-bold text-ink">
              {post.title}
            </h1>
            <div className="border-t border-divider my-4" />
            <p className="text-ink/80 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>

            <div className="flex items-center justify-between mt-6">
              <span className="font-mono text-xs text-ink/50">
                {formatDate(post.createdAt)}
              </span>
              <div className="flex gap-4">
                <button
                  onClick={startEditing}
                  className="font-mono text-xs text-teal hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="font-mono text-xs text-muted-red hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Comments */}
      <div className="mt-16">
        <p className="font-mono text-xs text-gold tracking-widest uppercase mb-4">
          {post.comments.length}{" "}
          {post.comments.length === 1 ? "Response" : "Responses"}
        </p>

        <div className="space-y-4 mb-8">
          {post.comments.map((comment) => (
            <div
              key={comment.id}
              className="border-b border-divider pb-4 flex justify-between items-start"
            >
              <div>
                <p className="font-mono text-xs text-ink/50 mb-1">
                  {comment.author}
                </p>
                <p className="text-ink/80">{comment.text}</p>
              </div>
              <button
                onClick={() => setCommentIdToDelete(comment.id)}
                className="font-mono text-xs text-muted-red hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleAddComment}
          className="border border-divider rounded-sm p-5 bg-white/40"
        >
          <input
            type="text"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full bg-transparent border-b border-divider pb-2 mb-3 placeholder:text-ink/30 focus:outline-none focus:border-teal"
          />
          <textarea
            placeholder="Add a response..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            className="w-full bg-transparent border-b border-divider pb-2 mb-4 placeholder:text-ink/30 focus:outline-none focus:border-teal resize-none"
          />
          <button
            type="submit"
            disabled={submitting}
            className="font-mono text-xs uppercase tracking-wide bg-teal text-paper px-4 py-2 rounded-sm hover:bg-teal/90 disabled:opacity-50"
          >
            {submitting ? "Posting..." : "Post Response"}
          </button>
        </form>
      </div>

      <ConfirmModal
        open={showDeleteModal}
        title="Delete this entry?"
        message="This will permanently delete the post and all its comments. This cannot be undone."
        onConfirm={handleDeletePost}
        onCancel={() => setShowDeleteModal(false)}
      />

      <ConfirmModal
        open={commentIdToDelete !== null}
        title="Delete this response?"
        message="This comment will be permanently removed."
        onConfirm={confirmDeleteComment}
        onCancel={() => setCommentIdToDelete(null)}
      />
    </div>
  );
}

export default PostDetail;