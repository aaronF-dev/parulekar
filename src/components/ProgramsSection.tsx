import { Baby, BookOpen, Palette } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const ProgramsSection = () => {
  const { t } = useLanguage();
  
  const programs = [
    {
      icon: Baby,
      title: t('programs.foundation.title'),
      age: "Ages 3-4",
      description: t('programs.foundation.desc'),
      features: ["Play-based Learning", "Social Development", "Motor Skills", "Early Literacy"]
    },
    {
      icon: BookOpen, 
      title: t('programs.primary.title'),
      age: "Ages 5-10",
      description: t('programs.primary.desc'),
      features: ["Core Academics", "Critical Thinking", "Leadership Skills", "Character Building"]
    },
    {
      icon: Palette,
      title: t('programs.enrichment.title'),
      age: "All Ages",
      description: t('programs.enrichment.desc'),
      features: ["Arts & Crafts", "Sports", "Music", "Cultural Activities"]
    }
  ];

  return (
    <section id="programs" className="py-16 sm:py-20 md:py-24 bg-muted programs-section">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="luxury-heading text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-primary mb-4 sm:mb-6">
            {t('programs.title')}
            <span className="block text-secondary">{t('programs.subtitle')}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
            {t('programs.description')}
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <Card 
                key={index}
                className="group p-6 sm:p-8 hover:shadow-luxury hover:-translate-y-2 transition-all duration-500 bg-card border-0 shadow-premium animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-secondary/30 transition-colors duration-300">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-secondary" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-secondary bg-secondary/10 px-2 sm:px-3 py-1 rounded-full">
                    {program.age}
                  </span>
                </div>

                <h3 className="luxury-heading text-lg sm:text-xl md:text-2xl text-center text-primary mb-3 sm:mb-4">
                  {program.title}
                </h3>
                
                <p className="text-muted-foreground text-center mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {program.description}
                </p>

                <ul className="space-y-2">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-xs sm:text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;