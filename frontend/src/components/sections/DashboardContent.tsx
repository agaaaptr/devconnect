import React from 'react';
import { Code, Rocket, Wrench, Users } from 'lucide-react';

const DashboardContent: React.FC = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-card-foreground/5 min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
      {/* Background elements for visual interest */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center bg-card/80 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl border border-border animate-fade-in-up">
        <Rocket className="w-20 h-20 mx-auto text-primary mb-6 animate-bounce-slow" />
        <h1 className="text-5xl font-extrabold text-foreground mb-4 leading-tight gradient-text animate-text-reveal">
          Welcome to DevConnect!
        </h1>
        <p className="text-xl text-muted-foreground mb-8 animate-fade-in animation-delay-500">
          You're successfully logged in. This is your personalized dashboard.
        </p>

        <div className="bg-muted/50 border border-border p-6 rounded-lg mb-8 animate-fade-in animation-delay-1000">
          <Wrench className="w-12 h-12 mx-auto text-accent mb-4 animate-spin-slow" />
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Under Development
          </h2>
          <p className="text-lg text-muted-foreground">
            We're actively building exciting new features to enhance your experience.
            Stay tuned for updates on project collaboration, community forums, and more!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left animate-fade-in animation-delay-1500">
          <div className="bg-background/70 p-5 rounded-lg border border-border shadow-md hover:shadow-lg transition-shadow duration-300">
            <Code className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground text-lg mb-2">Your Projects</h3>
            <p className="text-sm text-muted-foreground">Manage your coding projects and find collaborators.</p>
          </div>
          <div className="bg-background/70 p-5 rounded-lg border border-border shadow-md hover:shadow-lg transition-shadow duration-300">
            <Users className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground text-lg mb-2">Community Hub</h3>
            <p className="text-sm text-muted-foreground">Connect with other developers, share knowledge.</p>
          </div>
          <div className="bg-background/70 p-5 rounded-lg border border-border shadow-md hover:shadow-lg transition-shadow duration-300">
            <Wrench className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground text-lg mb-2">Settings</h3>
            <p className="text-sm text-muted-foreground">Customize your profile and preferences.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardContent;
