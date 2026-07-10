import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Watch from "../pages/Watch";
import Upload from "../pages/Upload";
import Profile from "../pages/Profile";
import Playlist from "../pages/Playlist";
import History from "../pages/History";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/watch/:videoId" element={<Watch />} />

      <Route path="/upload" element={<Upload />} />

      <Route path="/profile/:username" element={<Profile />} />

      <Route path="/playlist/:id" element={<Playlist />} />

      <Route path="/history" element={<History />} />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;