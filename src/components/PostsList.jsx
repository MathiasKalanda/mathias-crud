import { useState } from "react";
import { Link } from "react-router-dom";
import { usePosts, useCreatePost, useDeletePost } from "../hooks/usePosts";

const POSTS_PER_PAGE = 10;

export default function PostsList() {
  const [page, setPage] = useState(1);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  const { data, isLoading, isError, error } = usePosts(page, POSTS_PER_PAGE);
  const createMutation = useCreatePost();
  const deleteMutation = useDeletePost();

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const { data: posts, totalCount } = data;
  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createMutation.mutate(
      { title: newTitle, body: newBody, userId: 1 },
      {
        onSuccess: () => {
          setNewTitle("");
          setNewBody("");
        },
      },
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this post?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div>
      {/* Create Post Form */}
      <form
        onSubmit={handleCreate}
        className="mb-8 bg-white p-4 rounded shadow"
      >
        <h2 className="text-xl font-semibold mb-3">Create New Post</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <textarea
          placeholder="Body"
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="submit"
          disabled={createMutation.isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {createMutation.isPending ? "Creating..." : "Create Post"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 rounded shadow flex flex-col"
          >
            <Link to={`/post/${post.id}`} className="hover:underline">
              <h3 className="font-bold text-lg mb-2">{post.title}</h3>
            </Link>
            <p className="text-gray-600 flex-1">
              {post.body.substring(0, 100)}...
            </p>
            <div className="flex justify-between mt-4">
              <Link
                to={`/post/${post.id}`}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Edit / View
              </Link>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
