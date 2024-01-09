# Use an official Node.js runtime as a base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the necessary ports for React Native and Metro Bundler
EXPOSE 8081
EXPOSE 19000
EXPOSE 19001

# Command to start Metro Bundler
CMD ["npx", "react-native", "start", "--reset-cache"]

# Optionally, you can use the following command to run the react-native app on Android
# CMD ["npx", "react-native", "run-android"]
