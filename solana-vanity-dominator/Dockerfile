FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install  # ✅ Install dependencies at build time
COPY . .
CMD ["npm", "start"]  # ✅ Single CMD for runtime