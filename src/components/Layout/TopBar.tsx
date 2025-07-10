import React from 'react';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <div className="h-16 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-between px-6">
      {/* Navigation */}
      <div className="flex items-center space-x-4">
        <button className="w-8 h-8 bg-black bg-opacity-70 rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <button className="w-8 h-8 bg-black bg-opacity-70 rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* User Menu */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-black bg-opacity-70 rounded-full px-4 py-2">
          <User size={20} className="text-white" />
          <span className="text-white font-medium">Music Lover</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;