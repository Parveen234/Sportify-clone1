import React, { useRef, useEffect, useState } from 'react';
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
  Maximize2
} from 'lucide-react';
import { 
  togglePlayPause, 
  nextSong, 
  previousSong, 
  setVolume, 
  setCurrentTime, 
  setDuration,
  setIsPlaying
} from '../../store/slices/playerSlice';
import FullscreenPlayer from './FullscreenPlayer';

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying, volume, currentTime, duration } = useSelector(
    (state) => state.player
  );
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    audio.src = currentSong.audioUrl;
    
    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      dispatch(setCurrentTime(audio.currentTime));
    };

    const handleLoadedMetadata = () => {
      dispatch(setDuration(audio.duration));
    };

    const handleEnded = () => {
      dispatch(nextSong());
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    dispatch(togglePlayPause());
  };

  const handlePrevious = () => {
    dispatch(previousSong());
  };

  const handleNext = () => {
    dispatch(nextSong());
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = parseFloat(e.target.value);
      audio.currentTime = newTime;
      dispatch(setCurrentTime(newTime));
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    dispatch(setVolume(newVolume));
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentSong) {
    return null;
  }

  return (
    <div className="h-24 bg-gray-900 bg-opacity-95 backdrop-blur-md border-t border-gray-700/50 flex items-center justify-between px-4 shadow-2xl">
      <audio ref={audioRef} />
      
      {/* Track info */}
      <div className="flex items-center space-x-4 w-1/4">
        <button
          onClick={() => setIsFullscreen(true)}
          className="group relative"
        >
          <img 
            src={currentSong.thumbnailUrl} 
            alt={currentSong.title}
            className="w-14 h-14 rounded object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded flex items-center justify-center transition-all">
            <Maximize2 size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>
        <div className="min-w-0">
          <button
            onClick={() => setIsFullscreen(true)}
            className="text-left"
          >
            <h4 className="text-white font-medium truncate hover:underline">{currentSong.title}</h4>
          </button>
          <p className="text-gray-400 text-sm truncate">{currentSong.artist}</p>
        </div>
      </div>

      {/* Playback controls */}
      <div className="flex flex-col items-center space-y-2 w-1/2">
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Shuffle size={20} />
          </button>
          <button 
            onClick={handlePrevious}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <SkipBack size={20} />
          </button>
          <button 
            onClick={handlePlayPause}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button 
            onClick={handleNext}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <SkipForward size={20} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Repeat size={20} />
          </button>
        </div>

        {/* Seek bar */}
        <div className="flex items-center space-x-2 w-full">
          <span className="text-xs text-gray-400 w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-xs text-gray-400 w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume controls */}
      <div className="flex items-center space-x-2 w-1/4 justify-end">
        <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors">
          {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>
      
      <FullscreenPlayer 
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
      />
    </div>
  );
};

export default MusicPlayer;