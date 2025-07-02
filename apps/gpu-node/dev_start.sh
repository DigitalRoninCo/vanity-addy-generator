#!/bin/bash
# apps/gpu-node/dev_start.sh

set -e

# Start the gRPC server in the background
echo "🚀 Starting gRPC server..."
python3 server.py &
SERVER_PID=$!

# Wait for the server to boot
sleep 2

# Run the client
echo "📡 Running gRPC client..."
python3 client.py

# Optionally keep the server running
wait $SERVER_PID
