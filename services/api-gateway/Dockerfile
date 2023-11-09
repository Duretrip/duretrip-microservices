# Use the official Node.js runtime as a parent image
FROM node:latest

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

# Command to run the application (adjust as needed)
CMD ["sh", "-c", "npm run migrate && npm run seed && npm run start:dev"]
# CMD ["sh", "-c", "npx nest --version && tsc -v"]
# CMD ["npm", "start"]
