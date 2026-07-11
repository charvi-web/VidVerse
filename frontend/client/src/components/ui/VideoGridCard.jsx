import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { formatDuration, formatViews, timeAgo } from "../../lib/utils";

const VideoGridCard = ({ video, showOwner = true }) => {
  const thumbnail = video.thumbnail?.url || video.thumbnail;
  const owner = video.ownerDetails || video.owner;

  return (
    <Link
      to={`/watch/${video._id}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-white/[0.07]"
    >
      <div className="relative aspect-video overflow-hidden bg-black/40">
        {thumbnail ? (
          <img src={thumbnail} alt={video.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-indigo-500/30 to-purple-600/20" />
        )}
        {video.duration != null && (
          <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[11px] font-medium text-white">
            {formatDuration(video.duration)}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 font-semibold text-white transition group-hover:text-indigo-300">{video.title}</h3>
        {showOwner && owner && (
          <p className="mt-2 truncate text-sm text-zinc-500">{owner.fullName || owner.username}</p>
        )}
        <div className="mt-2 flex items-center gap-2 text-xs text-zinc-600">
          <Eye size={13} aria-hidden="true" />
          <span>{formatViews(video.views)}</span>
          {video.createdAt && <span>· {timeAgo(video.createdAt)}</span>}
        </div>
      </div>
    </Link>
  );
};

export default VideoGridCard;
