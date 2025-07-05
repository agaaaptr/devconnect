'use client';

import { Code, Users, MessageCircle, Star, GitBranch, Trophy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const features = [
  {
    icon: Code,
    title: 'Share Your Code',
    description: 'Showcase your projects, get feedback, and collaborate with other developers on exciting projects.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Users,
    title: 'Developer Network',
    description: 'Connect with developers worldwide, build your professional network, and find mentorship opportunities.',
    color: 'from-purple-500 to-violet-500'
  },
  {
    icon: MessageCircle,
    title: 'Real-time Chat',
    description: 'Communicate instantly with your connections, join discussion groups, and participate in code reviews.',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    icon: Star,
    title: 'Project Showcase',
    description: 'Display your best work, get recognition from the community, and attract potential collaborators.',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: GitBranch,
    title: 'Version Control',
    description: 'Integrated Git workflow, branch management, and seamless GitHub synchronization.',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Trophy,
    title: 'Achievement System',
    description: 'Earn badges, level up your profile, and showcase your skills and contributions to the community.',
    color: 'from-blue-500 to-indigo-500'
  }
];

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-background relative overflow-hidden">
      {/* Optimized Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/5 to-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-800 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need as a 
            <span className="gradient-text block mt-2">Developer</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From showcasing your projects to connecting with peers, DevConnect provides 
            all the tools you need to grow your developer career.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
                scroll-reveal p-6 rounded-xl border border-border card-hover
                bg-card/50 backdrop-blur-sm
                ${isVisible ? 'revealed' : ''}
              `}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className={`
                  p-3 rounded-lg bg-gradient-to-r ${feature.color} 
                  shadow-lg transition-shadow
                `}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground ml-4">
                  {feature.title}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
              
              <div className={`
                mt-4 h-1 w-0 bg-gradient-to-r ${feature.color} 
                rounded-full transition-all duration-500 group-hover:w-full
              `}></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-800 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ transitionDelay: '600ms' }}>
          <div className="glass-effect rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Join the Community?
            </h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Start connecting with developers and showcase your projects today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105">
                Get Started for Free
              </button>
              <button className="btn-outline px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}