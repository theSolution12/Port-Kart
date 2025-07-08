# Use Node.js 20 Alpine as the base image for a small, secure container
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to leverage Docker cache for npm install
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (e.g., transpile TypeScript, bundle assets)
RUN npm run build

# Start the application using the npm start script
CMD ["npm", "start"]