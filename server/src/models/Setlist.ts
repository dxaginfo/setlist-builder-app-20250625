import mongoose, { Document, Schema } from 'mongoose';

interface ISetlistSong {
  songId: mongoose.Types.ObjectId;
  position: number;
  duration?: number;
  key?: string;
  notes?: string;
}

export interface ISetlist extends Document {
  name: string;
  description?: string;
  venue?: string;
  date?: Date;
  songs: ISetlistSong[];
  totalDuration: number;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
}

const SetlistSongSchema = new Schema({
  songId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song',
    required: [true, 'Please provide a song ID']
  },
  position: {
    type: Number,
    required: [true, 'Please provide a position'],
    min: [0, 'Position cannot be negative']
  },
  duration: {
    type: Number,
    min: [0, 'Duration cannot be negative']
  },
  key: {
    type: String,
    trim: true,
    maxlength: [10, 'Key cannot exceed 10 characters']
  },
  notes: {
    type: String,
    trim: true
  }
}, { _id: true });

const SetlistSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a setlist name'],
    trim: true,
    maxlength: [100, 'Setlist name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  venue: {
    type: String,
    trim: true,
    maxlength: [100, 'Venue name cannot exceed 100 characters']
  },
  date: {
    type: Date
  },
  songs: [SetlistSongSchema],
  totalDuration: {
    type: Number,
    default: 0,
    min: [0, 'Total duration cannot be negative']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user ID']
  },
  isArchived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create indexes for faster queries
SetlistSchema.index({ name: 'text', description: 'text', venue: 'text' });
SetlistSchema.index({ createdBy: 1 });
SetlistSchema.index({ date: 1 });

// Pre-save hook to calculate total duration
SetlistSchema.pre<ISetlist>('save', function(next) {
  if (this.isModified('songs')) {
    this.totalDuration = this.songs.reduce((total, song) => {
      return total + (song.duration || 0);
    }, 0);
  }
  next();
});

export default mongoose.model<ISetlist>('Setlist', SetlistSchema);