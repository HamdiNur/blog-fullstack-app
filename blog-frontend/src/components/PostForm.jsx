import { useState } from "react"
import { createPost } from "../api/api"

function PostForm({ onPostCreated }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    setSubmitting(true)
    try {
      const newPost = await createPost({ title, content })
      onPostCreated(newPost)
      setTitle("")
      setContent("")
    } catch (err) {
      console.error(err)
      alert("Failed to create post")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border border-divider rounded-sm p-5 bg-white/40">
      <p className="font-mono text-xs text-gold tracking-widest uppercase mb-3">
        New Entry
      </p>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-transparent border-b border-divider pb-2 mb-4 font-display text-xl placeholder:text-ink/30 focus:outline-none focus:border-teal"
      />
      <textarea
        placeholder="Write something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        className="w-full bg-transparent border-b border-divider pb-2 mb-4 text-ink/80 placeholder:text-ink/30 focus:outline-none focus:border-teal resize-none"
      />
      <button
        type="submit"
        disabled={submitting}
        className="font-mono text-xs uppercase tracking-wide bg-teal text-paper px-4 py-2 rounded-sm hover:bg-teal/90 disabled:opacity-50 transition-colors"
      >
        {submitting ? "Saving..." : "Publish Entry"}
      </button>
    </form>
  )
}

export default PostForm