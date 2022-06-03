FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm build

EXPOSE 3000

CMD ["npm", "run", "start"]
