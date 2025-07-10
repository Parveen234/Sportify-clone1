import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song, PlayerState } from '../../types';

const initialState: PlayerState = {
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: 0,
  volume: 1,
  currentTime: 0,
  duration: 0,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentSong: (state, action: PayloadAction<Song>) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setQueue: (state, action: PayloadAction<Song[]>) => {
      state.queue = action.payload;
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
      if (state.queue[action.payload]) {
        state.currentSong = state.queue[action.payload];
      }
    },
    nextSong: (state) => {
      if (state.currentIndex < state.queue.length - 1) {
        state.currentIndex += 1;
        state.currentSong = state.queue[state.currentIndex];
        state.isPlaying = true;
      }
    },
    previousSong: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
        state.currentSong = state.queue[state.currentIndex];
        state.isPlaying = true;
      }
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
  },
});

export const {
  setCurrentSong,
  togglePlayPause,
  setIsPlaying,
  setQueue,
  setCurrentIndex,
  nextSong,
  previousSong,
  setVolume,
  setCurrentTime,
  setDuration,
} = playerSlice.actions;

export default playerSlice.reducer;