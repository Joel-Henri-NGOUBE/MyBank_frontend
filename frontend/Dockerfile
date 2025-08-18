FROM node:22.18-alpine3.21

WORKDIR /front

COPY package.json /front

COPY . /front

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "container"]