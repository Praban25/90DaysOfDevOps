
Day 37 – Docker Revision

# Self-Assessment Checklist
## Mark yourself honestly — can do (d), shaky(s), or haven't done(vnt):

 Run a container from Docker Hub (interactive + detached)				--> d
 List, stop, remove containers and images								--> d
 Explain image layers and how caching works								--> s
 Write a Dockerfile from scratch with FROM, RUN, COPY, WORKDIR, CMD		--> s
 Explain CMD vs ENTRYPOINT												--> s
 Build and tag a custom image											--> d
 Create and use named volumes											--> s
 Use bind mounts														--> s
 Create custom networks and connect containers							--> d
 Write a docker-compose.yml for a multi-container app					--> s
 Use environment variables and .env files in Compose					--> d
 Write a multi-stage Dockerfile											--> s
 Push an image to Docker Hub											--> d
 Use healthchecks and depends_on										--> d
 
 --------------------------------------------------------------------------

# Quick-Fire Questions
## Answer from memory, then verify:

1. What is the difference between an image and a container?
2. What happens to data inside a container when you remove it?
3. How do two containers on the same custom network communicate?
4. What does docker compose down -v do differently from docker compose down?
5. Why are multi-stage builds useful?
6. What is the difference between COPY and ADD?
7. What does -p 8080:80 mean?
8. How do you check how much disk space Docker is using?

==>

1.
A Docker image is a read-only template or blueprint created from a Dockerfile. It contains the application, its dependencies, libraries, and 
configuration required to run the application. Images are built in layers, which helps optimize storage and build time.

A Docker container is a running instance of a Docker image. It provides an isolated environment where the application actually executes. Multiple 
containers can be created from the same image, and each container has its own writable layer while sharing the underlying image.

2. When a Docker container is removed, all the data stored in its writable layer is also deleted. If you want the data to persist even after the 
container is removed, you should use a Docker volume or a bind mount. These store the data outside the container, allowing it to be reused by new containers.

3. Containers on the same custom network communicate using their container names because Docker's built-in DNS automatically resolves the names to IP addresses.

4. docker compose down stops and removes the containers, along with the networks created by Docker Compose. However, it keeps the volumes, so the 
application data is preserved.

docker compose down -v does everything that docker compose down does, but it also removes the Docker volumes associated with the Compose project. 
As a result, any data stored in those volumes is permanently deleted.

5. Multi-stage builds allow us to use multiple stages in a Dockerfile. The first stage is used to build or compile the application, and the final stage 
copies only the required application artifacts into a clean runtime image. This removes unnecessary build tools, dependencies, and temporary files, 
resulting in a smaller, more secure, and optimized Docker image that is faster to pull and deploy.

6. Use COPY by default. Use ADD only when you need automatic extraction of local archives or its other special features. This follows Docker best practices 
and makes the Dockerfile easier to understand.

7. -p 8080:80 maps host port 8080 to container port 80, allowing access to the containerized application through the host.

8. To check how much disk space Docker is using, use the docker system df command. It displays the disk usage of Docker images, containers, local volumes, 
and the build cache.

----------------------------------------------------------------------------------------
