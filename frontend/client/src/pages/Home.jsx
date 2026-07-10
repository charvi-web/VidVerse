import Hero from "../components/hero/Hero";
import Features from "../components/sections/Features";
import Categories from "../components/sections/Categories";
import Trending from "../components/sections/Trending";
import PopularCreators from "../components/sections/PopularCreators";
import FooterCTA from "../components/sections/FooterCTA";
import Footer from "../components/layout/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <Categories />
      <Trending />
      <PopularCreators />
      <FooterCTA />
      <Footer />
    </>
  );
};

export default Home;