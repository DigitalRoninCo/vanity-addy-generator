FROM node:18
WORKDIR /app


# Install Node.js dependencies first so they can be cached between builds
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the repository
COPY . .

# Ensure our start script is executable and run it by default
RUN chmod +x runpod-start.sh

# Copy package manifests first to leverage Docker layer caching and install
# dependencies.  This project now includes a `package.json` so we install the
# required Node modules before copying the rest of the repository.
COPY package*.json ./
RUN npm ci

# Copy the remainder of the repository
COPY . .

# Ensure our start script and GPU binary are executable and run the start script
# by default.
RUN chmod +x runpod-start.sh \
    && chmod +x src/cuda/vanity


CMD ["./runpod-start.sh"]
