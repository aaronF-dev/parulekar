import { Button } from "@/components/ui/button";
import heroImage from "@/assets/parulekar hero.png";
import SearchBar from "@/components/SearchBar";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden wave-divider">
      {/* Language Toggle */}
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 z-20">
        <LanguageToggle />
      </div>

      {/* Search Bar - Responsive positioning */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 right-20 sm:right-auto z-20">
        <SearchBar />
      </div>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage}
          alt="Parulekar Primary School Campus"
          className="w-full h-full object-cover animate-parallax"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-70"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto animate-fade-in">
        <h1 className="hero-title text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-primary-foreground mb-4 sm:mb-6 leading-tight">
          {t('hero.title')}
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-secondary/90 mb-8 sm:mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed px-2">
          {t('hero.subtitle')}
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-scale-in px-4">
          <Button variant="gold" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6">
            {t('hero.enrollToday')}
          </Button>
          <Button variant="outline-light" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6">
            {t('hero.campusTour')}
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;