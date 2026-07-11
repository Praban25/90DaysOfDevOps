# Express Docker App

## Overview

This is a simple Node.js Express application that connects to a MongoDB database using Docker Compose.

The application demonstrates:

- Node.js Express
- MongoDB
- Docker
- Docker Compose
- Multi-stage Docker builds
- Non-root Docker user
- Persistent MongoDB storage
- Custom Docker network
- Environment variable configuration

---

## Project Structure

```
express-docker-app/
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env
├── index.js
├── package.json
└── README.md
```

---

## Prerequisites

- Docker Desktop
- Docker Compose

---

## Build and Run

Clone the repository:

```bash
git clone https://github.com/Praban25/90DaysOfDevOps/tree/master/2026/day-36
cd express-docker-app
```

Build the containers:

```bash
docker compose build
```

Start the application:

```bash
docker compose up -d
```

---

## Verify

Open:

```
http://localhost:3000
```

Expected response:

```
Express App Connected to MongoDB using Docker Compose!
```

---

## Stop

```bash
docker compose down
```

Remove containers and volumes:

```bash
docker compose down -v
```

---

## Environment Variables

Create a `.env` file with:

```env
PORT=3000

MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password123

MONGO_URI=mongodb://admin:password123@mongodb:27017/?authSource=admin
```

---

## Docker Hub

Replace this with your repository:

```
https://hub.docker.com/repository/docker/prabankini2026udaan/express-app/general
```
