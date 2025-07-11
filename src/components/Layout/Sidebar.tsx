import React from 'react';
import { Home, Search, Library, Plus, Heart } from 'lucide-react';

const Sidebar: React.FC = () => {
  // Sample playlists
  const samplePlaylists = [
    { id: '1', name: 'Meri Pasandida' },
    { id: '2', name: 'Romantic Hits' },
    { id: '3', name: 'Gym Ke Liye' },
    { id: '4', name: 'Long Drive Songs' },
    { id: '5', name: 'Sufi Collection' },
    { id: '6', name: '90s Ke Superhit' },
    { id: '7', name: 'Party Mix' },
  ];

  return (
    <div className="w-64 bg-black bg-opacity-90 backdrop-blur-sm text-white h-full flex flex-col border-r border-gray-700/30">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <img src="/sportifyy.png" alt="Spotify" className="w-8 h-8" />
          <span className="text-xl font-bold">MusicHub</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="px-6 space-y-4">
        <a href="#" className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors">
          <Home size={24} />
          <span className="font-medium">Ghar</span>
        </a>
        <a href="#" className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors">
          <Search size={24} />
          <span className="font-medium">Khojiye</span>
        </a>
        <a href="#" className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors">
          <Library size={24} />
          <span className="font-medium">Aapki Library</span>
        </a>
      </nav>

      <div className="mt-8 px-6">
        <div className="border-t border-gray-800 pt-4">
          <a href="#" className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors">
            <Plus size={24} />
            <span className="font-medium">Playlist Banayiye</span>
          </a>
          <a href="#" className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors mt-4">
            <Heart size={24} />
            <span className="font-medium">Pasandida Gaane</span>
          </a>
        </div>
      </div>

      {/* Playlists */}
      <div className="flex-1 px-6 mt-6 overflow-y-auto">
        <div className="space-y-2">
          {samplePlaylists.map((playlist) => (
            <div key={playlist.id} className="text-gray-400 hover:text-white cursor-pointer py-1 truncate">
              {playlist.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;