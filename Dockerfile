FROM node:20

WORKDIR /app

# Install dependencies first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV PORT=3001
EXPOSE 3001

CMD ["node", "dist/main.js"]
