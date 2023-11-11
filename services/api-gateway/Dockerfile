FROM node:18.18.2-alpine

RUN apk add --no-cache bash
RUN npm i -g @nestjs/cli typescript ts-node

COPY ./wait-for-it.sh /opt/wait-for-it.sh
RUN chmod +x /opt/wait-for-it.sh
COPY ./startup.docker.sh /opt/startup.docker.sh
RUN chmod +x /opt/startup.docker.sh
RUN sed -i 's/\r//g' /opt/wait-for-it.sh
RUN sed -i 's/\r//g' /opt/startup.docker.sh

# Set the working directory in the container
WORKDIR /app

# RUN  npm install -g typescript@latest
# RUN npm install -g @nestjs/cli

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your application code to the containernpm 
COPY . .

CMD ["/opt/startup.docker.sh"]

