FROM node:18
WORKDIR /app

# Copy the entire repository. The project currently does not rely on a
# Node.js package manifest so we skip installing npm dependencies.
COPY . .

# Ensure our start script is executable and run it by default.
RUN chmod +x runpod-start.sh \
    && chmod +x src/cuda/vanity

CMD ["./runpod-start.sh"]
