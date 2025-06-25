import mongoose, { Document, Schema } from 'mongoose';

export interface ISong extends Document {
  title: string;
  artist: string;
  duration: number; // in seconds
  key: string;
  tempo: number;
  timeSignature: string;
  notes: string;
  lyrics: string;
  chords: string;
  tags: string[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
}

const SongSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a song title'],
    trim: true,
    maxlength: [100, 'Song title cannot exceed 100 characters']
  },
  artist: {
    type: String,
    required: [true, 'Please provide an artist name'],
    trim: true,
    maxlength: [100, 'Artist name cannot exceed 100 characters']
  },
  duration: {
    type: Number,
    default: 0,
    min: [0, 'Duration cannot be negative']
  },
  key: {
    type: String,
    trim: true,
    maxlength: [10, 'Key cannot exceed 10 characters']
  },
  tempo: {
    type: Number,
    min: [0, 'Tempo cannot be negative'],
    max: [300, 'Tempo cannot exceed 300 BPM']
  },
  timeSignature: {
    type: String,
    default: '4/4',
    trim: true
  },
  notes: {
    type: String,
    trim: true
  },
  lyrics: {
    type: String,
    trim: true
  },
  chords: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user ID']
  },
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create indexes for faster queries
SongSchema.index({ title: 'text', artist: 'text', tags: 'text' });
SongSchema.index({ createdBy: 1 });

export default mongoose.model<ISong>('Song', SongSchema);