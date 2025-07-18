'use client';

import { Button } from '@/components/ui/Button';
import { ArrowRight, Github, Twitter, Linkedin, Sparkles, Zap, Play } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Hero({ onSignUpClick }: { onSignUpClick: () => void; }) {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Simplified Wave Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          style={{
            top: '10%',
            right: '10%',
            animation: 'float 8s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          style={{
            bottom: '20%',
            left: '5%',
            animation: 'float 12s ease-in-out infinite reverse'
          }}
        ></div>
        <div 
          className="absolute w-64 h-64 bg-gradient-to-br from-pink-500/10 to-blue-500/10 rounded-full blur-2xl"
          style={{
            top: '50%',
            left: '80%',
            transform: 'translateY(-50%)',
            animation: 'float 10s ease-in-out infinite'
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 px-4 py-2 glass-effect rounded-full">
              <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
              <span className="text-sm font-medium text-foreground">
                Now in Beta
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Connect with
            <span className="gradient-text block mt-2">
              Developers
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            The social platform built for developers. Share your projects, collaborate on code, 
            and grow your network with like-minded developers from around the world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="btn-primary inline-flex items-center group shadow-lg"
              onClick={onSignUpClick}
            >
              <Zap className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Join DevConnect
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="btn-outline inline-flex items-center group"
            >
              <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Explore Platform
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass-effect rounded-xl p-6 card-hover group">
              <div className="flex items-center justify-center space-x-3">
                <Github className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-foreground">GitHub Integration</span>
              </div>
              <p className="text-muted-foreground mt-2 text-sm">
                Seamlessly sync your repositories
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-6 card-hover group">
              <div className="flex items-center justify-center space-x-3">
                <Twitter className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-foreground">Social Features</span>
              </div>
              <p className="text-muted-foreground mt-2 text-sm">
                Share, like, and comment on projects
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-6 card-hover group">
              <div className="flex items-center justify-center space-x-3">
                <Linkedin className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-foreground">Professional Network</span>
              </div>
              <p className="text-muted-foreground mt-2 text-sm">
                Connect with industry professionals
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
}