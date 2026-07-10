import { motion } from "motion/react";
import { Play, Eye, Clock } from "lucide-react";

const VideoCard = ({ video }) => {
  return (
    <motion.div
      whileHover={{
        y: -10,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
      }}
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
      "
    >
      <div className="relative overflow-hidden">

        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-60 w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/40" />

        <motion.button
          whileHover={{
            scale: 1.15,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="
            absolute
            left-1/2
            top-1/2
            flex
            h-16
            w-16
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-white/20
            backdrop-blur-xl
          "
        >
          <Play
            fill="white"
            size={28}
          />
        </motion.button>

        <span
          className="
            absolute
            right-4
            top-4
            rounded-lg
            bg-black/70
            px-3
            py-1
            text-xs
            text-white
          "
        >
          {video.duration}
        </span>

      </div>

      <div className="space-y-3 p-6">

        <h3 className="line-clamp-2 text-xl font-bold text-white">
          {video.title}
        </h3>

        <p className="text-zinc-400">
          {video.creator}
        </p>

        <div className="flex items-center justify-between text-sm text-zinc-500">

          <div className="flex items-center gap-2">
            <Eye size={16} />
            {video.views}
          </div>

          <div className="flex items-center gap-2">
            <Clock size={16} />
            {video.duration}
          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default VideoCard;