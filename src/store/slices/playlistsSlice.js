import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  playlists: [],
  loading: false,
  error: null,
};

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    setPlaylists: (state, action) => {
      state.playlists = action.payload;
      state.loading = false;
      state.error = null;
    },
    addPlaylist: (state, action) => {
      state.playlists.unshift(action.payload);
    },
    updatePlaylist: (state, action) => {
      const index = state.playlists.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.playlists[index] = action.payload;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setPlaylists, addPlaylist, updatePlaylist, setLoading, setError } = playlistsSlice.actions;
export default playlistsSlice.reducer;