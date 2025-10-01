import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchResult {
  title: string;
  description: string;
  relevanceScore: number;
  sectionId: string;
  action: () => void;
}

const SearchBar = () => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Sample data for the school with navigation actions
  const schoolData = [
    {
      title: "Academic Programs",
      description: "Excellence in primary education with comprehensive curriculum covering mathematics, science, english, arts and more",
      sectionId: "programs",
      action: () => scrollToSection("programs")
    },
    {
      title: "Campus Tour", 
      description: "Visit our beautiful campus with modern facilities, playground, library, computer lab and safe environment",
      sectionId: "gallery",
      action: () => scrollToSection("gallery")
    },
    {
      title: "Enrollment & Admission",
      description: "Simple enrollment process for new students with requirements, application forms and admission criteria",
      sectionId: "contact",
      action: () => scrollToSection("contact")
    },
    {
      title: "Our Promise",
      description: "Our commitment to nurturing young minds with innovative teaching methods and personalized attention",
      sectionId: "promise", 
      action: () => scrollToSection("promise")
    },
    {
      title: "Student Life & Activities",
      description: "Sports, music, art, drama, extracurricular activities and programs for well-rounded development",
      sectionId: "programs",
      action: () => scrollToSection("programs")
    },
    {
      title: "Parent Testimonials",
      description: "Hear from our school community about their experiences and success stories",
      sectionId: "testimonials",
      action: () => scrollToSection("testimonials")
    }
  ];

  // Navigation helper function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback: scroll to sections by class or data attributes
      const sectionMap: { [key: string]: string } = {
        'promise': '.promise-section',
        'programs': '.programs-section', 
        'gallery': '.gallery-section',
        'testimonials': '.testimonials-section',
        'contact': '.contact-section'
      };
      
      const selector = sectionMap[sectionId];
      if (selector) {
        const fallbackElement = document.querySelector(selector);
        if (fallbackElement) {
          fallbackElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
    setIsOpen(false);
  };


  const performNLPSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('🔍 Performing NLP search for:', searchQuery);
      
      const queryLower = searchQuery.toLowerCase();
      const queryWords = queryLower.split(' ').filter(word => word.length > 2);
      
      const nlpResults = schoolData
        .map(item => {
          const text = `${item.title} ${item.description}`.toLowerCase();
          let score = 0;
          
          // Exact phrase matching
          if (text.includes(queryLower)) score += 1.0;
          
          // Individual word matching with weights
          queryWords.forEach(word => {
            if (text.includes(word)) {
              // Give more weight to title matches
              if (item.title.toLowerCase().includes(word)) score += 0.6;
              else score += 0.3;
            }
          });
          
          // Boost score for shorter, more relevant matches
          const wordCount = text.split(' ').length;
          const relevanceBoost = Math.max(0, (100 - wordCount) / 100 * 0.2);
          score += relevanceBoost;
          
          return {
            title: item.title,
            description: item.description,
            relevanceScore: Math.min(score, 1),
            sectionId: item.sectionId,
            action: item.action
          };
        })
        .filter(result => result.relevanceScore > 0.2)
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, 5);
        
      setResults(nlpResults);
    } catch (error) {
      console.error('❌ Search error:', error);
      setResults([]);
    }
    
    setIsLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      performNLPSearch(query);
      setIsOpen(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      setIsOpen(true);
      // Debounced search
      const timeoutId = setTimeout(() => {
        performNLPSearch(value);
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setIsOpen(false);
      setResults([]);
    }
  };

  return (
    <div className="relative w-full max-w-sm sm:max-w-md">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative group">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Search className="text-primary-foreground/70 h-4 w-4" />
          </div>
          <Input
            type="text"
            placeholder={t('search.placeholder')}
            value={query}
            onChange={handleInputChange}
            onFocus={() => query && setIsOpen(true)}
            className="pl-10 pr-16 sm:pr-20 py-2 sm:py-3 text-sm sm:text-base bg-transparent backdrop-blur-sm border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/70 focus:border-secondary focus:ring-2 focus:ring-secondary/30 rounded-lg shadow-luxury transition-all duration-300 hover:shadow-gold-glow [&:not(:placeholder-shown)]:text-secondary"
          />
        </div>
        {query && (
          <Button
            type="submit"
            size="sm"
            disabled={isLoading}
            className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-gradient-gold hover:shadow-gold-glow text-primary font-medium h-6 sm:h-7 px-2 sm:px-4 text-xs sm:text-sm rounded-md transition-all duration-300"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        )}
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (results.length > 0 || isLoading) && (
        <Card className="absolute top-full left-0 right-0 mt-3 z-[60] bg-card border border-primary-foreground/30 shadow-luxury backdrop-blur-md">
          <div className="p-6 space-y-4">
            {isLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Search className="h-4 w-4 animate-spin" />
                <span className="text-sm">Searching...</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase font-medium tracking-wide">
                  <Search className="h-3 w-3 text-secondary" />
                  Search Results
                </div>
                {results.map((result, index) => (
                  <div 
                    key={index}
                    className="group p-4 rounded-lg bg-gradient-to-r from-muted/30 to-muted/50 hover:from-secondary/10 hover:to-secondary/20 cursor-pointer transition-all duration-300 hover:shadow-premium border border-border/50 hover:border-secondary/30"
                    onClick={() => {
                      result.action();
                      setQuery('');
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-sm text-card-foreground mb-2 group-hover:text-secondary transition-colors">
                          {result.title}
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {result.description}
                        </div>
                      </div>
                      <div className="ml-3 text-xs text-secondary/80 font-medium bg-secondary/10 px-2 py-1 rounded">
                        {Math.round(result.relevanceScore * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
                {results.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground text-sm">
                    No results found. Try a different search term.
                  </div>
                )}
              </>
            )}
          </div>
        </Card>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[50]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;