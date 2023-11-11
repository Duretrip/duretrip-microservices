FROM node:18.18.2-alpine

RUN apk add --no-cache bash
RUN npm i -g @nestjs/cli typescript ts-node

COPY package*.json /tmp/app/
RUN cd /tmp/app && npm install

COPY . /usr/src/app
RUN cp -a /tmp/app/node_modules /usr/src/app
COPY ./wait-for-it.sh /opt/wait-for-it.sh
RUN chmod +x /opt/wait-for-it.sh
COPY ./startup.docker.sh /opt/startup.docker.sh
RUN chmod +x /opt/startup.docker.sh
RUN sed -i 's/\r//g' /opt/wait-for-it.sh
RUN sed -i 's/\r//g' /opt/startup.docker.sh

WORKDIR /usr/src/app
# RUN if [ ! -f .env.docker ]; then cp env-example .env.docker; fi
RUN npm run build

CMD ["/opt/startup.docker.sh"]
# CMD ["npm", "run", "start:prod"]