import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-primary text-primary-foreground py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* School Info */}
          <div className="sm:col-span-2">
            <h3 className="luxury-heading text-xl sm:text-2xl text-secondary mb-3 sm:mb-4">
              {t('hero.title')}
            </h3>
            <p className="text-primary-foreground/80 mb-4 leading-relaxed text-sm sm:text-base">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary/20 rounded-full flex items-center justify-center hover:bg-secondary/30 transition-colors">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary/20 rounded-full flex items-center justify-center hover:bg-secondary/30 transition-colors">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary/20 rounded-full flex items-center justify-center hover:bg-secondary/30 transition-colors">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary/20 rounded-full flex items-center justify-center hover:bg-secondary/30 transition-colors">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-secondary mb-3 sm:mb-4 text-sm sm:text-base">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">{t('footer.about')}</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">{t('footer.programs')}</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">{t('footer.admissions')}</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">{t('footer.contact')}</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold text-secondary mb-3 sm:mb-4 text-sm sm:text-base">{t('footer.contactInfo')}</h4>
            <ul className="space-y-2">
              {['Nursery', 'Kindergarten', 'Primary School', 'Co-Curricular', 'Summer Camp', 'After School'].map((program) => (
                <li key={program}>
                  <a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                    {program}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <p className="text-primary-foreground/60 mb-4 sm:mb-0 text-sm">
            {t('footer.copyright')}
          </p>
          <p className="text-primary-foreground/60 text-sm">
            Malvan Education Society
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;