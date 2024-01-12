# Our Node base image
FROM node:20.10

# Set the Node environment to development to ensure all packages are installed
ENV NODE_ENV development

# Change our current working directory
WORKDIR /usr/src/app

# Copy over `package.json` and lock files to optimize the build process
COPY ["package.json", "./"]
# Install Node modules
RUN yarn install
# Copy over rest of the project files
COPY . .

RUN yarn build
