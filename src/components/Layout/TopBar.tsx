import React from 'react';
import { useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { RootState } from '../../store';

const TopBar: React.FC = () => {
  const { currentSong } = useSelector((state: RootState) => state.player);

  return (
    <div className="h-16 bg-black bg-opacity-70 backdrop-blur-md flex items-center justify-between px-6 border-b border-gray-700/30">
      {/* Navigation */}
      <div className="flex items-center space-x-4">
        <button className="w-8 h-8 bg-black bg-opacity-80 rounded-full flex items-center justify-center text-white hover:bg-opacity-90 transition-colors shadow-lg">
          <ChevronLeft size={20} />
        </button>
        <button className="w-8 h-8 bg-black bg-opacity-80 rounded-full flex items-center justify-center text-white hover:bg-opacity-90 transition-colors shadow-lg">
          <ChevronRight size={20} />
        </button>
        
        {/* Currently Playing Indicator */}
        {currentSong && (
          <div className="flex items-center space-x-3 ml-6">
            <img 
              src={currentSong.thumbnailUrl} 
              alt={currentSong.title}
              className="w-8 h-8 rounded object-cover shadow-md"
            />
            <div className="hidden md:block">
              <p className="text-white text-sm font-medium">{currentSong.title}</p>
              <p className="text-gray-300 text-xs">{currentSong.artist}</p>
            </div>
          </div>
        )}
      </div>

      {/* User Menu */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-black bg-opacity-80 rounded-full px-4 py-2 shadow-lg">
          <User size={20} className="text-white" />
          <span className="text-white font-medium">Parveen</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;