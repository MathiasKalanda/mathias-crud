import axios from "axios";

const API = axios.create({ baseURL: "https://jsonplaceholder.typicode.com" });

export const fetchPosts = async (page = 1, limit = 10) => {
  const response = await API.get("/posts", {
    params: { _page: page, _limit: limit },
  });
  return {
    data: response.data,
    totalCount: parseInt(response.headers["x-total-count"], 10),
  };
};

export const fetchPost = async (id) => {
  const { data } = await API.get(`/posts/${id}`);
  return data;
};

export const createPost = async (post) => {
  const { data } = await API.post("/posts", post);
  return data;
};

export const updatePost = async ({ id, ...post }) => {
  const { data } = await API.put(`/posts/${id}`, post);
  return data;
};

export const deletePost = async (id) => {
  await API.delete(`/posts/${id}`);
  return id;
};

export const fetchComments = async (postId) => {
  const { data } = await API.get(`/posts/${postId}/comments`);
  return data;
};
