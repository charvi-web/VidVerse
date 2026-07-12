import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Compass, Flame, Users, Upload } from "lucide-react";
import toast from "react-hot-toast";

import Container from "../components/ui/Container";
import VideoGridCard from "../components/ui/VideoGridCard";
import { VideoGridSkeleton } from "../components/ui/Skeleton";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";
import { getAllVideos } from "../services/videoService";
import { getCreators } from "../services/authService";
import { formatCount } from "../lib/utils";

const pageCopy = {
  explore: { icon: Compass, title: "Explore videos", subtitle: "Discover fresh stories from the VIDVERSE community.", params: { sortBy: "createdAt", sortType: "desc" } },
  trending: { icon: Flame, title: "Trending now", subtitle: "The videos the community is watching right now.", params: { sortBy: "views", sortType: "desc" } },
  creators: { icon: Users, title: "Creator spotlight", subtitle: "Explore videos from creators building their audience.", params: { sortBy: "createdAt", sortType: "desc" } },
};

const Explore = ({ mode = "explore" }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [creators, setCreators] = useState([]);
  const { icon: Icon, title, subtitle } = pageCopy[mode];

  useEffect(() => {
    let active = true;
    const loadVideos = async () => {
      try {
        setLoading(true);
        if (mode === "creators") {
          const response = await getCreators({ limit: 40 });
          if (active) setCreators(response.data || []);
        } else {
          const response = await getAllVideos({ limit: 40, ...pageCopy[mode].params });
          if (active) setVideos(response.data?.docs || response.data || []);
        }
      } catch (error) {
        if (active) toast.error(error?.response?.data?.message || "Could not load videos");
      } finally {
        if (active) setLoading(false);
      }
    };
    loadVideos();
    return () => { active = false; };
  }, [mode]);

  const visibleVideos = useMemo(() => {
    const term = query.trim().toLowerCase();
    const source = mode === "creators" ? creators : videos;
    return term ? source.filter((item) => (
      mode === "creators"
        ? `${item.fullName} ${item.username}`.toLowerCase().includes(term)
        : item.title?.toLowerCase().includes(term)
    )) : source;
  }, [query, videos, creators, mode]);

  return (
    <Container className="py-12">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-sm text-indigo-300"><Icon size={16} /> Discover</div>
          <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl">{title}</h1>
          <p className="mt-2 text-zinc-400">{subtitle}</p>
        </div>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={mode === "creators" ? "Search creators" : "Search videos"} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-indigo-500 sm:w-64" />
      </div>

      <div className="mt-10">
        {loading ? <VideoGridSkeleton count={8} /> : visibleVideos.length ? mode === "creators" ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleVideos.map((creator) => (
              <Link key={creator._id} to={`/profile/${creator.username}`} className="group rounded-3xl border border-white/10 bg-white/5 p-6 text-center transition hover:-translate-y-1 hover:border-indigo-500/50">
                <img src={creator.avatar?.url} alt={creator.username} className="mx-auto h-20 w-20 rounded-full border-2 border-indigo-400/40 object-cover" />
                <h2 className="mt-4 truncate font-bold text-white group-hover:text-indigo-300">{creator.fullName}</h2>
                <p className="mt-1 text-sm text-zinc-500">@{creator.username}</p>
                <div className="mt-4 flex justify-center gap-3 text-xs text-zinc-400"><span>{formatCount(creator.subscribersCount)} subscribers</span><span>{creator.videosCount} videos</span></div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleVideos.map((video) => <VideoGridCard key={video._id} video={video} />)}
          </div>
        ) : (
          <EmptyState icon={query ? Compass : Upload} title={query ? "No matching videos" : "No videos published yet"} subtitle={query ? "Try another search term." : "Be the first creator to share something worth watching."} action={!query && <Link to="/upload"><Button icon={Upload}>Upload a video</Button></Link>} />
        )}
      </div>
    </Container>
  );
};

export default Explore;
