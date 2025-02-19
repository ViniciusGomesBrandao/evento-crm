# Using an official Node.js image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose the port where Vite will be running
EXPOSE 5173

# Run Vite in development mode (with live reload)
CMD ["npm", "run", "dev"]
