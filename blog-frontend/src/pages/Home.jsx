import { useEffect, useState } from "react"
import { getPosts, deletePost } from "../api/api"
import PostForm from "../components/PostForm"
import PostCard from "../components/PostCard"
import ConfirmModal from "../components/ConfirmModal"

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [postIdToDelete, setPostIdToDelete] = useState(null)

  useEffect(() => {
    getPosts()
      .then(data => setPosts(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  function handlePostCreated(newPost) {
    setPosts(prev => [newPost, ...prev])
  }

  async function confirmDeletePost() {
    try {
      await deletePost(postIdToDelete)
      setPosts(prev => prev.filter(p => p.id !== postIdToDelete))
    } catch (err) {
      console.error(err)
      alert("Failed to delete post")
    } finally {
      setPostIdToDelete(null)
    }
  }

  if (loading) return <p className="text-center mt-10 font-mono text-sm text-ink/50">Loading...</p>

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <header className="mb-12">
        <p className="font-mono text-xs text-gold tracking-widest uppercase mb-2">
          A Running Log
        </p>
        <h1 className="font-display text-4xl font-bold text-ink">
          The Journal
        </h1>
      </header>

      <PostForm onPostCreated={handlePostCreated} />

      <div className="mt-12">
        {posts.length === 0 ? (
          <p className="font-mono text-sm text-ink/50">No entries yet. Write the first one above.</p>
        ) : (
          posts.map(post => (
            <PostCard key={post.id} post={post} onDelete={setPostIdToDelete} />
          ))
        )}
      </div>

      <ConfirmModal
        open={postIdToDelete !== null}
        title="Delete this entry?"
        message="This will permanently delete the post and all its comments. This cannot be undone."
        onConfirm={confirmDeletePost}
        onCancel={() => setPostIdToDelete(null)}
      />
    </div>
  )
}

export default Home