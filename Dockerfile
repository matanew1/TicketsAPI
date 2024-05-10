FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

# Add this line to start the built application
CMD [ "npm", "start" ]