# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json files
COPY package*.json ./
COPY shared/package*.json ./shared/
COPY client/package*.json ./client/

# Install dependencies
RUN npm ci

# Copy source code
COPY shared ./shared
COPY client ./client

# Build shared package
RUN cd shared && npm run build

# Build client
ENV NODE_ENV=production
RUN cd client && npm run build

# Production stage with Nginx
FROM nginx:alpine

# Copy the built app
COPY --from=build /app/client/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]