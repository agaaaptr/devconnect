'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Code, Users, MessageCircle, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useState, useEffect } from 'react';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`
      sticky top-0 z-50 transition-all duration-300
      ${isScrolled 
        ? 'bg-card/80 backdrop-blur-xl shadow-lg border-b border-border' 
        : 'bg-transparent'
      }
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Code className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                {/* <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div> */}
              </div>
              <span className="text-xl font-bold gradient-text">
                DevConnect
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/developers" 
              className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105 relative group"
            >
              Developers
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/projects" 
              className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105 relative group"
            >
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/community" 
              className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105 relative group"
            >
              Community
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted transition-all duration-200 hover:scale-110 group"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              ) : (
                <Sun className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              )}
            </button> */}
            
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="outline" size="sm" className="btn-outline">
                Sign In
              </Button>
              <Button size="sm" className="btn-primary">
                Get Started
              </Button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-all duration-200 hover:scale-110"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/developers" 
                className="text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Developers
              </Link>
              <Link 
                href="/projects" 
                className="text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link 
                href="/community" 
                className="text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Community
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" size="sm" className="btn-outline">
                  Sign In
                </Button>
                <Button size="sm" className="btn-primary">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}