Day 29 – Introduction to Docker

Task 1: What is Docker?

Research and write short notes on:

1. What is a container and why do we need them?
2. Containers vs Virtual Machines — what's the real difference?
3. What is the Docker architecture? (daemon, client, images, containers, registry)
4. Draw or describe the Docker architecture in your own words.

==>

1. Container is lightweight, self-contained shipping box for software. It Contain an application and everything it needs to run like code, runtime, system tools, libraries and settings in one neat package.
Because it bundle together, can shift it from one system to another and also it runs fine with other computing services.
	We need containers as before this we are using VM's for deploying , managing softwares. Which uses high resources, separate os, disk size etc.
Also moving software from one environment to another is a nightmare. 
	With introduction of container, resources are getting utilized properly, it takes what it needs only. Also it uses host machine OS kernal. It makes them lightwaight and allow them to startup in friction of seconds.

2. 	Containers : 
	Lightweighted because of share host OS and use host OS kernal.
	It uses exact amount of resources which need to run the app.
	Takes seconds of time to start up.
	It runs exactly same way on laptop, physical server or cloud network

	Virtual Machines :
	Heavy weight as it uses the guest os.
	Takes Minutes or so to boot up as entire os has to load.
	It locks the resources permanantly for per vm so it may be not get utilized.
	Moving vm across different cloud providers can require configuration changes.
	
3. Docker uses a client-server architecture. The Docker client talks to the Docker daemon, which does the heavy lifting of building, running, and distributing your Docker containers.
The client and daemon can run on the same system, or you can connect a Docker client to a remote Docker daemon. They communicate using a REST API over UNIX sockets or a network interface.

	* Docker Client : Client is the primary way to interact with Docker. When you type the command like docker run, client sent that command to the docker deamon (dockerd).
	to carry the operation.
	* Docker Deamon : The daemon (dockerd) is the background service running on your host operating system. It is the "brain" of Docker. It listens for Docker API requests 
	and manages Docker objects such as images, containers, networks, and volumes.
	* Docker images : Image is a read-only template with instructions for crating a docker container. For example it can contain ubuntu os with apache web server and your web app installed.
	* Docker Container : A container is a runnable instance of an image. You can create, start, stop, move, or delete a container using the Docker client or API.
	Containers are isolated from each other and from the host machine by default.
	* Docker Registry : Its a storage bank for Docker images. Docker Hub is a public registry that anyone can use, and Docker is configured to look for images there by default. You can also run your own private registry.
	When you use the docker pull or docker run commands, the daemon fetches the required image from the configured registry. When you use the docker push command, your image is uploaded to the registry.
	
4. When you type the command docker run -d -p 80:80 nginx, here is exactly what happens behind the scenes:
Client to Daemon: Your Docker Client processes the command and sends a request to the Docker Daemon.
Registry Check: The Daemon checks your local machine to see if you already have the nginx Image. If you don't, it reaches out to the Docker Registry (Docker Hub) to find and download (pull) it.
Container Creation: Once the Daemon has the image locally, it uses that template to spin up a new, isolated Container.
Execution: The daemon allocates a network interface, assigns an IP address, maps port 80, and starts your Nginx web server inside the container.

------------------------------------------------------------------------------------------

Task 2: Install Docker

Install Docker on your machine (or use a cloud instance)
Verify the installation
Run the hello-world container
Read the output carefully — it explains what just happened

==> 

We can install docker desktop for practise.
docker --version				--> Verify the installation.
docker run hello-world			--> To run the hello-world container.
After above command it search the image file locally and if not found then it pulls the image from docker hub. Then the docker container run and exited.
we can confirm by running "docker ps -a" command and check.

--------------------------------------------------------------------------------------------

Task 3: Run Real Containers

Run an Nginx container and access it in your browser
Run an Ubuntu container in interactive mode — explore it like a mini Linux machine
List all running containers
List all containers (including stopped ones)
Stop and remove a container

==>

docker run -d -p 8080:80 --name nginx-web-server nginx		--> -d (detached mode) in background, -p define port, -name (container name)

docker run -it --name ubuntu-test ubuntu bash			--> -it stand for interactive and TTY (keep terminal open), bash - shell where we can type commands.
docker ps 				--> to list all running containers
docker ps -a			--> to list all containers includding stopped one.
docker stop <docker_id>			--> To Stop the running container
docker rm <docker_id>			--> To Remove the container

----------------------------------------------------------------------------------------------

Task 4: Explore

Run a container in detached mode — what's different?
Give a container a custom name
Map a port from the container to your host
Check logs of a running container
Run a command inside a running container

==>
Detached mode: -d flag (run the container in background. we can check logs of that container by running "docker logs <cont_id>" command.
--name flag : use to give custom name to the container.
-p 8080:80 : -p flag to expose port. its "host_port:container_port" we can map.
docker logs <cont_id> : use to check that container logs.
docker exec <cont_id/name> command : to run command inside the container.

docker exec -it <cont_id/name> bash		--> To jumo inside the container.


++++

docker run, docker ps, docker stop, docker rm
Interactive mode: -it flag
Detached mode: -d flag
Port mapping: -p host:container
Naming: --name
Logs: docker logs
Exec into container: docker exec
