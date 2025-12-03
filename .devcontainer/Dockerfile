FROM node:18

WORKDIR /workspace

RUN apt-get update && apt-get install -y git bash curl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install

EXPOSE 5173
EXPOSE 3000
