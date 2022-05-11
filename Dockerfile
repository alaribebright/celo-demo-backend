FROM node:16

# RUN npm install -g yarn

RUN mkdir -p /piggyfibackend
WORKDIR /piggyfibackend

COPY package*.json ./

RUN npm install

#COPY ...

EXPOSE 5000

CMD npm start
