import API from "../api/axios";

// =========================
// Toggle Like On A Video
// =========================
export const toggleVideoLike = async (videoId) => {
  const { data } = await API.post(`/likes/toggle/v/${videoId}`);

  return data;
};

// =========================
// Toggle Like On A Comment
// =========================
export const toggleCommentLike = async (commentId) => {
  const { data } = await API.post(`/likes/toggle/c/${commentId}`);

  return data;
};

// =========================
// Toggle Like On A Tweet
// =========================
export const toggleTweetLike = async (tweetId) => {
  const { data } = await API.post(`/likes/toggle/t/${tweetId}`);

  return data;
};

// =========================
// Get All Liked Videos
// =========================
export const getLikedVideos = async () => {
  const { data } = await API.get("/likes/videos");

  return data;
};

const likeService = {
  toggleVideoLike,
  toggleCommentLike,
  toggleTweetLike,
  getLikedVideos,
};

export default likeService;
