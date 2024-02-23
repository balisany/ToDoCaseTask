FROM node:16.18.0
WORKDIR /ToDoCaseTask
ENV PATH /ToDoCaseTask/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
COPY . ./
CMD ["npm", "start"]