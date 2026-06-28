Day 30 – Docker Images & Container Lifecycle

Task 1: Docker Images

1. Pull the nginx, ubuntu, and alpine images from Docker Hub
2. List all images on your machine — note the sizes
3. Compare ubuntu vs alpine — why is one much smaller?
4. Inspect an image — what information can you see?
5. Remove an image you no longer need

==>

1. docker pull nginx
   docker pull ubuntu
   docker pull alpine
   
2. docker image ls
   docker images
   
3. ubuntu includes full implementation of basic commands where alpine replaces almost all of them with BusyBox, a single lightweight binary that provides many Unix commands.
   Ubuntu uses 'glib' where alpine uses 'musl libc' which are simple, smaller, fast to compile.
   ubuntu install many preinstall packages where alpine almost remove everything which are not essential.
   Ubuntu inclueds documentation, metadata (man, help, documentation), where alpine not include most of these.

4. can see below : 
   ID, RepoTags, config : env, cmd, workingDir, RootFS : layers, Descriptor etc.

5. docker rmi <img_id/name>
   docker rmi -f <img_id/name>		--> Force remove an image
   docker system prune -a			--> Remove all unused images, containers, and networks
   docker image prune				--> Remove dangling/untagged images only
   
---------------------------------------------------------------------------------

Task 2: Image Layers

Run docker image history nginx — what do you see?
Each line is a layer. Note how some layers show sizes and some show 0B
Write in your notes: What are layers and why does Docker use them?

==>

Docker image history command shows how a Docker image was built by listing its layers. It contain layer creation time, instructions, size etc.
A layer is a read-only snapshot of the filesystem created by most Dockerfile instructions.
Docker use layers for :
	Faster build : Docker reuses the earlier layers and rebuilds only the changed layer
	Save disk space : If two images use the same base image, Docker stores that Ubuntu layer once on your machine and lets both images share it.
	Faster download : When pulling an updated image, Docker downloads only the layers you don't already have, reducing network usage.
	
-------------------------------------------------------------------------------------

Task 3: Container Lifecycle

Practice the full lifecycle on one container:

1. Create a container (without starting it)
2. Start the container
3. Pause it and check status
4. Unpause it
5. Stop it
6. Restart it
7. Kill it
8. Remove it
Check docker ps -a after each step — observe the state changes.

==>

1. docker create --name cntnr_lyfcycle nginx			--> status : created
2. docker start cntnr_lyfcycle							--> Status : UP
3. docker pause cntnr_lyfcycle							--> status : up (paused)
4. docker unpause cntnr_lyfcycle						--> Status : UP
5. docker stop cntnr_lyfcycle							--> status : exited
6. docker start cntnr_lyfcycle							--> Status : UP
7. docker kill cntnr_lyfcycle							--> Status : exited
8. docker rm cntnr_lyfcycle							    --> no container now.

------------------------------------------------------------------------------------

Task 4: Working with Running Containers

1. Run an Nginx container in detached mode
2. View its logs
3. View real-time logs (follow mode)
4. Exec into the container and look around the filesystem
5. Run a single command inside the container without entering it
6. Inspect the container — find its IP address, port mappings, and mounts

==> 

1. docker run -d --name Nginx -p 8080:80 nginx
2. docker log Nginx
3. docker log -f Nginx
4. docker exec -it Nginx bash
5. docker exec Nginx cat /etc/os-release
6. docker inspect Nginx

---------------------------------------------------------------------------------------

Task 5: Cleanup

1. Stop all running containers in one command
2. Remove all stopped containers in one command
3. Remove unused images
4. Check how much disk space Docker is using

==>

1. docker stop $(docker ps -q)
2. docker container prune -f
3. docker image prune -a
4. docker system df

------------------------------------------------------------------------------------------

Hints :

Image history: docker image history
Create without starting: docker create
Follow logs: docker logs -f
Inspect: docker inspect
Cleanup: docker system df, docker system prune

-------------------------------------------------------------------------------------------
