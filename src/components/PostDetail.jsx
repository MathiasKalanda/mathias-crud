import { useParams, useNavigate } from "react-router-dom";
import { usePost, useUpdatePost } from "../hooks/usePosts";
import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "../api/posts";
import { useState } from "react";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post, isLoading, isError } = usePost(id);
  const { data: comments = [] } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => fetchComments(id),
    enabled: !!id,
  });
  const updateMutation = useUpdatePost();

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  if (isLoading) return <div>Loading post...</div>;
  if (isError) return <div>Error loading post.</div>;

  const handleEdit = () => {
    setTitle(post.title);
    setBody(post.body);
    setEditMode(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateMutation.mutate(
      { id: post.id, title, body, userId: post.userId },
      {
        onSuccess: () => setEditMode(false),
      },
    );
  };

  const handleBack = () => navigate(-1);

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={handleBack}
        className="mb-4 text-blue-600 hover:underline"
      >
        &larr; Back
      </button>

      {editMode ? (
        <form
          onSubmit={handleUpdate}
          className="bg-white p-6 rounded shadow mb-6"
        >
          <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            rows={5}
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {updateMutation.isPending ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h1 className="text-2xl font-bold capitalize">{post.title}</h1>
          <p className="mt-4 text-gray-700">{post.body}</p>
          <button
            onClick={handleEdit}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
        </div>
      )}

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">
          Comments ({comments.length})
        </h3>
        {comments.map((comment) => (
          <div key={comment.id} className="border-b last:border-0 py-3">
            <p className="font-medium">
              {comment.name} ({comment.email})
            </p>
            <p className="text-gray-600 text-sm">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
