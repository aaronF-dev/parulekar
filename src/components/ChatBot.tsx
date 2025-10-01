import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface NavigationOption {
  text: string;
  action: () => void;
  keywords: string[];
}

const ChatBot = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Navigation options with keywords for NLP matching
  const navigationOptions: NavigationOption[] = [
    {
      text: "Let me take you to our academic programs section",
      action: () => scrollToSection("programs"),
      keywords: ["program", "academic", "curriculum", "subject", "math", "science", "english", "education", "study", "course"]
    },
    {
      text: "I'll show you our beautiful campus gallery",
      action: () => scrollToSection("gallery"),
      keywords: ["campus", "tour", "facility", "building", "playground", "library", "computer", "lab", "photos", "gallery", "visit"]
    },
    {
      text: "Here's how you can enroll your child",
      action: () => scrollToSection("contact"),
      keywords: ["enroll", "admission", "apply", "contact", "register", "join", "form", "requirement", "fee", "tuition"]
    },
    {
      text: "Let me tell you about our educational promise",
      action: () => scrollToSection("promise"),
      keywords: ["promise", "commitment", "mission", "vision", "value", "philosophy", "approach", "method", "quality"]
    },
    {
      text: "Check out what our parents are saying",
      action: () => scrollToSection("testimonials"),
      keywords: ["testimonial", "review", "parent", "feedback", "experience", "story", "success", "satisfied", "happy"]
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback selectors
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
  };

  const generateBotResponse = (userMessage: string): { text: string; action?: () => void } => {
    const messageLower = userMessage.toLowerCase();
    
    // Greeting responses
    if (messageLower.match(/\b(hi|hello|hey|good|morning|afternoon|evening)\b/)) {
      return {
        text: "Hello! Welcome to Parulekar Primary School. I'm here to help you learn about our school. What would you like to know about our programs, campus, or enrollment process?"
      };
    }

    // Thank you responses
    if (messageLower.match(/\b(thank|thanks|appreciate)\b/)) {
      return {
        text: "You're very welcome! Is there anything else about our school that I can help you with today?"
      };
    }

    // General school info
    if (messageLower.match(/\b(about|school|information|tell me)\b/)) {
      return {
        text: "Parulekar Primary School is committed to excellence in education. We offer comprehensive academic programs, modern facilities, and a nurturing environment for young minds. Would you like to know more about our programs, see our campus, or learn about enrollment?"
      };
    }

    // Find the best matching navigation option using NLP
    let bestMatch: NavigationOption | null = null;
    let highestScore = 0;

    navigationOptions.forEach(option => {
      let score = 0;
      option.keywords.forEach(keyword => {
        if (messageLower.includes(keyword)) {
          score += 1;
          // Give extra weight to exact matches
          if (messageLower.split(' ').includes(keyword)) {
            score += 0.5;
          }
        }
      });

      if (score > highestScore) {
        highestScore = score;
        bestMatch = option;
      }
    });

    if (bestMatch && highestScore > 0.5) {
      return {
        text: bestMatch.text,
        action: bestMatch.action
      };
    }

    // Default helpful response
    return {
      text: "I'd be happy to help you learn more about our school! You can ask me about our academic programs, campus facilities, enrollment process, or our educational philosophy. What interests you most?"
    };
  };

  const addMessage = (text: string, isBot: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    
    // Add user message
    addMessage(userMessage, false);

    // Show typing indicator
    setIsTyping(true);

    // Simulate thinking time
    setTimeout(() => {
      const response = generateBotResponse(userMessage);
      setIsTyping(false);
      addMessage(response.text, true);
      
      // Execute navigation action after a short delay
      if (response.action) {
        setTimeout(() => {
          response.action!();
        }, 1000);
      }
    }, 1000 + Math.random() * 1000); // Random delay for natural feel
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addMessage(t('chatbot.welcome'), true);
      }, 500);
    }
  }, [isOpen, messages.length]);

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-premium hover:shadow-luxury transition-all duration-300 hover:scale-105"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-card border border-border shadow-luxury flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-premium rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                <Bot className="h-4 w-4 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-primary-foreground">{t('chatbot.title')}</h3>
                <p className="text-xs text-primary-foreground/70">Always here to help</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.isBot ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {message.isBot && (
                    <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="h-3 w-3 text-secondary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[280px] p-3 rounded-lg text-sm ${
                      message.isBot
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-gradient-gold text-primary'
                    }`}
                  >
                    {message.text}
                  </div>
                  {!message.isBot && (
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-3 w-3 text-secondary-foreground" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('chatbot.placeholder')}
                className="flex-1 bg-background border-border focus:border-secondary focus:ring-2 focus:ring-secondary/30"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="sm"
                className="bg-gradient-gold hover:shadow-gold-glow text-primary px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBot;