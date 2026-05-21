FROM node:20

WORKDIR /app

# Install dependencies first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Persistent SQLite lives on a mounted volume, not in the ephemeral container layer.
RUN mkdir -p /data
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENV PORT=3001
ENV PROJECT_ALPHA_DB_LOCATION=/data/project-alpha.sqlite
ENV PROJECT_ALPHA_DB_AUTOSAVE=true

EXPOSE 3001
VOLUME ["/data"]

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "dist/main.js"]
