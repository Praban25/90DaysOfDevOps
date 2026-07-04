
Day 33 – Docker Compose: Multi-Container Basics

Task 1: Install & Verify

Check if Docker Compose is available on your machine
Verify the version 

==>

# To check docker compose is available or not
docker compose version

# To install docker compose on linux
sudo apt install docker-compose-plugin

# To run docker without sudo
sudo usermod -aG docker $USER

-----------------------------------------------------------------------------------

Task 2: Your First Compose File

1. Create a folder compose-basics
2. Write a docker-compose.yml that runs a single Nginx container with port mapping
3. Start it with docker compose up
4. Access it in your browser
5. Stop it with docker compose down

==>

1. mkdir compose-basics
   cd compose-basics
	
2. vi docker-compose.yml

services:
  nginx:
    image: nginx:latest
    container_name: my-nginx
    ports:
      - "8082:80"

3. docker compose up

4. http://localhost:8082/

5. docker compose down				--> it will remove the docker container & network

Some useful commands :
docker logs <container_name or id>			--> View all historical logs
docker logs -f <container_name_or_id>		--> Realtime logs
docker logs -t <container_name_or_id>		--> Include timestamps for entry mapping
docker logs <container_name_or_id> 2>&1 | grep -i "error"			--> Search for errors

docker events								--> Stream all real-time events
docker events --filter container=<container_name_or_id>				--> Filter events for a specific container
docker events --since "1h"					--> View past events within a specific timeframe

docker inspect <container_name_or_id>		--> Inspect low-level metadata (IP addresses, mounts, status)
docker inspect <container_name_or_id> --format='{{.State.ExitCode}}'		--> Check the exact exit code of a stopped container
docker stats								--> Monitor real-time CPU, memory, and network usage

--------------------------------------------------------------------------------------------

Task 3: Two-Container Setup

Write a docker-compose.yml that runs:

A WordPress container
A MySQL container
They should:

Be on the same network (Compose does this automatically)
MySQL should have a named volume for data persistence
WordPress should connect to MySQL using the service name
Start it, access WordPress in your browser, and set it up.

Verify: Stop and restart with docker compose down and docker compose up — is your WordPress data still there?

==> 

Create and jump into "wordpress-compose" folder

vi docker-compose.yml

services:
  db:
    image: mysql:8.0
    container_name: wordpress-db
    restart: always
    environment:
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wpuser
      MYSQL_PASSWORD: wppassword
      MYSQL_ROOT_PASSWORD: rootpassword
    volumes:
      - db_data:/var/lib/mysql


  wordpress:
    image: wordpress:latest
    container_name: wordpress_app
    restart: always
    ports:
      - "8084:80"
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_NAME: wordpress
      WORDPRESS_DB_USER: wpuser
      WORDPRESS_DB_PASSWORD: wppassword
    depends_on:
      - db

volumes:
  db_data:

# Validate configuration
docker compose config

# Start services
docker compose up -d

docker ps
docker volume ls
docker network ls

# Open in browser
http://localhost:8084

Have created wordpress login - created test post & publish it - created new user as "Test user"

docker compose down

docker compose up -d

# Have re-created the docker containers and verified the data, post and users are remain as is. 

# useful commands:
docker compose logs
docker compose logs wordpress
docker compose logs db
docker compose logs -f

--------------------------------------------------------------------------------------------------------

Task 4: Compose Commands

Practice and document these:

1. Start services in detached mode
2. View running services
3. View logs of all services
4. View logs of a specific service
5. Stop services without removing
6. Remove everything (containers, networks)
7. Rebuild images if you make a change

==>

1. docker compose up -data
2. docker compose ps 
   docker ps
3. docker compose logs
   docker compose logs -f
4. docker compose logs wordpress
   docker compose logs db
5. docker compose stop
6. docker compose down
   docker compose down -v
7. docker compose up --build -d

# Command summary:
Task																Command
Start services in background										docker compose up -d
View running services												docker compose ps
View all running containers											docker ps
View logs (all services)											docker compose logs
Follow logs															docker compose logs -f
View WordPress logs													docker compose logs wordpress
View MySQL logs														docker compose logs db
Follow WordPress logs												docker compose logs -f wordpress
Stop services (keep containers)										docker compose stop
Restart stopped services											docker compose start
Remove containers and network										docker compose down
Remove containers, network, and volumes								docker compose down -v
Rebuild images and start											docker compose up --build -d
Rebuild without cache												docker compose build --no-cache

-----------------------------------------------------------------------------------------

Task 5: Environment Variables

Add environment variables directly in your docker-compose.yml
Create a .env file and reference variables from it in your compose file
Verify the variables are being picked up

==>

Direct env variables we have tested in Task4

Now have created .env file and copy the variables there from docker-compose.yml file
Edited docker-compose.yml as below:

      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
	  
	  WORDPRESS_DB_HOST: ${WORDPRESS_DB_HOST}
      WORDPRESS_DB_NAME: ${WORDPRESS_DB_NAME}
      WORDPRESS_DB_USER: ${WORDPRESS_DB_USER}
      WORDPRESS_DB_PASSWORD: ${WORDPRESS_DB_PASSWORD}
	  
Both DB and APP environment variables has been modified 

docker compose up -d

It works as expected.

docker exec wordpress-db env		--> To verify variables of db container
docker exec wordpress-app env		--> To verify variables of app container

---------------------------------------------------------------------------------------------
	  
   





