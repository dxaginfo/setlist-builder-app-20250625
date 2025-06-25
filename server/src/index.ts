import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createClient } from 'redis';

import { setupRoutes } from './routes';
import { errorHandler } from './middleware/errorHandler';
import { setupSocketHandlers } from './socket';
import logger from './utils/logger';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const server = http.createServer(app);

// Socket.io setup
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Redis client
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redisClient = createClient({
  url: redisUrl
});

// Connect to Redis
(async () => {
  redisClient.on('error', (err) => logger.error('Redis Client Error', err));
  await redisClient.connect();
  logger.info('Connected to Redis');
})();

// Setup routes
setupRoutes(app);

// Setup socket handlers
setupSocketHandlers(io, redisClient);

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/setlist_builder';
mongoose.connect(MONGO_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
    
    // Start the server
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});

export { app, server, redisClient };