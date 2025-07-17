import Header from '@/components/layout/Header';
import React from 'react';

const CommunityPage: React.FC = () => {
  return (
    <div>
      <main className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-foreground mb-4 leading-tight gradient-text">
            Community Hub
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            This page is under construction. Exciting features for the community are coming soon!
          </p>
        </div>
      </main>
    </div>
  );
};

export default CommunityPage;
