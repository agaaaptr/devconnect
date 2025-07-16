'use client';

import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import DashboardContent from '@/components/sections/DashboardContent';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';
import Toast from '@/components/ui/Toast'; // Import Toast component
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Rocket, Code } from 'lucide-react'; // Import Rocket and Code icons

  export default function Home() {
  const [showAuthForms, setShowAuthForms] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null); // Toast state

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      setIsLoading(false); // Set loading to false after check
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      if (session) {
        localStorage.setItem('supabase.auth.token', JSON.stringify(session));
      } else {
        localStorage.removeItem('supabase.auth.token');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleAuthSuccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsLoggedIn(!!session);
    setShowAuthForms(false);
    setToast({ message: 'Authentication successful!', type: 'success' });
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }

      localStorage.removeItem('supabase.auth.token');
      setIsLoggedIn(false);
      setShowAuthForms(false);
      setToast({ message: 'Successfully signed out.', type: 'success' }); // Show success toast
    } catch (error: any) {
      console.error('Error signing out:', error);
      setToast({ message: error.message, type: 'error' }); // Show error toast
    }
  };

  const handleSignInClick = () => {
    setShowAuthForms(true);
    setShowSignIn(true);
  };

  const handleSignUpClick = () => {
    setShowAuthForms(true);
    setShowSignIn(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Render Header only when not loading */}
      {!isLoading && (
        <Header 
          onSignInClick={handleSignInClick}
          onSignUpClick={handleSignUpClick}
          onSignOut={handleSignOut}
          isLoggedIn={isLoggedIn}
          isShowingAuthForms={showAuthForms}
          onHeaderClick={() => setShowAuthForms(false)}
        />
      )}
      <main>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-background text-foreground">
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* Circular loading indicator */}
              <div className="absolute w-full h-full rounded-full border-4 border-primary border-t-transparent animate-spin-slow"></div>
              <Rocket className="w-16 h-16 text-primary animate-bounce-slow z-10" /> {/* Rocket icon on top */}
            </div>
          </div>
        ) : isLoggedIn ? (
          <DashboardContent />
        ) : showAuthForms ? (
          <section className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-card p-8 rounded-lg shadow-lg form-container-glow">
              <h2 className="text-2xl font-bold text-center mb-6">
                {showSignIn ? 'Sign In' : 'Sign Up'}
              </h2>
              {showSignIn ? (
                <SignInForm onSignInSuccess={handleAuthSuccess} onSwitchForm={setShowSignIn} />
              ) : (
                <SignUpForm onSignUpSuccess={handleAuthSuccess} onSwitchForm={setShowSignIn} />
              )}
              
            </div>
          </section>
        ) : (
          <>
            <Hero onSignUpClick={handleSignUpClick} />
            <Features />
          </>
        )}
      </main>
      <footer className="bg-card border-t border-border py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-foreground">DevConnect</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Connecting developers worldwide through code, collaboration, and community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Platform</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Projects</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Company</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Support</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border pt-8">
              <p className="text-muted-foreground">
                © 2025 DevConnect. Built with Next.js, TypeScript, and Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}