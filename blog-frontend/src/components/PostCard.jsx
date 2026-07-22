import { Link } from "react-router-dom"

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric"
  })
}

function PostCard({ post, onDelete }) {
  function handleDelete(e) {
    e.preventDefault()
    e.stopPropagation()
    onDelete(post.id)
  }

  return (
    <Link to={`/posts/${post.id}`} className="block relative pl-8 group">
      {/* timeline line + dot */}
      <div className="absolute left-3 top-2 bottom-0 w-px bg-divider" />
      <div className="absolute left-1.5 top-2 w-3 h-3 rounded-full bg-teal" />

      <div className="pb-8">
        <p className="font-mono text-xs text-gold tracking-wide uppercase mb-1">
          Entry No. {String(post.id).padStart(3, "0")}
        </p>

        <h2 className="font-display text-2xl font-semibold text-ink group-hover:text-teal transition-colors">
          {post.title}
        </h2>

        <div className="border-t border-divider my-3" />

        <p className="text-ink/70 leading-relaxed">
          {post.content}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="font-mono text-xs text-ink/50">
            {formatDate(post.createdAt)}
          </span>

          <div className="flex items-center gap-4">
            <button
              onClick={handleDelete}
              className="font-mono text-xs text-muted-red hover:underline"
            >
              Delete
            </button>
            <span className="font-mono text-xs text-teal">Read entry →</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard