import API from "../api/axios";

// =========================
// Publish Video
// =========================
export const publishVideo = async (formData) => {
  const { data } = await API.post(
    "/video/publish",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// =========================
// Get All Videos
// =========================
export const getAllVideos = async (params = {}) => {
  const { data } = await API.get("/video", {
    params,
  });

  return data;
};

// =========================
// Get Video By Id
// =========================
export const getVideoById = async (id) => {
  const { data } = await API.get(`/video/${id}`);

  return data;
};

// =========================
// Delete Video
// =========================
export const deleteVideo = async (id) => {
  const { data } = await API.delete(
    `/video/${id}`
  );

  return data;
};

// =========================
// Update Video
// =========================
export const updateVideo = async (
  id,
  formData
) => {
  const { data } = await API.patch(
    `/video/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// =========================
// Toggle Publish
// =========================
export const togglePublish = async (id) => {
  const { data } = await API.patch(
    `/video/toggle/publish/${id}`
  );

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