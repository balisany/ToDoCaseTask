FROM node:16.18.0 AS build-node
WORKDIR /ToDoCaseTask

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

EXPOSE 5173

# Start your React app
CMD ["npm", "run", "dev"]