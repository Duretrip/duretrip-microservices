# Use the official Node.js runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install
RUN npm install -g pm2

# Copy the rest of your application code to the container
COPY . .

# Use pm2 to start the application from package.json
CMD ["pm2-runtime", "npm", "--", "start"]
