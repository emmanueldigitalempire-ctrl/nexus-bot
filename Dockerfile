FROM node:20

# Install Python + FFmpeg
RUN apt update && apt install -y python3 ffmpeg

# 🔥 FIX: link python3 → python
RUN ln -s /usr/bin/python3 /usr/bin/python

WORKDIR /app

COPY . .

RUN npm install

CMD ["node", "index.js"]