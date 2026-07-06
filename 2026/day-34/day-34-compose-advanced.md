Day 34 – Docker Compose: Real-World Multi-Container Apps

Task 1: Build Your Own App Stack

Create a docker-compose.yml for a 3-service stack:

A web app (use Python Flask, Node.js, or any language you know)
A database (Postgres or MySQL)
A cache (Redis)
Write a simple Dockerfile for the web app. The app doesn't need to be complex — even a "Hello World" that connects to the database is enough.

==>

sudo apt update
sudo apt upgrade -y

# created below folders & files
my-app-stack/
│
├── .env
├── docker-compose.yml
│
└── app/
    ├── app.py
    ├── requirements.txt
    └── Dockerfile

vi app.py

from flask import Flask
import psycopg2
import redis
import os

app = Flask(__name__)

@app.route("/")
def home():

    # PostgreSQL Connection
    try:
        conn = psycopg2.connect(
            host=os.getenv("DB_HOST"),
            database=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            port=os.getenv("DB_PORT")
        )

        cursor = conn.cursor()
        cursor.execute("SELECT version();")
        version = cursor.fetchone()[0]

        cursor.close()
        conn.close()

        db_status = "Connected Successfully"
        db_info = version

    except Exception as e:
        db_status = "Connection Failed"
        db_info = str(e)

    # Redis Connection
    try:
        r = redis.Redis(
            host=os.getenv("REDIS_HOST"),
            port=int(os.getenv("REDIS_PORT"))
        )

        r.set("message", "Hello Redis!")
        cache_msg = r.get("message").decode()

    except Exception as e:
        cache_msg = str(e)

    return f"""
    <h1>Docker Compose Demo</h1>

    <h2>Flask Web App Running Successfully 🚀</h2>

    <h3>Database</h3>
    <p>{db_status}</p>
    <p>{db_info}</p>

    <h3>Redis Cache</h3>
    <p>{cache_msg}</p>
    """

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
	
++++

vi Dockerfile

# base image
FROM python:3.12-slim

WORKDIR /app

# requirements
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# copy code
COPY . .

# port
EXPOSE 5000

# command
CMD ["python", "app.py"]

++++

vi requirements.txt

Flask
psycopg2-binary
redis

++++

vi .env

# PostgreSQL
DB_HOST=db
DB_NAME=mydb
DB_USER=postgres
DB_PASSWORD=password
DB_PORT=5432

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

++++

vi docker-compose.yml

version: "3.9"

services:

  web:
    build: ./app
    container_name: flask_app

    ports:
      - "5000:5000"

    env_file:
      - .env

    depends_on:
      - db
      - redis

  db:
    image: postgres:16
    container_name: postgres_db

    env_file:
      - .env

    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}

    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    container_name: redis_cache

    env_file:
      - .env

volumes:
  postgres_data:
  
++++

tree
docker compose build
docker compoes up -d

docker ps
docker compose logs

# on browser :
http://localhost:5000/

It works... 

-----------------------------------------------------------------------------------------------

Task 2: depends_on & Healthchecks

Add depends_on to your compose file so the app starts after the database
Add a healthcheck on the database service
Use depends_on with condition: service_healthy so the app waits for the database to be truly ready, not just started
Test: Bring everything down and up — does the app wait for the DB?

==>
# updated docker-compose.yml
services :

    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started

db:
		  
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $$POSTGRES_USER -d $$POSTGRES_DB"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s
	  

docker compose down
docker compose up -d

# while creating containers it shows Healthy status for DB first as per our requirements and health checks and then create other redis and flask_app containers.

docker events 				--> shows continuous health checks for DB

-------------------------------------------------------------------------------------------------

Task 3: Restart Policies

Add restart: always to your database service
1. Manually kill the database container — does it come back?
Try restart: on-failure — how is it different?
2. Write in your notes: When would you use each restart policy?

==>

1. As check by killing the container with restart: always, container not coming back. 
# need to run below command to get the container back
docker compose up -d

# It only restarts containers that still exist but are stopped/crashed

2. Restart only when the application exits with an error (non-zero exit code). Best for worker processes or jobs that should retry only after a crash.


--------------------------------------------------------------------------------------------------

Task 4: Custom Dockerfiles in Compose

Instead of using a pre-built image for your app, use build: in your compose file to build from a Dockerfile
Make a code change in your app
Rebuild and restart with one command

==> 

Yes, in docker compose file we are using build to build from Dockerfile.
  web:
    build: ./app
    container_name: flask_app
	
---------------------------------------------------------------------------------------------------

Task 5: Named Networks & Volumes

Define explicit networks in your compose file instead of relying on the default
Define named volumes for database data
Add labels to your services for better organization

==> 

# named vloumes:

volumes:
  postgres_data:
  
volumes:
  - postgres_data:/var/lib/postgresql/data
  
# network and labels :

    networks:
      - app_network

    labels:
	# for flask app
      com.example.project: "flask-app"
      com.example.service: "web"
	  
	# DB  
	  com.example.service: "database"
	
	# redis
	  com.example.service: "cache"
	  
# it created "my-app-stack_app_network   bridge" network as required.

-------------------------------------------------------------------------------------------------

Task 6: Scaling (Bonus)

Try scaling your web app to 3 replicas using docker compose up --scale
What happens? What breaks?
Write in your notes: Why doesn't simple scaling work with port mapping?

==> 
# tried to scale the web app container
docker compose up --scale web=3

# commented the "container_name"
# Error : Error response from daemon: failed to set up container networking: driver failed programming external connectivity on endpoint my-app-stack-web-2 
(bce6c9782fc57af6d4de0523e8bd7577cc43fa2bad0e735a9b8147d44ecb6c06): Bind for 0.0.0.0:5000 failed: port is already allocated

# my-app-stack-web-1 created successfully but other 2 didnt.

#Docker Compose can create multiple replicas of a service, but if each replica publishes the same host port (for example, 5000:5000), only one container 
can bind to that host port. Since a host port can only be used by one process at a time, the additional replicas fail to start due to a port conflict.

# In production, this is solved by placing a load balancer or reverse proxy (such as Nginx, Traefik, or HAProxy) in front of the application containers. 
The load balancer exposes a single host port and distributes incoming requests across multiple replicas over Docker's internal network.

----------------------------------------------------------------------------------------------------
