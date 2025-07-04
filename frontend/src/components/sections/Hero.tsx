'use client';

import { Button } from '@/components/ui/Button';
import { ArrowRight, Github, Twitter, Linkedin, Sparkles, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-400/20 rounded-full blur-2xl animate-bounce"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-white/20 dark:border-gray-700/50">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Now in Beta
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Connect with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
              {' '}Developers
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            The social platform built for developers. Share your projects, collaborate on code, 
            and grow your network with like-minded developers from around the world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="inline-flex items-center group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Zap className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Join DevConnect
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-400 backdrop-blur-sm"
            >
              Explore Projects
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-gray-700/50">
              <Github className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="font-medium">GitHub Integration</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-gray-700/50">
              <Twitter className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="font-medium">Social Features</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-gray-700/50">
              <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="font-medium">Professional Network</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
