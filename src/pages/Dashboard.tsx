import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setSongs, setLoading } from '../store/slices/songsSlice';
import Sidebar from '../components/Layout/Sidebar';
import TopBar from '../components/Layout/TopBar';
import SongList from '../components/Songs/SongList';
import MusicPlayer from '../components/Player/MusicPlayer';
import { Song } from '../types';

// Sample songs data
const sampleSongs: Song[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    duration: 200,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    duration: 233,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    duration: 174,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date(),
  },
  {
    id: '4',
    title: 'Levitating',
    artist: 'Dua Lipa',
    duration: 203,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date(),
  },
  {
    id: '5',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    duration: 178,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date(),
  },
  {
    id: '6',
    title: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    duration: 141,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date(),
  },
  {
    id: '7',
    title: 'Heat Waves',
    artist: 'Glass Animals',
    duration: 238,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date(),
  },
  {
    id: '8',
    title: 'As It Was',
    artist: 'Harry Styles',
    duration: 167,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date(),
  },
  {
    id: '9',
    title: 'Anti-Hero',
    artist: 'Taylor Swift',
    duration: 200,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date(),
  },
  {
    id: '10',
    title: 'Flowers',
    artist: 'Miley Cyrus',
    duration: 200,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date(),
  },
  {
    id: '11',
    title: 'Unholy',
    artist: 'Sam Smith ft. Kim Petras',
    duration: 156,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date(),
  },
  {
    id: '12',
    title: 'Bad Habit',
    artist: 'Steve Lacy',
    duration: 221,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date(),
  },
];

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { currentSong } = useSelector((state: RootState) => state.player);

  useEffect(() => {
    // Load sample songs on component mount
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setSongs(sampleSongs));
    }, 500);
  }, [dispatch]);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col">
      {/* Dynamic Background */}
      {currentSong && (
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-20 transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${currentSong.thumbnailUrl})`,
            filter: 'blur(50px) brightness(0.3)',
            transform: 'scale(1.1)',
          }}
        />
      )}
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <div className="flex-1 flex flex-col">
          <TopBar />
          
          <main className="flex-1 overflow-y-auto p-6 relative">
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
            
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                    {currentSong ? `Now Playing` : 'Good evening'}
                  </h1>
                  <p className="text-gray-300 drop-shadow-md">
                    {currentSong ? `${currentSong.title} by ${currentSong.artist}` : 'Discover and enjoy your favorite music'}
                  </p>
                </div>
              </div>

              <div className="bg-gray-900 bg-opacity-60 backdrop-blur-md rounded-lg p-6 shadow-2xl border border-gray-700/50">
                <h2 className="text-2xl font-bold text-white mb-6">Recently Added</h2>
                <SongList />
              </div>
            </div>
          </main>
        </div>
      </div>

      <div className="relative z-20">
        <MusicPlayer />
      </div>
    </div>
  );
};

export default Dashboard;