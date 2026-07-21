import { useEffect, useState } from "react"
import { getPosts } from "../api/api"
import PostForm from "../components/PostForm"
import { Link } from "react-router-dom"
function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPosts()
      .then(data => setPosts(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  function handlePostCreated(newPost) {
    setPosts(prev => [newPost, ...prev])
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Blog Posts</h1>

      <PostForm onPostCreated={handlePostCreated} />

      <div className="space-y-4">
   {posts.map(post => (
  <Link to={`/posts/${post.id}`} key={post.id}>
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition cursor-pointer">
      <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
      <p className="text-gray-600 mt-1">{post.content}</p>
    </div>
  </Link>
))}
      </div>
    </div>
  )
}

export default Home