import { Code, Users, MessageCircle, Star, GitBranch, Trophy } from 'lucide-react';

const features = [
  {
    icon: Code,
    title: 'Share Your Code',
    description: 'Showcase your projects, get feedback, and collaborate with other developers on exciting projects.'
  },
  {
    icon: Users,
    title: 'Developer Network',
    description: 'Connect with developers worldwide, build your professional network, and find mentorship opportunities.'
  },
  {
    icon: MessageCircle,
    title: 'Real-time Chat',
    description: 'Communicate instantly with your connections, join discussion groups, and participate in code reviews.'
  },
  {
    icon: Star,
    title: 'Project Showcase',
    description: 'Display your best work, get recognition from the community, and attract potential collaborators.'
  },
  {
    icon: GitBranch,
    title: 'Version Control',
    description: 'Integrated Git workflow, branch management, and seamless GitHub synchronization.'
  },
  {
    icon: Trophy,
    title: 'Achievement System',
    description: 'Earn badges, level up your profile, and showcase your skills and contributions to the community.'
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need as a Developer
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From showcasing your projects to connecting with peers, DevConnect provides 
            all the tools you need to grow your developer career.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-3">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
