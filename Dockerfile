FROM node

WORKDIR /app

RUN npm install -g yarn

COPY package*.json .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4300

CMD ["yarn prod"]