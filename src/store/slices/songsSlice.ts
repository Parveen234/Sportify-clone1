import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '../../types';

interface SongsState {
  songs: Song[];
  loading: boolean;
  error: string | null;
}

const initialState: SongsState = {
  songs: [],
  loading: false,
  error: null,
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setSongs: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.loading = false;
      state.error = null;
    },
    addSong: (state, action: PayloadAction<Song>) => {
      state.songs.unshift(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setSongs, addSong, setLoading, setError } = songsSlice.actions;
export default songsSlice.reducer;