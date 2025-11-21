# Use Debian-based Node.js image for production only
FROM node:22-slim AS production

# Set the working directory
WORKDIR /usr/src/app

ENV NODE_OPTIONS="--max-old-space-size=4096"

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and lock file
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./

# Install ONLY production dependencies (sin devDependencies)
RUN pnpm install --frozen-lockfile

# Copy pre-built files from your local machine
COPY ./dist ./dist
COPY ./server ./server

# Expose the application port
EXPOSE 3000

# Start the application
CMD [ "node", "server/entry.express" ]
