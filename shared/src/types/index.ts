// User types
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  defaultView: 'list' | 'grid' | 'calendar';
}

export interface User {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
  preferences: UserPreferences;
}

// Song types
export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  key?: string;
  tempo?: number;
  timeSignature?: string;
  notes?: string;
  lyrics?: string;
  chords?: string;
  tags: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
}

// Setlist types
export interface SetlistSong {
  id: string;
  songId: string;
  position: number;
  duration?: number;
  key?: string;
  notes?: string;
  // These are populated from the referenced song when needed
  songTitle?: string;
  songArtist?: string;
}

export interface Setlist {
  id: string;
  name: string;
  description?: string;
  venue?: string;
  date?: string;
  songs: SetlistSong[];
  totalDuration: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
}

// Authentication types
export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

// Shared API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    results: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  error?: string;
  message?: string;
}

// Socket event types
export enum SocketEvent {
  // Connection events
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  
  // Setlist events
  JOIN_SETLIST = 'join_setlist',
  LEAVE_SETLIST = 'leave_setlist',
  SETLIST_UPDATED = 'setlist_updated',
  SONG_ADDED = 'song_added',
  SONG_REMOVED = 'song_removed',
  SONG_REORDERED = 'song_reordered',
  SONG_UPDATED = 'song_updated',
  
  // User presence events
  USER_JOINED = 'user_joined',
  USER_LEFT = 'user_left',
  ACTIVE_USERS = 'active_users',
  
  // Performance mode events
  START_PERFORMANCE = 'start_performance',
  END_PERFORMANCE = 'end_performance',
  CURRENT_SONG = 'current_song',
  PERFORMANCE_PROGRESS = 'performance_progress'
}

export interface SocketJoinSetlistPayload {
  setlistId: string;
  userId: string;
}

export interface SocketUserPresence {
  userId: string;
  username: string;
  profilePicture?: string;
  joinedAt: string;
}

export interface SocketCurrentSongPayload {
  setlistId: string;
  currentSongId: string;
  position: number;
  startedAt: string;
}