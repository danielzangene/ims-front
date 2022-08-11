FROM node:lts
# WORKDIR /app
COPY package.json ./
# COPY package-lock.json ./
COPY ./ ./
# RUN npm install --force --legacy-peer-deps
CMD ["npm", "run", "start"]