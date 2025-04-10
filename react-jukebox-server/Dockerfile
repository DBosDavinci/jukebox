FROM node:23-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl libssl-dev

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
