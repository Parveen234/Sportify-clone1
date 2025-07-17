import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

export const uploadSong = async (
  audioFile,
  thumbnailFile,
  title,
  artist,
  userId
) => {
  const songId = uuidv4();
  
  // Upload audio file
  const audioRef = ref(storage, `songs/${songId}/${audioFile.name}`);
  const audioSnapshot = await uploadBytes(audioRef, audioFile);
  const audioUrl = await getDownloadURL(audioSnapshot.ref);
  
  // Upload thumbnail
  const thumbnailRef = ref(storage, `thumbnails/${songId}/${thumbnailFile.name}`);
  const thumbnailSnapshot = await uploadBytes(thumbnailRef, thumbnailFile);
  const thumbnailUrl = await getDownloadURL(thumbnailSnapshot.ref);
  
  // Create song document
  const songData = {
    id: songId,
    title,
    artist,
    audioUrl,
    thumbnailUrl,
    uploadedBy: userId,
    createdAt: Timestamp.now(),
    duration: 0, // Will be updated when audio loads
  };
  
  await addDoc(collection(db, 'songs'), songData);
  
  return {
    ...songData,
    createdAt: songData.createdAt.toMillis(),
  };
};

export const getSongs = async () => {
  const q = query(collection(db, 'songs'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    ...doc.data(),
    createdAt: doc.data().createdAt.toMillis(),
  }));
};