# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json files
COPY package*.json ./
COPY shared/package*.json ./shared/
COPY server/package*.json ./server/

# Install dependencies
RUN npm ci

# Copy source code
COPY shared ./shared
COPY server ./server

# Build shared package
RUN cd shared && npm run build

# Build server
RUN cd server && npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package.json files
COPY package*.json ./
COPY shared/package*.json ./shared/
COPY server/package*.json ./server/

# Install production dependencies only
RUN npm ci --omit=dev

# Copy built files from build stage
COPY --from=build /app/shared/dist ./shared/dist
COPY --from=build /app/server/dist ./server/dist

# Environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose port
EXPOSE 5000

# Set user to non-root
USER node

# Start the server
CMD ["node", "server/dist/index.js"]