Day 32 – Docker Volumes & Networking

Task 1: The Problem

Run a Postgres or MySQL container
Create some data inside it (a table, a few rows — anything)
Stop and remove the container
Run a new one — is your data still there?
Write what happened and why.

==>
#run postgres container:
docker run -d \
  --name postgres-demo \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin123 \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  postgres:latest
  
#connect postgres db:
docker exec -it postgres-demo psql -U admin -d mydb

#Create table and insert data:
CREATE TABLE ishwar (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

INSERT INTO ishwar (name)
VALUES
('Bramha'),
('Vishnu'),
('Mahesh');

SELECT * FROM ishwar;

docker stop postgres-demo				--> To stop the container
docker rm postgres-demo					--> To remove container

#Repeat *run postgres container: & connect postgres db:
SELECT * FROM ishwar;					--> To check the data

SELECT * FROM ishwar;

No data is available now. "docker rm" commdn removed the container's writable filesystem. Since no Docker volume was attached, 
all database files stored inside the container were deleted.

Hint : Official PostgreSQL image stores its data in: /var/lib/postgresql/data

-------------------------------------------------------------------------------------------

Task 2: Named Volumes

Create a named volume
Run the same database container, but this time attach the volume to it
Add some data, stop and remove the container
Run a brand new container with the same volume
Is the data still there?
Verify: docker volume ls, docker volume inspect

==> 

#run postgres container:
docker run -d \
  --name postgres-demo \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin123 \
  -e POSTGRES_DB=mydb \
  -v pgdbdata:/var/lib/postgresql \
  -p 5432:5432 \
  postgres:latest
  
#Create table and insert data:    --> run it again to create db table. refer Task 1  
  
SELECT * FROM ishwar;

docker stop postgres-demo
docker rm postgres-demo

repeate - #run postgres container:

docker exec -it postgres-demo psql -U admin -d mydb			--> to connect again

SELECT * FROM ishwar;				--> to verify the data.


Findings :
Error: in 18+, these Docker images are configured to store database data in a
       format which is compatible with "pg_ctlcluster" (specifically, using
       major-version-specific directory names).  This better reflects how
       PostgreSQL itself works, and how upgrades are to be performed.
	   
	Hence use -v pgdbdata:/var/lib/postgresql which then runs docker properly
	
-----------------------------------------------------------------------------------------

Task 3: Bind Mounts

Create a folder on your host machine with an index.html file
Run an Nginx container and bind mount your folder to the Nginx web directory
Access the page in your browser
Edit the index.html on your host — refresh the browser
Write in your notes: What is the difference between a named volume and a bind mount?

==>

mkdir ngx-bind				--> create new folder and jump into it.
vi index.html				--> Create and update random html file.

#create docker container
docker run -d \
> --name ngx-bind \
> -p 8001:80 \
> -v $(pwd):/usr/share/nginx/html/ \
> nginx:latest

browser : http://localhost:8001/

now change something to the index.html and refresh the browser. We can see the changes getting loaded in browser.

docker inspect ngx-bind				--> To inspect docker container
docker exec -it ngx-bind cat /usr/share/nginx/html/index.html			--> index.html file check from container

Difference:
Named Volume													Bind Mount
Managed by Docker												Managed by you
Stored in Docker's internal volume directory					Stored in a folder you choose
Best for databases and persistent application data				Best for source code, static files, and configuration during development
Harder to edit directly											Easy to edit with any editor

#Named volumes are managed by Docker and are ideal for persistent data like databases.
#Bind mounts connect a specific host directory to a container, making them ideal for development because file changes on the host are reflected 
immediately inside the container.

--------------------------------------------------------------------------------------------

Task 4: Docker Networking Basics

1. List all Docker networks on your machine
2. Inspect the default bridge network
3. Run two containers on the default bridge — can they ping each other by name?
4. Run two containers on the default bridge — can they ping each other by IP?

==>

1. docker network ls					--> List all docker networks
2. docker network inspect bridge		--> Inspect bridge network
3. 2 containers on default bridge can not ping each other by name as checked.
4. 2 containers on default bridge can ping each other by IP address as checked. 

Notes :
The default bridge network does not include Docker's embedded DNS service. Automatic container name resolution is available only on user-defined 
bridge networks. On the default bridge, containers can still communicate directly using their IP addresses.

--------------------------------------------------------------------------------------------

Task 5: Custom Networks

1. Create a custom bridge network called my-app-net
2. Run two containers on my-app-net
3. Can they ping each other by name now?
Write in your notes: Why does custom networking allow name-based communication but the default bridge doesn't?

==>

1. docker network create my-app-net			--> to create custom network
2. docker run -dit --name dkr1 --network my-app-net ubuntu:latest bash
   docker run -dit --name dkr2 --network my-app-net ubuntu:latest bash

docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Networks}}"		--> shows container id - name - network

# jump inside the container.
docker exec -it dkr1 bash
   
# install ping utility in containers.
apt install -y iputils-ping

3. ping dkr2			--> to check if docker container can ping with name. 
 
Notes : 
A user-defined bridge network (such as my-app-net) includes Docker's built-in DNS server. This automatically resolves container names to their IP 
addresses, allowing containers on the same custom network to communicate using names like dkr1 and dkr2 instead of IP addresses.

-----------------------------------------------------------------------------------------------

Task 6: Put It Together

Create a custom network
Run a database container (MySQL/Postgres) on that network with a volume for data
Run an app container (use any image) on the same network
Verify the app container can reach the database by container name

==>

#Used already created custom network "my-app-net"

#created db container Postgres on custom network "my-app-net" with volume
docker run -d \
  --name pgdb \
  --network my-app-net
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin123 \
  -e POSTGRES_DB=mydb \
  -v pgdbdata:/var/lib/postgresql \
  -p 5431:5431 \
  postgres:latest
  
#used same container as dkr1

#jump inside the container
docker exec -it dkr1 bash

#ping pgdb from dkr1 container
ping pgdb

It works.

------------------------------------------------------------------------------------------ 
