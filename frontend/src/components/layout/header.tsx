import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Code } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">DevConnect</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/developers" className="text-gray-700 hover:text-blue-600 transition-colors">
              Developers
            </Link>
            <Link href="/projects" className="text-gray-700 hover:text-blue-600 transition-colors">
              Projects
            </Link>
            <Link href="/community" className="text-gray-700 hover:text-blue-600 transition-colors">
              Community
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}