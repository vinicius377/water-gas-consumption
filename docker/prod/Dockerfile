FROM node:18-alpine

WORKDIR /app/prod

COPY package*.json ./

RUN npm ci 

EXPOSE 3000

COPY . .

RUN npm run build

USER node
CMD ["npm", "start"]
