import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Play, Pause, MoreHorizontal } from 'lucide-react';
import { setCurrentSong, setQueue, togglePlayPause } from '../../store/slices/playerSlice';

const SongCard = ({ song, index, songs }) => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  
  const isCurrentSong = currentSong?.id === song.id;

  const handlePlay = () => {
    if (isCurrentSong) {
      dispatch(togglePlayPause());
    } else {
      dispatch(setQueue(songs));
      dispatch(setCurrentSong(song));
    }
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="group flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-800 transition-colors">
      <div className="relative w-12 h-12">
        <img 
          src={song.thumbnailUrl} 
          alt={song.title}
          className="w-full h-full object-cover rounded"
        />
        <button
          onClick={handlePlay}
          className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded"
        >
          {isCurrentSong && isPlaying ? (
            <Pause size={16} className="text-white" />
          ) : (
            <Play size={16} className="text-white" />
          )}
        </button>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className={`font-medium truncate ${isCurrentSong ? 'text-green-400' : 'text-white'}`}>
          {song.title}
        </h3>
        <p className="text-gray-400 text-sm truncate">{song.artist}</p>
      </div>

      <div className="text-gray-400 text-sm">
        {formatDuration(song.duration)}
      </div>

      <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all">
        <MoreHorizontal size={20} />
      </button>
    </div>
  );
};

export default SongCard;