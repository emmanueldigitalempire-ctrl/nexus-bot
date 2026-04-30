# Use Node base image
FROM node:20

# Install Python + FFmpeg
RUN apt update && apt install -y python3 ffmpeg

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Start bot
CMD ["node", "index.js"]