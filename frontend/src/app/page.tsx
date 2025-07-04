import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Features />
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
    </div>
  );
}