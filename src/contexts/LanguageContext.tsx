import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Hero Section
    'hero.title': 'Parulekar Primary School',
    'hero.subtitle': 'Where Curiosity Meets Excellence Leaders of Tomorrow Begin Here',
    'hero.enrollToday': 'Enroll Today',
    'hero.campusTour': 'Take a Campus Tour',
    
    // Promise Section
    'promise.title': 'Not Just a School',
    'promise.subtitle': 'A Foundation for Life',
    'promise.excellence.title': 'Academic Excellence',
    'promise.excellence.desc': 'Rigorous curriculum designed to challenge and inspire young minds',
    'promise.character.title': 'Character Development',
    'promise.character.desc': 'Building strong moral foundations and leadership qualities',
    'promise.innovation.title': 'Innovation & Creativity',
    'promise.innovation.desc': 'Fostering creative thinking and problem-solving skills',
    
    // Programs Section
    'programs.title': 'Programs Designed for',
    'programs.subtitle': 'Every Stage of Growth',
    'programs.description': 'From first steps to confident strides, our programs nurture development at every stage',
    'programs.foundation.title': 'Foundation Program',
    'programs.foundation.desc': 'Building essential skills through play-based learning and creative exploration for ages 3-5.',
    'programs.primary.title': 'Primary Education',
    'programs.primary.desc': 'Comprehensive curriculum focusing on literacy, numeracy, and critical thinking for grades 1-5.',
    'programs.enrichment.title': 'Enrichment Activities',
    'programs.enrichment.desc': 'Arts, sports, music, and STEM programs to develop well-rounded individuals.',
    
    // Gallery Section
    'gallery.title': 'Glimpse into Our World',
    'gallery.subtitle': 'Moments of Learning & Joy',
    'gallery.description': 'Experience the vibrant life at our school through these captured moments',
    
    // Staff Section
    'staff.title': 'Our Staff',
    'staff.description': 'Meet our dedicated educators who nurture young minds with passion and expertise',
    
    // Contact Section
    'contact.title': 'Ready to Begin the',
    'contact.subtitle': 'Journey?',
    'contact.description': 'Connect with us to learn more about enrollment and our programs',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.phone': 'Phone Number',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.info.address': 'Address',
    'contact.info.addressValue': '123 Education Street, Learning District, Mumbai 400001',
    'contact.info.phone': 'Phone',
    'contact.info.phoneValue': '+91 98765 43210',
    'contact.info.email': 'Email',
    'contact.info.emailValue': 'info@parulekarschool.edu.in',
    'contact.info.hours': 'School Hours',
    'contact.info.hoursValue': 'Monday - Friday: 8:00 AM - 3:30 PM',
    
    // Footer
    'footer.tagline': 'Nurturing Excellence, Building Futures',
    'footer.quickLinks': 'Quick Links',
    'footer.programs': 'Programs',
    'footer.admissions': 'Admissions',
    'footer.about': 'About Us',
    'footer.contact': 'Contact',
    'footer.contactInfo': 'Contact Info',
    'footer.followUs': 'Follow Us',
    'footer.copyright': '© 2024 Parulekar Primary School. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    
    // ChatBot
    'chatbot.title': 'School Assistant',
    'chatbot.placeholder': 'Ask me about admissions, programs, or school life...',
    'chatbot.send': 'Send',
    'chatbot.welcome': 'Welcome to Parulekar Primary School! How can I help you today?',
    
    // Search
    'search.placeholder': 'Search programs, admissions, staff...',
    
    // Language Toggle
    'language.english': 'English',
    'language.marathi': 'मराठी',
  },
  mr: {
    // Hero Section
    'hero.title': 'परुलेकर प्राथमिक शाळा',
    'hero.subtitle': 'जिथे कुतूहल आणि उत्कृष्टता भेटते — उद्याचे नेते इथेच सुरुवात करतात',
    'hero.enrollToday': 'आजच प्रवेश घ्या',
    'hero.campusTour': 'शाळा पहा',
    
    // Promise Section
    'promise.title': 'फक्त एक शाळा नाही —',
    'promise.subtitle': 'जीवनाचा पाया',
    'promise.excellence.title': 'शैक्षणिक उत्कृष्टता',
    'promise.excellence.desc': 'तरुण मनांना आव्हान देणारा आणि प्रेरणा देणारा कठोर अभ्यासक्रम',
    'promise.character.title': 'चारित्र्य विकास',
    'promise.character.desc': 'मजबूत नैतिक पाया आणि नेतृत्व गुण निर्माण करणे',
    'promise.innovation.title': 'नावीन्य आणि सृजनशीलता',
    'promise.innovation.desc': 'सर्जनशील विचार आणि समस्या सोडवण्याच्या कौशल्यांचे पालनपोषण',
    
    // Programs Section
    'programs.title': 'प्रत्येक वाढीच्या',
    'programs.subtitle': 'टप्प्यासाठी डिझाइन केलेले कार्यक्रम',
    'programs.description': 'पहिल्या पावलांपासून आत्मविश्वासाने चालण्यापर्यंत, आमचे कार्यक्रम प्रत्येक टप्प्यात विकासाचे पोषण करतात',
    'programs.foundation.title': 'पायाभूत कार्यक्रम',
    'programs.foundation.desc': '३-५ वयोगटासाठी खेळावर आधारित शिक्षण आणि सर्जनशील अन्वेषणाद्वारे आवश्यक कौशल्ये निर्माण करणे.',
    'programs.primary.title': 'प्राथमिक शिक्षण',
    'programs.primary.desc': 'इयत्ता १-५ साठी साक्षरता, संख्या आणि गंभीर विचारावर केंद्रित सर्वसमावेशक अभ्यासक्रम.',
    'programs.enrichment.title': 'समृद्धीकरण क्रियाकलाप',
    'programs.enrichment.desc': 'सर्वांगीण व्यक्तित्व विकसित करण्यासाठी कला, खेळ, संगीत आणि STEM कार्यक्रम.',
    
    // Gallery Section
    'gallery.title': 'आमच्या जगाची झलक',
    'gallery.subtitle': 'शिकण्याचे आणि आनंदाचे क्षण',
    'gallery.description': 'या कॅप्चर केलेल्या क्षणांद्वारे आमच्या शाळेतील दोलायमान जीवनाचा अनुभव घ्या',
    
    // Staff Section
    'staff.title': 'आमचे कर्मचारी',
    'staff.description': 'आमच्या समर्पित शिक्षकांना भेटा जे उत्कटता आणि कौशल्याने तरुण मनांचे पालनपोषण करतात',
    
    // Contact Section
    'contact.title': 'प्रवास सुरू करायला',
    'contact.subtitle': 'तयार आहात का?',
    'contact.description': 'प्रवेश आणि आमच्या कार्यक्रमांबद्दल अधिक जाणून घेण्यासाठी आमच्याशी संपर्क साधा',
    'contact.form.name': 'पूर्ण नाव',
    'contact.form.email': 'ईमेल पत्ता',
    'contact.form.phone': 'फोन नंबर',
    'contact.form.message': 'संदेश',
    'contact.form.send': 'संदेश पाठवा',
    'contact.info.address': 'पत्ता',
    'contact.info.addressValue': '१२३ एज्युकेशन स्ट्रीट, लर्निंग डिस्ट्रिक्ट, मुंबई ४००००१',
    'contact.info.phone': 'फोन',
    'contact.info.phoneValue': '+91 98765 43210',
    'contact.info.email': 'ईमेल',
    'contact.info.emailValue': 'info@parulekarschool.edu.in',
    'contact.info.hours': 'शाळेचे तास',
    'contact.info.hoursValue': 'सोमवार - शुक्रवार: सकाळी 8:00 - दुपारी 3:30',
    
    // Footer
    'footer.tagline': 'उत्कृष्टतेचे पालनपोषण, भविष्याची निर्मिती',
    'footer.quickLinks': 'द्रुत दुवे',
    'footer.programs': 'कार्यक्रम',
    'footer.admissions': 'प्रवेश',
    'footer.about': 'आमच्याबद्दल',
    'footer.contact': 'संपर्क',
    'footer.contactInfo': 'संपर्क माहिती',
    'footer.followUs': 'आम्हाला फॉलो करा',
    'footer.copyright': '© २०२४ परुलेकर प्राथमिक शाळा. सर्व हक्क राखीव.',
    'footer.privacy': 'गोपनीयता धोरण',
    'footer.terms': 'सेवा अटी',
    
    // ChatBot
    'chatbot.title': 'शाळा सहायक',
    'chatbot.placeholder': 'प्रवेश, कार्यक्रम किंवा शाळेतील जीवनाबद्दल विचारा...',
    'chatbot.send': 'पाठवा',
    'chatbot.welcome': 'परुलेकर प्राथमिक शाळेत आपले स्वागत आहे! आज मी आपली कशी मदत करू शकतो?',
    
    // Search
    'search.placeholder': 'कार्यक्रम, प्रवेश, कर्मचारी शोधा...',
    
    // Language Toggle
    'language.english': 'English',
    'language.marathi': 'मराठी',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};