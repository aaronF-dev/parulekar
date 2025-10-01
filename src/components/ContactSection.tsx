import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();
  
  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.info.address'),
      details: t('contact.info.addressValue')
    },
    {
      icon: Phone,
      title: t('contact.info.phone'),
      details: t('contact.info.phoneValue')
    },
    {
      icon: Mail,
      title: t('contact.info.email'),
      details: t('contact.info.emailValue')
    },
    {
      icon: Clock,
      title: t('contact.info.hours'),
      details: t('contact.info.hoursValue')
    }
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 bg-background contact-section">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="luxury-heading text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-primary mb-4 sm:mb-6">
            {t('contact.title')}
            <span className="block text-secondary">{t('contact.subtitle')}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="p-6 sm:p-8 shadow-luxury border-0 animate-slide-up">
            <h3 className="luxury-heading text-xl sm:text-2xl text-primary mb-4 sm:mb-6">Get in Touch</h3>
            <form className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">{t('contact.form.name')}</label>
                  <Input className="focus:ring-secondary focus:border-secondary" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary mb-2">{t('contact.form.email')}</label>
                <Input type="email" className="focus:ring-secondary focus:border-secondary" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary mb-2">{t('contact.form.phone')}</label>
                <Input type="tel" className="focus:ring-secondary focus:border-secondary" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary mb-2">{t('contact.form.message')}</label>
                <Textarea 
                  rows={4} 
                  className="focus:ring-secondary focus:border-secondary resize-none"
                  placeholder="Tell us about your child's interests and how we can help..."
                />
              </div>
              
              <Button variant="gold" size="lg" className="w-full">
                {t('contact.form.send')}
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="luxury-heading text-xl sm:text-2xl text-primary mb-6 sm:mb-8">Contact Information</h3>
            
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1 text-sm sm:text-base">{info.title}</h4>
                    <p className="text-muted-foreground whitespace-pre-line text-sm sm:text-base">{info.details}</p>
                  </div>
                </div>
              );
            })}

            {/* Map Placeholder */}
            <Card className="p-4 sm:p-6 bg-muted border-0 mt-6 sm:mt-8">
              <div className="aspect-video bg-primary/10 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 sm:w-12 sm:h-12 text-secondary mx-auto mb-2" />
                  <p className="text-primary font-medium text-sm sm:text-base">Interactive Map</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Malvan, Maharashtra</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;