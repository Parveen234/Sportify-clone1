import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setSongs, setLoading } from '../store/slices/songsSlice';
import Sidebar from '../components/Layout/Sidebar';
import TopBar from '../components/Layout/TopBar';
import SongList from '../components/Songs/SongList';
import MusicPlayer from '../components/Player/MusicPlayer';
import NowPlayingSidebar from '../components/Layout/NowPlayingSidebar';
import { Song } from '../types';

// Sample songs data
const sampleSongs: Song[] = [
  {
    id: '1',
    title: 'Tum Hi Ho',
    artist: 'Arijit Singh',
    duration: 262,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date().getTime(),
  },
  {
    id: '2',
    title: 'Kesariya',
    artist: 'Arijit Singh',
    duration: 245,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date().getTime(),
  },
  {
    id: '3',
    title: 'Apna Bana Le',
    artist: 'Arijit Singh',
    duration: 198,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date().getTime(),
  },
  {
    id: '4',
    title: 'Raataan Lambiyan',
    artist: 'Tanishk Bagchi, Jubin Nautiyal',
    duration: 187,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date().getTime(),
  },
  {
    id: '5',
    title: 'Dil Diyan Gallan',
    artist: 'Atif Aslam',
    duration: 234,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date().getTime(),
  },
  {
    id: '6',
    title: 'Pal Pal Dil Ke Paas',
    artist: 'Kishore Kumar',
    duration: 289,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date().getTime(),
  },
  {
    id: '7',
    title: 'Channa Mereya',
    artist: 'Arijit Singh',
    duration: 298,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date().getTime(),
  },
  {
    id: '8',
    title: 'Kabira',
    artist: 'Tochi Raina, Rekha Bhardwaj',
    duration: 245,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date().getTime(),
  },
  {
    id: '9',
    title: 'Jeene Laga Hoon',
    artist: 'Atif Aslam, Shreya Ghoshal',
    duration: 267,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date().getTime(),
  },
  {
    id: '10',
    title: 'Tera Ban Jaunga',
    artist: 'Akhil Sachdeva, Tulsi Kumar',
    duration: 223,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date().getTime(),
  },
  {
    id: '11',
    title: 'Hawayein',
    artist: 'Arijit Singh',
    duration: 234,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date().getTime(),
  },
  {
    id: '12',
    title: 'Phir Bhi Tumko Chaahunga',
    artist: 'Arijit Singh, Shashaa Tirupati',
    duration: 298,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date().getTime(),
  },
  {
    id: '13',
    title: 'Kun Faya Kun',
    artist: 'A.R. Rahman, Javed Ali',
    duration: 456,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date().getTime(),
  },
  {
    id: '14',
    title: 'Ae Dil Hai Mushkil',
    artist: 'Arijit Singh',
    duration: 278,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date().getTime(),
  },
  {
    id: '15',
    title: 'Bulleya',
    artist: 'Amit Mishra, Shilpa Rao',
    duration: 234,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
    thumbnailUrl: 'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=300',
    uploadedBy: 'system',
    createdAt: new Date().getTime(),
  },
];

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { currentSong } = useSelector((state: RootState) => state.player);

  useEffect(() => {
    // Initialize songs data
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setSongs(sampleSongs));
    }, 500);
  }, [dispatch]);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col">
      {/* Song artwork background */}
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
        
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          
          <main className="flex-1 overflow-y-auto p-6 relative">
            {/* Content overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
            
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                    {currentSong ? `Now Playing` : 'Namaskar! Suniye apne pasandida gaane'}
                  </h1>
                  <p className="text-gray-300 drop-shadow-md">
                    {currentSong ? `${currentSong.title} by ${currentSong.artist}` : 'Apne dil ke kareeb ke gaane suniye aur maza lijiye'}
                  </p>
                </div>
              </div>

              <div className="bg-gray-900 bg-opacity-60 backdrop-blur-md rounded-lg p-6 shadow-2xl border border-gray-700/50">
                <h2 className="text-2xl font-bold text-white mb-6">Popular Songs</h2>
                <SongList />
              </div>
            </div>
          </main>
        </div>
        
        {/* Now playing sidebar */}
        {currentSong && <NowPlayingSidebar />}
      </div>

      <div className="relative z-20">
        <MusicPlayer />
      </div>
    </div>
  );
};

export default Dashboard;