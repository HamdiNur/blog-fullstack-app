import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getPostById, addComment, deleteComment } from "../api/api"
function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [author, setAuthor] = useState("")
  const [text, setText] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    getPostById(id)
      .then(data => setPost(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [id])

  async function handleAddComment(e) {
    e.preventDefault()
    if (!author.trim() || !text.trim()) return

    setSubmitting(true)
    try {
      const newComment = await addComment(id, { author, text })
      setPost(prev => ({ ...prev, comments: [...prev.comments, newComment] }))
      setAuthor("")
      setText("")
    } catch (err) {
      console.error(err)
      alert("Failed to add comment")
    } finally {
      setSubmitting(false)
    }
  }
  async function handleDeleteComment(commentId) {
  try {
    await deleteComment(commentId)
    setPost(prev => ({
      ...prev,
      comments: prev.comments.filter(c => c.id !== commentId)
    }))
  } catch (err) {
    console.error(err)
    alert("Failed to delete comment")
  }
}

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (!post) return <p className="text-center mt-10">Post not found.</p>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link to="/" className="text-blue-600 hover:underline">&larr; Back to posts</Link>

      <div className="bg-white rounded-lg shadow p-4 mt-4">
        <h1 className="text-2xl font-bold text-gray-800">{post.title}</h1>
        <p className="text-gray-600 mt-2">{post.content}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Comments ({post.comments.length})
        </h2>

        <div className="space-y-3 mb-4">
       {post.comments.map(comment => (
  <div key={comment.id} className="bg-white rounded shadow p-3 flex justify-between items-start">
    <div>
      <p className="text-sm font-semibold text-gray-800">{comment.author}</p>
      <p className="text-gray-600">{comment.text}</p>
    </div>
    <button
      onClick={() => handleDeleteComment(comment.id)}
      className="text-red-500 text-sm hover:underline ml-3"
    >
      Delete
    </button>
  </div>
))}
        </div>

        <form onSubmit={handleAddComment} className="bg-white rounded-lg shadow p-4 space-y-3">
          <input
            type="text"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? "Posting..." : "Add Comment"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PostDetail