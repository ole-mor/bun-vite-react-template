# Stage 1: Build the application using Bun and Vite
FROM oven/bun:1-alpine AS builder
WORKDIR /app

# Copy package manifests first for dependency caching
COPY package.json bun.lockb* ./

# Install ALL dependencies needed for building the frontend
# Using --frozen-lockfile for reproducible builds
RUN bun install --frozen-lockfile

# Copy the rest of the application source code
# Do this AFTER install to leverage Docker cache better
COPY . .

# Set NODE_ENV for the build process (good practice)
ENV NODE_ENV=production

# Run the vite build using bun
# This creates the static frontend assets in /app/dist
RUN bun run build

# Stage 2: Create the final image to run the integrated server
FROM oven/bun:1-alpine AS final
WORKDIR /app

# Set NODE_ENV for the runtime environment
ENV NODE_ENV=production

# Copy package manifests again
COPY package.json bun.lockb* ./

# Install ONLY production dependencies needed to run the server
RUN bun install --production --frozen-lockfile

# Copy the built frontend static assets from the builder stage
COPY --from=builder /app/dist ./dist

# Copy the backend server code
# Adjust these COPY lines if your server code is structured differently
# For example, if server.ts doesn't need anything from ./src, remove the second COPY
COPY server.ts ./
COPY ./src ./src

# Define the port the server should listen on.
# Azure App Service will set the PORT environment variable automatically.
# Your server.ts should use process.env.PORT || 3000 (or another default).
ENV PORT=3000
EXPOSE $PORT

# Command to run the backend server using Bun
# This assumes server.ts can be run directly
CMD ["bun", "run", "server.ts"]