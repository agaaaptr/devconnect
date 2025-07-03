import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Developers
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The social platform built for developers. Share your projects, collaborate on code, 
            and grow your network with like-minded developers from around the world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="inline-flex items-center">
              Join DevConnect
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg">
              Explore Projects
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <Github className="h-5 w-5" />
              <span>GitHub Integration</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Twitter className="h-5 w-5" />
              <span>Social Features</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Linkedin className="h-5 w-5" />
              <span>Professional Network</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}