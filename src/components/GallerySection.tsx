import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const GallerySection = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryItems = [
    {
      id: 1,
      category: "campus",
      title: "Main Building",
      image: "https://ik.imagekit.io/u1orvlllk/g1.png?updatedAt=1759241847034",
      alt: "School main building exterior"
    },
    {
      id: 2,
      category: "classroom",
      title: "Modern Classroom",
      image: "https://ik.imagekit.io/u1orvlllk/g4.png?updatedAt=1759241843272",
      alt: "Bright modern classroom with students"
    },
    {
      id: 3,
      category: "activities",
      title: "Science Lab",
      image: "https://ik.imagekit.io/u1orvlllk/g2.png?updatedAt=1759241842743",
      alt: "Students conducting science experiments"
    },
    {
      id: 4,
      category: "campus",
      title: "Playground",
      image: "https://ik.imagekit.io/u1orvlllk/g5.png?updatedAt=1759241840353",
      alt: "Children playing on school playground"
    },
    {
      id: 5,
      category: "activities",
      title: "Art Class",
      image: "https://ik.imagekit.io/u1orvlllk/g3.png?updatedAt=1759241841900",
      alt: "Students creating art in art class"
    },
    {
      id: 6,
      category: "classroom",
      title: "Library",
      image: "https://ik.imagekit.io/u1orvlllk/g6.png?updatedAt=1759242014826",
      alt: "School library with students reading"
    },
    {
      id: 7,
      category: "activities",
      title: "Sports Day",
      image: "https://ik.imagekit.io/u1orvlllk/g7.png?updatedAt=1759242014909",
      alt: "Children participating in sports activities"
    },
    {
      id: 8,
      category: "campus",
      title: "Garden Area",
      image: "https://ik.imagekit.io/u1orvlllk/g8.png?updatedAt=1759242606809",
      alt: "Beautiful school garden area"
    }
  ];

  const filters = [
    { key: "all", label: "All Photos" },
    { key: "campus", label: "Campus" },
    { key: "classroom", label: "Classrooms" },
    { key: "activities", label: "Activities" }
  ];

  const filteredItems = activeFilter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="py-16 sm:py-20 md:py-24 bg-background relative gallery-section">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-4 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-4 sm:right-10 w-32 h-32 sm:w-40 sm:h-40 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <p className="text-accent uppercase tracking-wider font-semibold mb-4 text-sm">
            School Gallery
          </p>
          <h2 className="luxury-heading text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-foreground mb-4 sm:mb-6">
            {t('gallery.title')}
            <span className="text-secondary"> {t('gallery.subtitle')}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
            {t('gallery.description')}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 animate-fade-in px-4">
          {filters.map((filter, index) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.key)}
              className="px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, index) => (
            <Card
              key={item.id}
              className="group overflow-hidden bg-card border-border hover:shadow-luxury transition-all duration-500 cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(item.image)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center text-primary-foreground px-4">
                    <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm uppercase tracking-wider">{item.category}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl max-h-full animate-scale-in">
              <img
                src={selectedImage}
                alt="Gallery image"
                className="max-w-full max-h-full object-contain"
              />
              <Button
                variant="outline-light"
                size="icon"
                className="absolute top-4 right-4"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;