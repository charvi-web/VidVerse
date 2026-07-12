import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/hero/Hero";
import Features from "../components/sections/Features";
import FooterCTA from "../components/sections/FooterCTA";
import Container from "../components/ui/Container";
import VideoGridCard from "../components/ui/VideoGridCard";
import { VideoGridSkeleton } from "../components/ui/Skeleton";
import Button from "../components/ui/Button";
import { getAllVideos } from "../services/videoService";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  useEffect(() => {
    let active = true;

    const loadVideos = async () => {
      try {
        const response = await getAllVideos({
          limit: 8,
          sortBy: "createdAt",
          sortType: "desc",
        });
        if (active) {
          setVideos(response.data?.docs || response.data || []);
        }
      } catch (error) {
        console.error("Could not load uploaded videos", error);
      } finally {
        if (active) setLoadingVideos(false);
      }
    };

    loadVideos();
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Hero />
      <Container className="py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">Fresh uploads</p>
            <h2 className="mt-2 text-3xl font-black text-white">Latest from the community</h2>
          </div>
          <Link to="/explore">
            <Button variant="secondary">View all</Button>
          </Link>
        </div>

        {loadingVideos ? (
          <VideoGridSkeleton count={4} />
        ) : videos.length ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {videos.map((video) => (
              <VideoGridCard key={video._id} video={video} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-500">No videos have been published yet.</p>
        )}
      </Container>
      <Features />
      <FooterCTA />
    </>
  );
};

export default Home;
