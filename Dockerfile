FROM node

LABEL author="raminghaderi77@gmail.com"

ENV PORT=3000

COPY . /var/www
WORKDIR /var/www

RUN npm install

EXPOSE $PORT

ENTRYPOINT [ "node", "app.js" ]