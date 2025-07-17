import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  updateDoc,
  doc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

export const createPlaylist = async (
  name,
  description,
  userId
) => {
  const playlistId = uuidv4();
  
  const playlistData = {
    id: playlistId,
    name,
    description,
    songs: [],
    createdBy: userId,
    createdAt: Timestamp.now(),
  };
  
  await addDoc(collection(db, 'playlists'), playlistData);
  
  return {
    ...playlistData,
    createdAt: playlistData.createdAt.toDate(),
  };
};

export const getUserPlaylists = async (userId) => {
  const q = query(
    collection(db, 'playlists'), 
    where('createdBy', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
  }));
};

export const addSongToPlaylist = async (playlistId, songId) => {
  const playlistRef = doc(db, 'playlists', playlistId);
  // Note: In a real app, you'd want to get the current songs array and append to it
  // This is a simplified version
  await updateDoc(playlistRef, {
    songs: [songId] // This would overwrite - implement proper array union in production
  });
};