import React from 'react';
import { useSelector } from 'react-redux';
import SongCard from './SongCard';

const SongList = () => {
  const { songs, loading } = useSelector((state) => state.songs);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-white mb-2">No songs yet</h3>
        <p className="text-gray-400">Upload your first song to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {songs.map((song, index) => (
        <SongCard 
          key={song.id} 
          song={song} 
          index={index}
          songs={songs}
        />
      ))}
    </div>
  );
};

export default SongList;