Day 36 – Docker Project: Dockerize a Full Application

Task 1: Pick Your App
Choose one of these (or use your own project):

A Python Flask/Django app with a database
A Node.js Express app with MongoDB
A static website served by Nginx with a backend API
Any app from your GitHub that doesn't have Docker yet
If you don't have an app, clone a simple open-source one and Dockerize it.

==>


A Node.js Express app with MongoDB


------------------------------------------------------------------------------------------------

Task 2: Write the Dockerfile

Create a Dockerfile for your application
Use a multi-stage build if applicable
Use a non-root user
Keep the image small — use alpine or slim base images
Add a .dockerignore file
Build and test it locally.

==> 

## Update Ubuntu
sudo apt update
sudo apt upgrade -y

## Install Node.js
### check first
node -v
npm -v

## Installation
sudo apt install nodejs npm -y

## create and move to express-app dir
mkdir express-app && cd express-app

## initialize
npm init -y

## install express-app
npm install express

## create index.js
const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello from Dockerized Express App!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

## Modify package.json - Replace the scripts section below
"scripts": {
  "start": "node index.js"
}

## dry run
npm start 

## browser
http://localhost:3000

## stop the server and create Dockerfile
# ---------- Stage 1 : Install Dependencies ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

# ---------- Stage 2 : Production Image ----------
FROM node:20-alpine

WORKDIR /app

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app .

USER appuser

EXPOSE 3000

CMD ["npm", "start"]

## create .dockerignore - To prevents unnecessary files from entering the Docker image.
node_modules
npm-debug.log
Dockerfile
.dockerignore
.git
.gitignore
README.md

## build image
docker build -t express-app .

## docker run container
docker run -d -p 3000:3000 --name express-container express-app

## test the app
curl http://localhost:3000

## To test the app is running as non-root user
docker exec -it express-container sh
whoami

(is should be "appuser")

----------------------------------------------------------------------------------------------

Task 3: Add Docker Compose

Write a docker-compose.yml that includes:

Your app service (built from Dockerfile)
A database service (Postgres, MySQL, MongoDB — whatever your app needs)
Volumes for database persistence
A custom network
Environment variables for configuration (use .env file)
Healthchecks on the database
Run docker compose up and verify everything works together.

==>

## Choosing mongodb & Install MongoDB Driver
npm install mongodb

## update index.js
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGO_URI;

const client = new MongoClient(MONGO_URI);

async function startServer() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        app.get("/", (req, res) => {
            res.send("Express App Connected to MongoDB using Docker Compose!");
        });

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error(err);
    }
}

startServer();

## create .env file
PORT=3000

MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password123

MONGO_URI=mongodb://admin:password123@mongodb:27017/?authSource=admin

## create docker-compose.yml
version: "3.9"

services:
  app:
    build: .
    container_name: express-app

    ports:
      - "3000:3000"

    env_file:
      - .env

    depends_on:
      mongodb:
        condition: service_healthy

    networks:
      - app-network

  mongodb:
    image: mongo:7

    container_name: mongodb

    restart: unless-stopped

    env_file:
      - .env

    ports:
      - "27017:27017"

    volumes:
      - mongo-data:/data/db

    networks:
      - app-network

    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 20s

volumes:
  mongo-data:

networks:
  app-network:
    driver: bridge
	
## Build the Containers
docker compose build

## start the app
docker compose up -d

## verify logs
docker compose logs app

## MongoDB logs
docker compose logs mongodb

## test the app
curl http://localhost:3000

------------------------------------------------------------------------------------------------------

Task 4: Ship It

Tag your app image
Push it to Docker Hub
Share the Docker Hub link
Write a README.md in your project with:
What the app does
How to run it with Docker Compose
Any environment variables needed

==>

## tag and push the image to docker hub
docker tag express-app-app prabankini2026udaan/express-app:v1
docker push prabankini2026udaan/express-app:v1

## docker hub link
https://hub.docker.com/repository/docker/prabankini2026udaan/express-app/general

## repo link
https://github.com/Praban25/90DaysOfDevOps/tree/master/2026/day-36

--------------------------------------------------------------------------------------------------------

Task 5: Test the Whole Flow

Remove all local images and containers
Pull from Docker Hub and run using only your compose file
Does it work fresh? If not — fix it until it does

==>

#cheked by removing containers, images, volumes, network locally. Pulled image from docker hub, update docker-compose with image : dockerhub_img and by 
running docker compose up -d  --> It works fine as expected.

--------------------------------------------------------------------------------------------------------
