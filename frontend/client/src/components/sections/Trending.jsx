import { motion } from "motion/react";
import SectionHeading from "../ui/SectionHeading";
import VideoCard from "../ui/VideoCard";
import { trendingVideos } from "../../constants/trending";

const Trending = () => {
  return (
    <section className="py-32">

      <div className="mx-auto max-w-7xl px-6">

        <SectionHeading
          badge="TRENDING"
          title="What's Trending Today"
          subtitle="Discover the most watched content across VIDVERSE."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {trendingVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.15,
              }}
            >
              <VideoCard video={video} />
            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Trending;