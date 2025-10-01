import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

// Import staff images
import principalImage from "@/assets/icon.png";
import mathTeacherImage from "@/assets/icon.png";
import englishTeacherImage from "@/assets/icon.png";
import scienceTeacherImage from "@/assets/icon.png";
import peTeacherImage from "@/assets/icon.png";
import artTeacherImage from "@/assets/icon.png";
import musicTeacherImage from "@/assets/icon.png";
import csTeacherImage from "@/assets/icon.png";
import librarianImage from "@/assets/icon.png";

const TestimonialsSection = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const staffMembers = [
    {
      name: "Dr. Priya Sharma",
      role: "Principal",
      image: principalImage,
      description: "With 20+ years in education, Dr. Sharma leads our school with vision and dedication to excellence in learning.",
      qualifications: "M.Ed, Ph.D in Educational Leadership"
    },
    {
      name: "Rajesh Kumar",
      role: "Mathematics Teacher",
      image: mathTeacherImage,
      description: "Making mathematics fun and accessible for young minds through innovative teaching methods and real-world applications.",
      qualifications: "M.Sc Mathematics, B.Ed"
    },
    {
      name: "Anisha Patel", 
      role: "English Teacher",
      image: englishTeacherImage,
      description: "Fostering creativity and communication skills through literature, writing, and engaging language activities.",
      qualifications: "M.A English Literature, B.Ed"
    },
    {
      name: "Dr. Meera Desai",
      role: "Science Teacher", 
      image: scienceTeacherImage,
      description: "Inspiring scientific curiosity through hands-on experiments and discovery-based learning approaches.",
      qualifications: "M.Sc Chemistry, Ph.D, B.Ed"
    },
    {
      name: "Arjun Singh",
      role: "Physical Education Teacher",
      image: peTeacherImage,
      description: "Promoting fitness, teamwork, and sportsmanship while developing healthy lifestyle habits in students.",
      qualifications: "B.P.Ed, Sports Science Diploma"
    },
    {
      name: "Kavya Nair",
      role: "Art Teacher",
      image: artTeacherImage,
      description: "Nurturing artistic expression and creativity through various art forms, colors, and imaginative projects.",
      qualifications: "M.F.A, Art Education Certificate"
    },
    {
      name: "Rohit Sharma",
      role: "Music Teacher",
      image: musicTeacherImage,
      description: "Cultivating musical talent and appreciation through diverse instruments, vocal training, and creative expression.",
      qualifications: "M.A Music, Performance Diploma"
    },
    {
      name: "Neha Gupta",
      role: "Computer Science Teacher",
      image: csTeacherImage,
      description: "Introducing students to technology and programming through interactive coding sessions and digital literacy.",
      qualifications: "M.Tech Computer Science, B.Ed"
    },
    {
      name: "Sanjay Mehta",
      role: "Librarian",
      image: librarianImage,
      description: "Fostering love for reading and research skills while maintaining our extensive collection of educational resources.",
      qualifications: "M.Lib.Sc, B.Ed"
    },
   
  ];

  const totalSlides = Math.ceil(staffMembers.length / 3);

  // Auto-advance carousel every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentIndex(currentIndex === totalSlides - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? totalSlides - 1 : currentIndex - 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="py-16 sm:py-20 md:py-24 bg-primary relative overflow-hidden testimonials-section">
      {/* Background Blur Effects */}
      <div className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="luxury-heading text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-primary-foreground mb-4 sm:mb-6">
            <span className="text-secondary">{t('staff.title')}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto px-2">
            {t('staff.description')}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto mb-12 sm:mb-16">
          {/* Navigation Buttons - Hidden on mobile */}
          <Button
            variant="ghost"
            size="sm" 
            onClick={prevSlide}
            className="hidden sm:flex absolute -left-4 lg:-left-6 top-1/2 transform -translate-y-1/2 z-30 bg-secondary/20 backdrop-blur-sm hover:bg-secondary/30 text-primary-foreground rounded-full p-3 lg:p-4 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            className="hidden sm:flex absolute -right-4 lg:-right-6 top-1/2 transform -translate-y-1/2 z-30 bg-secondary/20 backdrop-blur-sm hover:bg-secondary/30 text-primary-foreground rounded-full p-3 lg:p-4 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
          </Button>

          {/* Staff Cards Carousel */}
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-700 ease-luxury"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 px-2 sm:px-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
                    {staffMembers.slice(slideIndex * 3, slideIndex * 3 + 3).map((staff, cardIndex) => (
                      <div 
                        key={slideIndex * 3 + cardIndex} 
                        className="animate-scale-in group"
                        style={{ animationDelay: `${cardIndex * 0.1}s` }}
                      >
                        <Card className="bg-primary-foreground/95 backdrop-blur-sm border-secondary/20 hover:border-secondary/40 hover:bg-primary-foreground hover:shadow-luxury transition-all duration-500 overflow-hidden h-full p-4 sm:p-6 hover:scale-105">
                          {/* Staff Avatar */}
                          <div className="flex flex-col items-center mb-4 sm:mb-6">
                            <div className="relative mb-3 sm:mb-4">
                              <Avatar className="w-16 h-16 sm:w-20 sm:h-20 ring-4 ring-secondary/30 group-hover:ring-secondary/60 transition-all duration-300">
                                <AvatarImage 
                                  src={staff.image} 
                                  alt={staff.name}
                                  className="object-cover object-center"
                                />
                                <AvatarFallback className="bg-secondary/20 text-secondary text-sm sm:text-lg font-semibold">
                                  {staff.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              {/* Role Badge */}
                              <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2">
                                <div className="bg-secondary text-primary px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-lg whitespace-nowrap">
                                  {staff.role.split(' ')[0]}
                                </div>
                              </div>
                            </div>
                            
                            {/* Staff Name */}
                            <h3 className="luxury-heading text-base sm:text-lg text-primary mb-1 text-center group-hover:text-secondary transition-colors duration-300">
                              {staff.name}
                            </h3>
                            
                            {/* Staff Role */}
                            <p className="text-secondary font-semibold text-xs sm:text-sm mb-2 text-center">
                              {staff.role}
                            </p>
                            
                            {/* Qualifications */}
                            <p className="text-primary/70 text-xs font-medium mb-3 text-center">
                              {staff.qualifications}
                            </p>
                          </div>

                          {/* Experience */}
                          <div className="text-center mb-3 sm:mb-4">
                            <p className="text-primary text-xs sm:text-sm font-semibold">
                              Experience: {staff.description.includes('20+') ? '20+ years' : 
                                         staff.description.includes('15+') ? '15+ years' : 
                                         staff.description.includes('10+') ? '10+ years' : '5+ years'}
                            </p>
                            <p className="text-primary/60 text-xs mt-1">
                              {staff.role.includes('Teacher') ? 'Teaching & Development' : 
                               staff.role.includes('Principal') ? 'Educational Leadership' :
                               staff.role.includes('Counselor') ? 'Student Counseling & Development' :
                               staff.role.includes('Librarian') ? 'Information & Resources' : 'Specialized Education'}
                            </p>
                          </div>

                          {/* Description */}
                          <p className="text-primary/80 text-xs leading-relaxed text-center line-clamp-3">
                            {staff.description}
                          </p>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 sm:space-x-4 mt-8 sm:mt-10">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-6 sm:w-8 h-2 sm:h-3 bg-secondary shadow-gold-glow'
                    : 'w-2 sm:w-3 h-2 sm:h-3 bg-primary-foreground/40 hover:bg-primary-foreground/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-2">20+</div>
            <div className="text-primary-foreground/80 text-sm sm:text-base">Years Experience</div>
          </div>
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-2">10</div>
            <div className="text-primary-foreground/80 text-sm sm:text-base">Expert Educators</div>
          </div>
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-2">100%</div>
            <div className="text-primary-foreground/80 text-sm sm:text-base">Dedicated to Excellence</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;