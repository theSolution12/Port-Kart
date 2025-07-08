FROM node:20-alpine

WORKDIR /src

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

CMD ["npm", "start"]