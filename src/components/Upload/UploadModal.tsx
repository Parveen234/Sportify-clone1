import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Upload, Music } from 'lucide-react';
import { RootState } from '../../store';
import { uploadSong } from '../../services/songService';
import { addSong } from '../../store/slices/songsSlice';
import toast from 'react-hot-toast';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!audioFile || !thumbnailFile || !title || !artist || !user) {
      toast.error('Please fill all fields');
      return;
    }

    setUploading(true);
    
    try {
      const song = await uploadSong(audioFile, thumbnailFile, title, artist, user.uid);
      dispatch(addSong(song));
      toast.success('Song uploaded successfully!');
      onClose();
      
      // Reset form
      setTitle('');
      setArtist('');
      setAudioFile(null);
      setThumbnailFile(null);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload song');
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Upload Song</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Song Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-400"
              placeholder="Enter song title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Artist
            </label>
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-400"
              placeholder="Enter artist name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Audio File (MP3)
            </label>
            <div className="relative">
              <input
                type="file"
                accept="audio/mp3,audio/mpeg"
                onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                className="hidden"
                id="audio-upload"
                required
              />
              <label
                htmlFor="audio-upload"
                className="flex items-center justify-center w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <Music size={20} className="mr-2" />
                {audioFile ? audioFile.name : 'Choose audio file'}
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Thumbnail Image
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                className="hidden"
                id="thumbnail-upload"
                required
              />
              <label
                htmlFor="thumbnail-upload"
                className="flex items-center justify-center w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <Upload size={20} className="mr-2" />
                {thumbnailFile ? thumbnailFile.name : 'Choose thumbnail'}
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {uploading ? 'Uploading...' : 'Upload Song'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;