FROM node:18-alpine

WORKDIR /app/dev

COPY package.json .
COPY package-lock.json .

EXPOSE 3000

COPY . .

USER node
CMD npm install && npm run dev
