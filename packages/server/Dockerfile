FROM node:16
WORKDIR /usr/src/tracker-api
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 3001
CMD npm start