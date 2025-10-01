import { GraduationCap, Heart, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PromiseSection = () => {
  const { t } = useLanguage();
  
  const promises = [
    {
      icon: GraduationCap,
      title: t('promise.excellence.title'),
      description: t('promise.excellence.desc')
    },
    {
      icon: Heart,
      title: t('promise.character.title'),
      description: t('promise.character.desc')
    },
    {
      icon: Users,
      title: t('promise.innovation.title'),
      description: t('promise.innovation.desc')
    }
  ];

  return (
    <section id="promise" className="py-16 sm:py-20 md:py-24 bg-primary text-primary-foreground promise-section">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <div className="w-16 sm:w-24 h-1 bg-secondary mx-auto mb-6 sm:mb-8"></div>
          <h2 className="luxury-heading text-2xl sm:text-3xl md:text-4xl lg:text-6xl mb-4 sm:mb-6">
            {t('promise.title')}
            <span className="block text-secondary">{t('promise.subtitle')}</span>
          </h2>
        </div>

        {/* Promise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {promises.map((promise, index) => {
            const Icon = promise.icon;
            return (
              <div 
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300 animate-slide-up px-4"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-secondary/30 transition-colors duration-300">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-secondary" />
                </div>
                <h3 className="luxury-heading text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-primary-foreground">
                  {promise.title}
                </h3>
                <p className="text-primary-foreground/80 leading-relaxed text-sm sm:text-base">
                  {promise.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PromiseSection;