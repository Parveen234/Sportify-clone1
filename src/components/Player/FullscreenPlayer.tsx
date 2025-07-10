import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Shuffle,
  Repeat,
  ChevronDown,
  Heart,
  MoreHorizontal
} from 'lucide-react';
import { RootState } from '../../store';
import { 
  togglePlayPause, 
  nextSong, 
  previousSong, 
  setVolume
} from '../../store/slices/playerSlice';

interface FullscreenPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FullscreenPlayer: React.FC<FullscreenPlayerProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying, volume, currentTime, duration } = useSelector(
    (state: RootState) => state.player
  );

  const handlePlayPause = () => {
    dispatch(togglePlayPause());
  };

  const handlePrevious = () => {
    dispatch(previousSong());
  };

  const handleNext = () => {
    dispatch(nextSong());
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    dispatch(setVolume(newVolume));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isOpen || !currentSong) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${currentSong.thumbnailUrl})`,
          filter: 'blur(60px) brightness(0.3)',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <button
          onClick={onClose}
          className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-colors"
        >
          <ChevronDown size={24} />
        </button>
        
        <div className="text-center">
          <p className="text-gray-300 text-sm">PLAYING FROM PLAYLIST</p>
          <p className="text-white font-medium">Recently Added</p>
        </div>
        
        <button className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10">
        {/* Album Art */}
        <div className="mb-8">
          <img 
            src={currentSong.thumbnailUrl} 
            alt={currentSong.title}
            className="w-80 h-80 md:w-96 md:h-96 rounded-2xl shadow-2xl object-cover"
          />
        </div>

        {/* Song Info */}
        <div className="text-center mb-8 max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 truncate">
            {currentSong.title}
          </h1>
          <p className="text-xl text-gray-300 truncate">{currentSong.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mb-8">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-8 mb-8">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Shuffle size={24} />
          </button>
          <button 
            onClick={handlePrevious}
            className="text-white hover:scale-110 transition-transform"
          >
            <SkipBack size={32} />
          </button>
          <button 
            onClick={handlePlayPause}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform shadow-lg"
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} />}
          </button>
          <button 
            onClick={handleNext}
            className="text-white hover:scale-110 transition-transform"
          >
            <SkipForward size={32} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Repeat size={24} />
          </button>
        </div>

        {/* Secondary Controls */}
        <div className="flex items-center space-x-6">
          <button className="text-gray-400 hover:text-green-400 transition-colors">
            <Heart size={20} />
          </button>
          
          <div className="flex items-center space-x-2">
            <VolumeX size={20} className="text-gray-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <Volume2 size={20} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullscreenPlayer;