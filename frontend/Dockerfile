FROM node:18.16.1

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
