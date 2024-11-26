FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install cors
RUN npm install express
RUN npm install mysql2
COPY . .
EXPOSE 5000
CMD ["node","index.js"]
