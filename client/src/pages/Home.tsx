import HeroSlider from '@/components/HeroSlider';
import ToolsSection from '@/components/ToolsSection';
import FeaturedGuides from '@/components/FeaturedGuides';
import CommunityGallery from '@/components/CommunityGallery';

const Home = () => {
  return (
    <main className="flex-1" data-testid="home-page">
      <HeroSlider />
      <ToolsSection />
      <FeaturedGuides />
      <CommunityGallery />
    </main>
  );
};

export default Home;
