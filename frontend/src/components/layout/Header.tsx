'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Code, Users, MessageCircle, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header({ onSignInClick, onSignUpClick, onSignOut, isLoggedIn, isShowingAuthForms, onHeaderClick }: { onSignInClick: () => void; onSignUpClick: () => void; onSignOut: () => void; isLoggedIn: boolean; isShowingAuthForms: boolean; onHeaderClick: () => void; }) {
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
            <Link 
              href="/"
              className="flex items-center space-x-2 group"
              onClick={isLoggedIn ? undefined : onHeaderClick} // Only call onHeaderClick if not logged in
            >
              <div className="relative">
                <Code className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              </div>
              <span className="text-xl font-bold gradient-text">
                DevConnect
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/community" 
              className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105 relative group"
            >
              Community
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">          
            <div className="hidden md:flex items-center space-x-3">
              {!isLoggedIn && !isShowingAuthForms ? (
                <>
                  <Button variant="outline" size="sm" className="btn-outline" onClick={onSignInClick}>
                    Sign In
                  </Button>
                  <Button size="sm" className="btn-primary" onClick={onSignUpClick}>
                    Get Started
                  </Button>
                </>
              ) : isLoggedIn ? (
                <Button size="sm" className="btn-primary" onClick={onSignOut}>
                  Sign Out
                </Button>
              ) : null}
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
                href="/community" 
                className="text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Community
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                {!isLoggedIn && !isShowingAuthForms ? (
                  <>
                    <Button variant="outline" size="sm" className="btn-outline" onClick={() => { onSignInClick(); setIsMobileMenuOpen(false); }}>
                      Sign In
                    </Button>
                    <Button size="sm" className="btn-primary" onClick={() => { onSignUpClick(); setIsMobileMenuOpen(false); }}>
                      Get Started
                    </Button>
                  </>
                ) : isLoggedIn ? (
                  <Button size="sm" className="btn-primary" onClick={() => { onSignOut(); setIsMobileMenuOpen(false); }}>
                    Sign Out
                  </Button>
                ) : null}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}