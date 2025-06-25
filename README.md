# Setlist Builder + Sync

A collaborative application for musicians to build, edit, track, and export setlists with real-time synchronization across devices.

## Overview

Setlist Builder + Sync helps musicians and bands manage their song repertoire and create setlists for performances. The application provides real-time collaboration features, allowing band members to synchronize setlists across devices, enabling easy editing and tracking during performances.

## Features

### Core Features
- **Setlist Creation and Management**
  - Create, edit, and delete setlists
  - Add, remove, and reorder songs within setlists
  - Categorize setlists by date, venue, or type

- **Song Database**
  - Add songs with details (title, artist, duration, key, tempo, etc.)
  - Import songs from local files or streaming services
  - Track song performance history

- **Real-time Collaboration**
  - Share setlists with band members
  - Assign editing permissions to collaborators
  - View who's currently editing a setlist

- **Sync Across Devices**
  - Cloud-based storage for accessing setlists from any device
  - Offline mode with auto-sync when connection is restored
  - Real-time updates when changes are made

- **Performance Mode**
  - Display current song and upcoming songs
  - Auto-scrolling lyrics and chord charts
  - Performance timer and set duration tracking

- **Export and Sharing**
  - Export setlists as PDF, text, or image files
  - Share setlists via email or messaging apps
  - Generate printable setlists with notes

## Technology Stack

### Frontend
- React with TypeScript
- Material-UI for consistent design components
- Redux for global state management
- Redux Persist and Service Workers for offline support

### Backend
- Node.js with Express
- JWT for secure authentication
- Socket.io for real-time updates

### Database
- MongoDB for flexible document storage
- Redis for performance optimization

### Mobile Support
- React Native for iOS and Android applications
- Firebase Cloud Messaging for notifications

### Deployment
- AWS or Vercel for hosting
- GitHub Actions for CI/CD
- Sentry for error tracking

## Project Structure

```
setlist-builder-app/
│
├── client/                      # Frontend React application
│   ├── public/                  # Static files
│   └── src/
│       ├── components/          # Reusable React components
│       ├── pages/               # Page components
│       ├── store/               # Redux store configuration
│       ├── services/            # API services
│       ├── hooks/               # Custom React hooks
│       ├── utils/               # Utility functions
│       └── styles/              # Global styles and themes
│
├── server/                      # Backend Node.js/Express application
│   ├── controllers/             # Route controllers
│   ├── models/                  # Database models
│   ├── routes/                  # API routes
│   ├── middleware/              # Express middleware
│   ├── services/                # Business logic
│   ├── utils/                   # Utility functions
│   └── config/                  # Configuration files
│
├── mobile/                      # React Native mobile application
│   ├── android/                 # Android specific code
│   ├── ios/                     # iOS specific code
│   └── src/                     # Shared React Native code
│
└── shared/                      # Shared code between client/server/mobile
    ├── types/                   # TypeScript type definitions
    ├── constants/               # Shared constants
    └── utils/                   # Shared utility functions
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- MongoDB 4.4+
- Redis 6+
- Git

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/dxaginfo/setlist-builder-app-20250625.git
   cd setlist-builder-app-20250625
   ```

2. Install server dependencies
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies
   ```bash
   cd ../client
   npm install
   ```

4. Set up environment variables
   - Create a `.env` file in the server directory based on `.env.example`
   - Create a `.env` file in the client directory based on `.env.example`

5. Start MongoDB and Redis
   ```bash
   # Using Docker (optional)
   docker-compose up -d
   ```

6. Start the development servers
   ```bash
   # Start the backend server
   cd server
   npm run dev

   # In another terminal, start the frontend client
   cd client
   npm start
   ```

7. Open your browser and navigate to `http://localhost:3000`

### Running Tests

```bash
# Run server tests
cd server
npm test

# Run client tests
cd client
npm test
```

## Deployment

### Backend Deployment

1. Build the server
   ```bash
   cd server
   npm run build
   ```

2. Deploy to your hosting provider (AWS, Heroku, DigitalOcean, etc.)

### Frontend Deployment

1. Build the client
   ```bash
   cd client
   npm run build
   ```

2. Deploy the contents of the `build` directory to your hosting provider

### Docker Deployment

```bash
# Build and run using Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Socket.io](https://socket.io/)
- [Material-UI](https://mui.com/)