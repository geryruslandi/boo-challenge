##### DEVELOPMENT STAGES #####
FROM node:18-buster as runnerDev

WORKDIR /app/server

COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]
