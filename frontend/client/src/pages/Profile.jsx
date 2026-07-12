import { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { Loader2, Users, Video as VideoIcon, ListVideo, BadgeCheck, MessageSquare } from "lucide-react";

import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import VideoGridCard from "../components/ui/VideoGridCard";
import EmptyState from "../components/ui/EmptyState";
import { VideoGridSkeleton } from "../components/ui/Skeleton";

import useAuth from "../hooks/useAuth";
import { getChannelProfile } from "../services/authService";
import { getAllVideos } from "../services/videoService";
import { getUserPlaylists } from "../services/playlistService";
import { toggleSubscription } from "../services/subscriptionService";
import { formatCount } from "../lib/utils";
import TweetPanel from "../components/profile/TweetPanel";

const TABS = [
  { key: "videos", label: "Videos", icon: VideoIcon },
  { key: "playlists", label: "Playlists", icon: ListVideo },
  { key: "tweets", label: "Updates", icon: MessageSquare },
];

const Profile = () => {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const { user: currentUser } = useAuth();

  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);

  const [tab, setTab] = useState(
    searchParams.get("tab") === "tweets" ? "tweets" : "videos"
  );
  const [videos, setVideos] = useState([]);
  const [videosLoading, setVideosLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [playlistsLoading, setPlaylistsLoading] = useState(true);

  useEffect(() => {
    const loadChannel = async () => {
      try {
        setLoading(true);
        const res = await getChannelProfile(username);
        setChannel(res.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Channel not found");
        setChannel(null);
      } finally {
        setLoading(false);
      }
    };

    loadChannel();
  }, [username]);

  useEffect(() => {
    if (!channel?._id) return;

    const loadVideos = async () => {
      try {
        setVideosLoading(true);
        const res = await getAllVideos({ userId: channel._id, limit: 24 });
        setVideos(res.data?.docs || res.data || []);
      } catch {
        // non critical
      } finally {
        setVideosLoading(false);
      }
    };

    const loadPlaylists = async () => {
      try {
        setPlaylistsLoading(true);
        const res = await getUserPlaylists(channel._id);
        setPlaylists(res.data || []);
      } catch {
        // non critical
      } finally {
        setPlaylistsLoading(false);
      }
    };

    loadVideos();
    loadPlaylists();
  }, [channel?._id]);

  const handleSubscribe = async () => {
    if (!currentUser) {
      toast.error("Please login to subscribe");
      return;
    }

    try {
      setSubscribing(true);
      await toggleSubscription(channel._id);
      setChannel((prev) => ({
        ...prev,
        isSubscribed: !prev.isSubscribed,
        subscribersCount: prev.subscribersCount + (prev.isSubscribed ? -1 : 1),
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
      </div>
    );
  }

  if (!channel) {
    return (
      <Container className="py-24">
        <EmptyState
          title="Channel not found"
          subtitle="This creator doesn't exist or the link is incorrect."
          action={
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          }
        />
      </Container>
    );
  }

  const isOwnProfile = currentUser?.username === channel.username;

  return (
    <div>
      {/* Cover */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-700 to-fuchsia-800 sm:h-64 lg:h-80">
        {channel.coverImage?.url ? (
          <img
            src={channel.coverImage.url}
            alt="cover"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.26),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(34,211,238,0.34),transparent_28%)]" />
        )}
        {channel.coverImage?.url && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        )}
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <div className="-mt-16 flex flex-col items-start gap-6 sm:-mt-20 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end">
            <img
              src={channel.avatar?.url}
              alt={channel.username}
              className="h-28 w-28 rounded-full border-4 border-[#09090B] object-cover shadow-2xl sm:h-36 sm:w-36"
            />

            <div className="pb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white sm:text-3xl">
                  {channel.fullName}
                </h1>
                <BadgeCheck className="text-indigo-400" size={22} />
              </div>

              <p className="mt-1 text-zinc-400">@{channel.username}</p>

              <div className="mt-2 flex items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Users size={14} />
                  {formatCount(channel.subscribersCount)} subscribers
                </span>
                <span>
                  {formatCount(channel.channelsSubscribedToCount)} subscribed
                </span>
              </div>
            </div>
          </div>

          <div className="pb-1">
            {isOwnProfile ? (
              <Link to="/upload">
                <Button variant="secondary">Upload Video</Button>
              </Link>
            ) : (
              <Button
                onClick={handleSubscribe}
                loading={subscribing}
                variant={channel.isSubscribed ? "secondary" : "primary"}
              >
                {channel.isSubscribed ? "Subscribed" : "Subscribe"}
              </Button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex gap-2 border-b border-white/10">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`relative flex items-center gap-2 px-5 py-3 text-sm font-medium transition ${
                tab === key
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Icon size={16} />
              {label}

              {tab === key && (
                <motion.div
                  layoutId="profile-tab-indicator"
                  className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="py-10">
          {tab === "videos" &&
            (videosLoading ? (
              <VideoGridSkeleton count={8} />
            ) : videos.length === 0 ? (
              <EmptyState
                icon={VideoIcon}
                title="No videos yet"
                subtitle={
                  isOwnProfile
                    ? "Upload your first video to get started."
                    : "This channel hasn't uploaded any videos yet."
                }
                action={
                  isOwnProfile && (
                    <Link to="/upload">
                      <Button>Upload Video</Button>
                    </Link>
                  )
                }
              />
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {videos.map((v) => (
                  <VideoGridCard key={v._id} video={v} showOwner={false} />
                ))}
              </div>
            ))}

          {tab === "playlists" &&
            (playlistsLoading ? (
              <VideoGridSkeleton count={4} />
            ) : playlists.length === 0 ? (
              <EmptyState
                icon={ListVideo}
                title="No playlists yet"
                subtitle="Playlists created by this channel will show up here."
              />
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {playlists.map((pl) => (
                  <Link
                    key={pl._id}
                    to={`/playlist/${pl._id}`}
                    className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-indigo-500/30"
                  >
                    <div className="flex h-32 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20">
                      <ListVideo className="text-indigo-400" size={32} />
                    </div>

                    <h3 className="mt-4 font-bold text-white group-hover:text-indigo-300">
                      {pl.name}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                      {pl.totalVideos} videos
                    </p>
                  </Link>
                ))}
              </div>
            ))}

          {tab === "tweets" && <TweetPanel channel={channel} currentUser={currentUser} isOwnProfile={isOwnProfile} />}
        </div>
      </Container>
    </div>
  );
};

export default Profile;
