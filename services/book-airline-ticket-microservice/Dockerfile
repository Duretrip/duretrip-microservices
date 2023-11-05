# Use the official Node.js runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the application port (adjust to your app's needs)
EXPOSE 2001

# Command to run the application (adjust as needed)
CMD ["npm", "start"]
