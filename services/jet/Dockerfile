# Use the official Node.js runtime as a parent image
# FROM node:latest
FROM node:18-alpine3.16

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
CMD ["sh", "-c", "npm run prisma:generate:client && npm run migrate && npm run start"]
# CMD ["sh", "-c", "npx nest --version && tsc -v"]
# CMD ["npm", "start"]
