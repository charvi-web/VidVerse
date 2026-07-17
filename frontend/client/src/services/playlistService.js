import API from "../api/axios";

// =========================
// Create Playlist
// =========================
export const createPlaylist = async (payload) => {
  const { data } = await API.post("/playlist", payload);

  return data;
};

// =========================
// Get Playlist By Id
// =========================
export const getPlaylistById = async (playlistId) => {
  const { data } = await API.get(`/playlist/${playlistId}`);

  return data;
};

// =========================
// Get A User's Playlists
// =========================
export const getUserPlaylists = async (userId) => {
  const { data } = await API.get(`/playlist/user/${userId}`);

  return data;
};

// =========================
// Update Playlist
// =========================
export const updatePlaylist = async (playlistId, payload) => {
  const { data } = await API.patch(`/playlist/${playlistId}`, payload);

  return data;
};

// =========================
// Delete Playlist
// =========================
export const deletePlaylist = async (playlistId) => {
  const { data } = await API.delete(`/playlist/${playlistId}`);

  return data;
};

// =========================
// Add Video To Playlist
// =========================
export const addVideoToPlaylist = async (videoId, playlistId) => {
  const { data } = await API.patch(`/playlist/add/${videoId}/${playlistId}`);

  return data;
};

// =========================
// Remove Video From Playlist
// =========================
export const removeVideoFromPlaylist = async (videoId, playlistId) => {
  const { data } = await API.patch(
    `/playlist/remove/${videoId}/${playlistId}`
  );

  return data;
};

const playlistService = {
  createPlaylist,
  getPlaylistById,
  getUserPlaylists,
  updatePlaylist,
  deletePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
};

export default playlistService;
