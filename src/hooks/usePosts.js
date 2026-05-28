import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPosts,
  fetchPost,
  createPost,
  updatePost,
  deletePost,
} from "../api/posts";

export const usePosts = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["posts", { page, limit }],
    queryFn: () => fetchPosts(page, limit),
    keepPreviousData: true,
    placeholderData: (previousData) => previousData,
  });
};

export const usePost = (id) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.setQueryData(["post", updatedPost.id], updatedPost);
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: (deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
