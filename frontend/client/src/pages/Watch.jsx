import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import ReactPlayer from "react-player";
import toast from "react-hot-toast";
import {
  ThumbsUp,
  Share2,
  ListPlus,
  Eye,
  Send,
  Trash2,
  Loader2,
  Plus,
  X,
} from "lucide-react";

import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

import useAuth from "../hooks/useAuth";
import { getVideoById, getAllVideos } from "../services/videoService";
import {
  getVideoComments,
  addComment,
  deleteComment,
} from "../services/commentService";
import { toggleVideoLike } from "../services/likeService";
import { toggleSubscription } from "../services/subscriptionService";
import {
  getUserPlaylists,
  createPlaylist,
  addVideoToPlaylist,
} from "../services/playlistService";
import { formatViews, timeAgo } from "../lib/utils";

const Watch = () => {
  const { videoId } = useParams();
  const { user, isAuthenticated } = useAuth();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);

  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [postingComment, setPostingComment] = useState(false);

  const [subscribing, setSubscribing] = useState(false);
  const [liking, setLiking] = useState(false);

  const [showDescription, setShowDescription] = useState(false);
  const [playlistMenuOpen, setPlaylistMenuOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  // -----------------------------
  // Load video
  // -----------------------------
  useEffect(() => {
    const loadVideo = async () => {
      try {
        setLoading(true);
        const res = await getVideoById(videoId);
        setVideo(res.data);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to load video"
        );
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [videoId]);

  // -----------------------------
  // Load comments
  // -----------------------------
  useEffect(() => {
    const loadComments = async () => {
      try {
        setCommentsLoading(true);
        const res = await getVideoComments(videoId);
        setComments(res.data?.docs || res.data || []);
      } catch {
        // silently ignore, comments are non critical
      } finally {
        setCommentsLoading(false);
      }
    };

    loadComments();
  }, [videoId]);

  // -----------------------------
  // Load related videos
  // -----------------------------
  useEffect(() => {
    const loadRelated = async () => {
      try {
        setRelatedLoading(true);
        const res = await getAllVideos({ limit: 12, sortBy: "createdAt", sortType: "desc" });
        const docs = res.data?.docs || res.data || [];
        setRelated(docs.filter((v) => v._id !== videoId));
      } catch {
        // non critical
      } finally {
        setRelatedLoading(false);
      }
    };

    loadRelated();
  }, [videoId]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to like this video");
      return;
    }

    try {
      setLiking(true);
      const res = await toggleVideoLike(videoId);
      setVideo((prev) => ({
        ...prev,
        isLiked: res.data.isLiked,
        likesCount: (prev.likesCount || 0) + (res.data.isLiked ? 1 : -1),
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLiking(false);
    }
  };

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to subscribe");
      return;
    }

    try {
      setSubscribing(true);
      await toggleSubscription(video.owner._id);
      setVideo((prev) => ({
        ...prev,
        owner: {
          ...prev.owner,
          isSubscribed: !prev.owner.isSubscribed,
          subscribersCount:
            (prev.owner.subscribersCount || 0) +
            (prev.owner.isSubscribed ? -1 : 1),
        },
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setSubscribing(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const handlePostComment = async (e) => {
  e.preventDefault();

  if (!isAuthenticated) {
    toast.error("Please login to comment");
    return;
  }

  if (!commentText.trim()) {
    toast.error("Please enter a comment");
    return;
  }

  try {
    setPostingComment(true);

    const res = await addComment(videoId, commentText.trim());

    const newComment = res.data?.data || res.data;

    setComments((prev) => [
      {
        ...newComment,
        owner: {
          username: user?.username,
          fullName: user?.fullName,
          avatar: user?.avatar,
        },
      },
      ...prev,
    ]);

    setCommentText("");
    toast.success("Comment added successfully");
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message || "Failed to post comment");
  } finally {
    setPostingComment(false);
  }
};

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      toast.success("Comment deleted");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete");
    }
  };

  const openPlaylistMenu = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to save videos");
      return;
    }

    setPlaylistMenuOpen(true);

    try {
      const res = await getUserPlaylists(user._id);
      setPlaylists(res.data || []);
    } catch {
      toast.error("Could not load your playlists");
    }
  };

  const handleAddToPlaylist = async (playlistId) => {
    try {
      await addVideoToPlaylist(videoId, playlistId);
      toast.success("Added to playlist");
      setPlaylistMenuOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add video");
    }
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return;

    try {
      const res = await createPlaylist({
        name: newPlaylistName.trim(),
        description: "",
      });
      await addVideoToPlaylist(videoId, res.data._id);
      toast.success("Playlist created and video added");
      setNewPlaylistName("");
      setPlaylistMenuOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create playlist");
    }
  };

  const durationHuman = useMemo(() => {
    if (!video?.createdAt) return "";
    return timeAgo(video.createdAt);
  }, [video]);

  if (loading) {
    return (
      <Container className="py-24">
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="animate-spin text-indigo-500" size={40} />
        </div>
      </Container>
    );
  }

  if (!video) {
    return (
      <Container className="py-24">
        <EmptyState
          title="Video not found"
          subtitle="This video may have been removed or the link is broken."
          action={
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          }
        />
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* ===================== Main Column ===================== */}
        <div className="lg:col-span-2">
          {/* Player */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl shadow-black/50"
          >
            <ReactPlayer
              src={video.videoFile?.url}
              controls
              width="100%"
              height="100%"
              style={{ position: "absolute", inset: 0 }}
            />
          </motion.div>

          {/* Title */}
          <h1 className="mt-6 text-2xl font-bold text-white lg:text-3xl">
            {video.title}
          </h1>

          <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
            <Eye size={14} />
            <span>{formatViews(video.views)}</span>
            <span>•</span>
            <span>{durationHuman}</span>
          </div>

          {/* Owner row + actions */}
          <div className="mt-6 flex flex-col gap-4 border-y border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to={`/profile/${video.owner?.username}`}
              className="flex items-center gap-3"
            >
              <img
                src={video.owner?.avatar?.url}
                alt={video.owner?.username}
                className="h-12 w-12 rounded-full border border-white/10 object-cover"
              />

              <div>
                <p className="font-semibold text-white">
                  {video.owner?.username}
                </p>
                <p className="text-xs text-zinc-500">
                  {formatViews(video.owner?.subscribersCount).replace(
                    "views",
                    "subscribers"
                  )}
                </p>
              </div>
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              {user?._id !== video.owner?._id && (
                <Button
                  onClick={handleSubscribe}
                  loading={subscribing}
                  variant={video.owner?.isSubscribed ? "secondary" : "primary"}
                >
                  {video.owner?.isSubscribed ? "Subscribed" : "Subscribe"}
                </Button>
              )}

              <Button
                variant="secondary"
                icon={ThumbsUp}
                loading={liking}
                onClick={handleLike}
                className={video.isLiked ? "text-indigo-400" : ""}
              >
                {video.likesCount || 0}
              </Button>

              <Button variant="secondary" icon={Share2} onClick={handleShare}>
                Share
              </Button>

              <div className="relative">
                <Button
                  variant="secondary"
                  icon={ListPlus}
                  onClick={openPlaylistMenu}
                >
                  Save
                </Button>

                <AnimatePresence>
                  {playlistMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setPlaylistMenuOpen(false)}
                      />

                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border border-white/10 bg-[#111114] p-4 shadow-2xl backdrop-blur-2xl"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-white">
                            Save to playlist
                          </p>
                          <button
                            onClick={() => setPlaylistMenuOpen(false)}
                            className="text-zinc-500 hover:text-white"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        <div className="mt-3 max-h-48 space-y-1 overflow-y-auto">
                          {playlists.length === 0 && (
                            <p className="py-4 text-center text-xs text-zinc-500">
                              No playlists yet
                            </p>
                          )}

                          {playlists.map((pl) => (
                            <button
                              key={pl._id}
                              onClick={() => handleAddToPlaylist(pl._id)}
                              className="w-full rounded-lg px-3 py-2 text-left text-sm text-zinc-300 hover:bg-white/5"
                            >
                              {pl.name}
                            </button>
                          ))}
                        </div>

                        <div className="mt-3 flex gap-2 border-t border-white/10 pt-3">
                          <input
                            value={newPlaylistName}
                            onChange={(e) =>
                              setNewPlaylistName(e.target.value)
                            }
                            placeholder="New playlist name"
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
                          />

                          <button
                            onClick={handleCreatePlaylist}
                            className="flex items-center justify-center rounded-lg bg-indigo-600 px-3 text-white hover:bg-indigo-500"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p
              className={`whitespace-pre-line text-sm text-zinc-300 ${
                showDescription ? "" : "line-clamp-3"
              }`}
            >
              {video.description}
            </p>

            {video.description?.length > 140 && (
              <button
                onClick={() => setShowDescription((s) => !s)}
                className="mt-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                {showDescription ? "Show less" : "Show more"}
              </button>
            )}
          </div>

          {/* Comments */}
          <div className="mt-8">
            <h2 className="text-lg font-bold text-white">
              {comments.length} Comments
            </h2>

            {isAuthenticated && (
              <form
                onSubmit={handlePostComment}
                className="mt-5 flex items-start gap-3"
              >
                <img
                  src={user?.avatar?.url}
                  alt={user?.username}
                  className="h-10 w-10 shrink-0 rounded-full border border-white/10 object-cover"
                />

                <div className="flex-1">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    rows={2}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500"
                  />

                  <div className="mt-2 flex justify-end">
                    <Button
                      size="sm"
                      icon={Send}
                      loading={postingComment}
                      disabled={!commentText.trim()}
                    >
                      Comment
                    </Button>
                  </div>
                </div>
              </form>
            )}

            <div className="mt-6 space-y-5">
              {commentsLoading && (
                <p className="text-sm text-zinc-500">Loading comments...</p>
              )}

              {!commentsLoading && comments.length === 0 && (
                <p className="text-sm text-zinc-500">
                  Be the first to comment.
                </p>
              )}

              {comments.map((comment) => (
                <div key={comment._id} className="flex items-start gap-3">
                  <img
                    src={comment.owner?.avatar?.url || comment.owner?.avatar}
                    alt={comment.owner?.username}
                    className="h-10 w-10 shrink-0 rounded-full border border-white/10 object-cover"
                  />

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-white">
                        {comment.owner?.username}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {timeAgo(comment.createdAt)}
                      </p>
                    </div>

                    <p className="mt-1 text-sm text-zinc-300">
                      {comment.content}
                    </p>
                  </div>

                  {user?.username === comment.owner?.username && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-zinc-600 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===================== Sidebar: Related ===================== */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-white">Up next</h2>

          {relatedLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-2xl bg-white/5"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {related.slice(0, 8).map((v) => (
                <Link
                  key={v._id}
                  to={`/watch/${v._id}`}
                  className="group flex gap-3 rounded-2xl p-2 transition hover:bg-white/5"
                >
                  <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl bg-black/40">
                    <img
                      src={v.thumbnail?.url || v.thumbnail}
                      alt={v.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-medium text-white group-hover:text-indigo-300">
                      {v.title}
                    </p>
                    <p className="mt-1 truncate text-xs text-zinc-500">
                      {v.ownerDetails?.username || v.owner?.username}
                    </p>
                    <p className="text-xs text-zinc-600">
                      {formatViews(v.views)}
                    </p>
                  </div>
                </Link>
              ))}

              {related.length === 0 && (
                <p className="text-sm text-zinc-500">No videos to show.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Watch;
