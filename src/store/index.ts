import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import playerReducer from './slices/playerSlice';
import songsReducer from './slices/songsSlice';
import playlistsReducer from './slices/playlistsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    player: playerReducer,
    songs: songsReducer,
    playlists: playlistsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setUser'],
        ignoredPaths: ['auth.user'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;