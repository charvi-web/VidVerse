import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2, ListVideo, Trash2, Eye } from "lucide-react";

import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

import useAuth from "../hooks/useAuth";
import {
  getPlaylistById,
  removeVideoFromPlaylist,
  deletePlaylist,
} from "../services/playlistService";
import { formatDuration, formatViews } from "../lib/utils";

const Playlist = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadPlaylist = async () => {
    try {
      setLoading(true);
      const res = await getPlaylistById(id);
      setPlaylist(res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Playlist not found");
      setPlaylist(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Data loading is asynchronous; the helper owns loading state transitions.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPlaylist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleRemoveVideo = async (videoId) => {
    try {
      await removeVideoFromPlaylist(videoId, id);
      setPlaylist((prev) => ({
        ...prev,
        videos: prev.videos.filter((v) => v._id !== videoId),
        totalVideos: prev.totalVideos - 1,
      }));
      toast.success("Removed from playlist");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to remove video");
    }
  };

  const handleDeletePlaylist = async () => {
    if (!window.confirm("Delete this playlist permanently?")) return;

    try {
      await deletePlaylist(id);
      toast.success("Playlist deleted");
      navigate(-1);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
      </div>
    );
  }

  if (!playlist || !playlist.name) {
    return (
      <Container className="py-24">
        <EmptyState
          title="Playlist not found"
          subtitle="This playlist may have been deleted or the link is incorrect."
          action={
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          }
        />
      </Container>
    );
  }

  const isOwner = user?._id === playlist.owner?._id;

  return (
    <Container className="py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar info */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600/15 to-purple-600/15 p-8 backdrop-blur-xl">
            <div className="flex h-32 w-full items-center justify-center rounded-2xl bg-white/5">
              <ListVideo className="text-indigo-400" size={40} />
            </div>

            <h1 className="mt-6 text-2xl font-black text-white">
              {playlist.name}
            </h1>

            {playlist.description && (
              <p className="mt-2 text-sm text-zinc-400">
                {playlist.description}
              </p>
            )}

            <div className="mt-5 space-y-1 text-sm text-zinc-500">
              <p>{playlist.totalVideos} videos</p>
              <p>{formatViews(playlist.totalViews)}</p>
              {playlist.owner?.username && (
                <p>
                  By{" "}
                  <Link
                    to={`/profile/${playlist.owner.username}`}
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    {playlist.owner.username}
                  </Link>
                </p>
              )}
            </div>

            {isOwner && (
              <Button
                variant="danger"
                icon={Trash2}
                className="mt-6 w-full"
                onClick={handleDeletePlaylist}
              >
                Delete Playlist
              </Button>
            )}
          </div>
        </div>

        {/* Video list */}
        <div className="lg:col-span-3">
          {(!playlist.videos || playlist.videos.length === 0) && (
            <EmptyState
              icon={ListVideo}
              title="No videos in this playlist"
              subtitle="Add videos to this playlist from any watch page."
            />
          )}

          <div className="space-y-4">
            {playlist.videos?.map((video, index) => (
              <div
                key={video._id}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl transition hover:border-indigo-500/30"
              >
                <span className="w-6 shrink-0 text-center text-sm text-zinc-600">
                  {index + 1}
                </span>

                <Link
                  to={`/watch/${video._id}`}
                  className="relative h-20 w-36 shrink-0 overflow-hidden rounded-xl bg-black/40"
                >
                  <img
                    src={video.thumbnail?.url}
                    alt={video.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-[10px] text-white">
                    {formatDuration(video.duration)}
                  </span>
                </Link>

                <div className="min-w-0 flex-1">
                  <Link to={`/watch/${video._id}`}>
                    <h3 className="line-clamp-2 text-sm font-semibold text-white group-hover:text-indigo-300">
                      {video.title}
                    </h3>
                  </Link>
                  <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                    <Eye size={12} />
                    {formatViews(video.views)}
                  </div>
                </div>

                {isOwner && (
                  <button
                    onClick={() => handleRemoveVideo(video._id)}
                    className="shrink-0 text-zinc-600 hover:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Playlist;
