import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Playlist } from '../../types';

interface PlaylistsState {
  playlists: Playlist[];
  loading: boolean;
  error: string | null;
}

const initialState: PlaylistsState = {
  playlists: [],
  loading: false,
  error: null,
};

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    setPlaylists: (state, action: PayloadAction<Playlist[]>) => {
      state.playlists = action.payload;
      state.loading = false;
      state.error = null;
    },
    addPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.playlists.unshift(action.payload);
    },
    updatePlaylist: (state, action: PayloadAction<Playlist>) => {
      const index = state.playlists.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.playlists[index] = action.payload;
      }
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

export const { setPlaylists, addPlaylist, updatePlaylist, setLoading, setError } = playlistsSlice.actions;
export default playlistsSlice.reducer;