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
import Explore from "../pages/Explore";

import ProtectedRoute from "../components/auth/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}

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

      <Route path="/explore" element={<MainLayout><Explore /></MainLayout>} />
      <Route path="/trending" element={<MainLayout><Explore mode="trending" /></MainLayout>} />
      <Route path="/creators" element={<MainLayout><Explore mode="creators" /></MainLayout>} />

      <Route
        path="/watch/:videoId"
        element={
          <MainLayout>
            <Watch />
          </MainLayout>
        }
      />

      
      

      {/* Protected Routes */}

      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Upload />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/:username"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/playlist/:id"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Playlist />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <MainLayout>
              <History />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* 404 */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
