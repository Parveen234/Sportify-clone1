import React from 'react';
import { useSelector } from 'react-redux';
import { Heart, MoreHorizontal, Music } from 'lucide-react';

const NowPlayingSidebar = () => {
  const { currentSong, isPlaying } = useSelector((state) => state.player);

  if (!currentSong) return null;

  return (
    <div className="w-80 bg-gradient-to-b from-gray-900 to-black text-white h-full flex flex-col border-l border-gray-700/30">
      {/* Sidebar header */}
      <div className="p-6 border-b border-gray-700/30">
        <div className="flex items-center space-x-2 mb-4">
          <Music size={20} className="text-green-400" />
          <span className="text-sm font-medium text-gray-300">Abhi Chal Raha Hai</span>
        </div>
      </div>

      {/* Album artwork */}
      <div className="p-6">
        <div className="relative group">
          <img 
            src={currentSong.thumbnailUrl} 
            alt={currentSong.title}
            className="w-full aspect-square rounded-lg object-cover shadow-2xl"
          />
          {/* Playing indicator */}
          {isPlaying && (
            <div className="absolute bottom-4 right-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Track details */}
      <div className="px-6 pb-4">
        <h3 className="text-xl font-bold text-white mb-1 truncate">
          {currentSong.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 truncate">
          {currentSong.artist}
        </p>

        {/* Action buttons */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-green-400 transition-colors">
            <Heart size={20} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Up next section */}
      <div className="flex-1 px-6 pb-6">
        <div className="border-t border-gray-700/30 pt-4">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Agle gaane</h4>
          <div className="space-y-2 text-sm text-gray-400">
            <p>Agle gaane yahan dikhenge</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingSidebar;