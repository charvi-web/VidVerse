import API from "../api/axios";

// ==============================
// Register User
// ==============================
export const registerUser = async (formData) => {
  const { data } = await API.post("/users/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// ==============================
// Login User
// ==============================
export const loginUser = async (credentials) => {
  const { data } = await API.post("/users/login", credentials);

  if (data?.data?.accessToken) {
    localStorage.setItem("accessToken", data.data.accessToken);
  }

  return data;
};

// ==============================
// Logout User
// ==============================
export const logoutUser = async () => {
  const { data } = await API.post("/users/logout");

  localStorage.removeItem("accessToken");

  return data;
};

// ==============================
// Get Current User
// ==============================
export const getCurrentUser = async () => {
  const { data } = await API.get("/users/current-user");

  return data;
};

// ==============================
// Refresh Access Token
// ==============================
export const refreshToken = async () => {
  const { data } = await API.post("/users/refresh-token");

  if (data?.data?.accessToken) {
    localStorage.setItem("accessToken", data.data.accessToken);
  }

  return data;
};

// ==============================
// Update Account
// ==============================
export const updateAccount = async (payload) => {
  const { data } = await API.patch("/users/update-account", payload);

  return data;
};

// ==============================
// Change Password
// ==============================
export const changePassword = async (payload) => {
  const { data } = await API.patch("/users/change-password", payload);

  return data;
};

// ==============================
// Update Avatar
// ==============================
export const updateAvatar = async (formData) => {
  const { data } = await API.patch("/users/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// ==============================
// Update Cover Image
// ==============================
export const updateCoverImage = async (formData) => {
  const { data } = await API.patch("/users/cover-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// ==============================
// Get User Channel Profile
// ==============================
export const getChannelProfile = async (username) => {
  const { data } = await API.get(`/users/c/${username}`);

  return data;
};

// ==============================
// Get Watch History
// ==============================
export const getWatchHistory = async () => {
  const { data } = await API.get("/users/history");

  return data;
};

export const getCreators = async (params = {}) => {
  const { data } = await API.get("/users/creators", { params });
  return data;
};

// ==============================
// Delete Account
// ==============================
export const deleteAccount = async () => {
  const { data } = await API.delete("/users/delete-account");

  localStorage.removeItem("accessToken");

  return data;
};

const authService = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  refreshToken,
  updateAccount,
  changePassword,
  updateAvatar,
  updateCoverImage,
  getChannelProfile,
  getWatchHistory,
  getCreators,
  deleteAccount,
};

export default authService;
