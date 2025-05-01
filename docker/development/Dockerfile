FROM node:18-alpine
ENV TZ="America/Sao_Paulo"
WORKDIR ./app

COPY package*.json ./
RUN npm install

EXPOSE 3000

COPY . .

CMD ["npm", "run", "dev"]
