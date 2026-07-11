import API from "../api/axios";

// =========================
// Get Comments For A Video
// =========================
export const getVideoComments = async (videoId, params = {}) => {
  const { data } = await API.get(`/comment/${videoId}`, { params });

  return data;
};

// =========================
// Add Comment
// =========================
export const addComment = async (videoId, content) => {
  const { data } = await API.post(`/comment/${videoId}`, { content });

  return data;
};

// =========================
// Update Comment
// =========================
export const updateComment = async (commentId, content) => {
  const { data } = await API.patch(`/comment/c/${commentId}`, { content });

  return data;
};

// =========================
// Delete Comment
// =========================
export const deleteComment = async (commentId) => {
  const { data } = await API.delete(`/comment/c/${commentId}`);

  return data;
};

const commentService = {
  getVideoComments,
  addComment,
  updateComment,
  deleteComment,
};

export default commentService;
