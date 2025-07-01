FROM node:18
WORKDIR /app

# Install Node.js dependencies first so they can be cached between builds
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the repository
COPY . .

# Ensure our start script is executable and run it by default
RUN chmod +x runpod-start.sh

CMD ["./runpod-start.sh"]
