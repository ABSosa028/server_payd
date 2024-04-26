FROM node:alpine 
WORKDIR /client

COPY package*.json .
RUN npm i
COPY . .

CMD ["node", "main.js"]