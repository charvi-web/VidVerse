import API from "../api/axios";

// =========================
// Publish Video
// =========================
export const publishVideo = async (formData) => {
  const { data } = await API.post("/videos", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// =========================
// Get All Videos
// =========================
export const getAllVideos = async (params = {}) => {
  const { data } = await API.get("/videos", {
    params,
  });

  return data;
};

// =========================
// Get Video By Id
// =========================
export const getVideoById = async (id) => {
  const { data } = await API.get(`/videos/v/${id}`);

  return data;
};

// =========================
// Delete Video
// =========================
export const deleteVideo = async (id) => {
  const { data } = await API.delete(`/videos/v/${id}`);

  return data;
};

// =========================
// Update Video
// =========================
export const updateVideo = async (id, formData) => {
  const { data } = await API.patch(`/videos/v/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// =========================
// Toggle Publish
// =========================
export const togglePublish = async (id) => {
  const { data } = await API.patch(`/videos/toggle/publish/${id}`);

  return data;
};

const videoService = {
  publishVideo,
  getAllVideos,
  getVideoById,
  deleteVideo,
  updateVideo,
  togglePublish,
};

export default videoService;
