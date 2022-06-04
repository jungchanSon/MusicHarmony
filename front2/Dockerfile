FROM node:18-alpine

MAINTAINER jungchan son <rnrmfjc@gmail.com>

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
