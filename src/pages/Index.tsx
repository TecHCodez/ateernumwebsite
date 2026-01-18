import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import CommitteesSection from '@/components/CommitteesSection';
import SecGenMessage from '@/components/SecGenMessage';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <CommitteesSection />
          <SecGenMessage />
          <FAQSection />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Index;
