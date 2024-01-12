# Our Node base image
FROM node:20.10

# Set the Node environment to development to ensure all packages are installed
ENV NODE_ENV production

# Change our current working directory
WORKDIR /usr/src/app

# Copy over `package.json` and lock files to optimize the build process
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# Copy over rest of the project files
COPY . .
# Install Node modules
RUN yarn install

RUN yarn build
