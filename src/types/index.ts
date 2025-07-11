export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  audioUrl: string;
  thumbnailUrl: string;
  uploadedBy: string;
  createdAt: number;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  songs: string[];
  createdBy: string;
  createdAt: number;
  thumbnailUrl?: string;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;
  volume: number;
  currentTime: number;
  duration: number;
}