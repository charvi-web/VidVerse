import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { History as HistoryIcon, Loader2, Eye } from "lucide-react";

import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

import { getWatchHistory } from "../services/authService";
import { formatDuration, formatViews, timeAgo } from "../lib/utils";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);
        const res = await getWatchHistory();
        setHistory(res.data || []);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to load watch history"
        );
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  return (
    <Container className="py-10">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-indigo-400">
          <HistoryIcon size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">Watch History</h1>
          <p className="text-sm text-zinc-500">
            Videos you've watched recently
          </p>
        </div>
      </div>

      {loading && (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="animate-spin text-indigo-500" size={36} />
        </div>
      )}

      {!loading && history.length === 0 && (
        <EmptyState
          icon={HistoryIcon}
          title="No watch history yet"
          subtitle="Videos you watch will show up here so you can pick up where you left off."
          action={
            <Link to="/">
              <Button>Explore Videos</Button>
            </Link>
          }
        />
      )}

      <div className="space-y-4">
        {history.map((video) => (
          <Link
            key={video._id}
            to={`/watch/${video._id}`}
            className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl transition hover:border-indigo-500/30 sm:flex-row sm:items-center"
          >
            <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-xl bg-black/40 sm:h-24 sm:w-40">
              <img
                src={video.thumbnail?.url}
                alt={video.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-[10px] text-white">
                {formatDuration(video.duration)}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-2 font-semibold text-white group-hover:text-indigo-300">
                {video.title}
              </h3>

              <p className="mt-1 truncate text-sm text-zinc-500">
                {video.owner?.fullName || video.owner?.username}
              </p>

              <div className="mt-1 flex items-center gap-2 text-xs text-zinc-600">
                <Eye size={12} />
                {formatViews(video.views)}
                <span>•</span>
                {timeAgo(video.createdAt)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default History;
