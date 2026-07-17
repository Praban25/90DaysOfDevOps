# Docker Cheat Sheet

A quick reference for common Docker commands and Dockerfile instructions.

---

# 📦 Container Commands

| Command | Description |
|---------|-------------|
| `docker run -d --name app nginx` | Run a container in detached mode. |
| `docker ps` | List running containers. |
| `docker ps -a` | List all containers. |
| `docker stop <container>` | Stop a running container. |
| `docker rm <container>` | Remove a container. |
| `docker exec -it <container> bash` | Open an interactive shell inside a container. |
| `docker logs <container>` | View container logs. |

---

# 🖼️ Image Commands

| Command | Description |
|---------|-------------|
| `docker build -t myapp .` | Build an image from a Dockerfile. |
| `docker pull nginx` | Download an image from Docker Hub. |
| `docker push username/myapp` | Push an image to a registry. |
| `docker tag myapp username/myapp:v1` | Tag an image. |
| `docker images` | List local images. |
| `docker rmi <image>` | Remove an image. |

---

# 💾 Volume Commands

| Command | Description |
|---------|-------------|
| `docker volume create myvolume` | Create a volume. |
| `docker volume ls` | List volumes. |
| `docker volume inspect myvolume` | Show volume details. |
| `docker volume rm myvolume` | Remove a volume. |

---

# 🌐 Network Commands

| Command | Description |
|---------|-------------|
| `docker network create mynetwork` | Create a network. |
| `docker network ls` | List networks. |
| `docker network inspect mynetwork` | Show network details. |
| `docker network connect mynetwork <container>` | Connect a container to a network. |

---

# 🚀 Docker Compose Commands

| Command | Description |
|---------|-------------|
| `docker compose up -d` | Start services in the background. |
| `docker compose down` | Stop and remove services. |
| `docker compose ps` | List running services. |
| `docker compose logs` | View service logs. |
| `docker compose build` | Build service images. |

---

# 🧹 Cleanup Commands

| Command | Description |
|---------|-------------|
| `docker system prune` | Remove unused containers, images, and networks. |
| `docker system prune -a` | Remove all unused Docker resources. |
| `docker system df` | Show Docker disk usage. |

---

# 📝 Dockerfile Instructions

| Instruction | Description |
|------------|-------------|
| `FROM` | Set the base image. |
| `RUN` | Execute commands during image build. |
| `COPY` | Copy files into the image. |
| `WORKDIR` | Set the working directory. |
| `EXPOSE` | Document the container port. |
| `CMD` | Set the default command to run. |
| `ENTRYPOINT` | Set the main executable for the container. |

---

## 💡 Quick Tip

- Replace `<container>` and `<image>` with the actual container or image name/ID.
- Use `docker --help` or `docker <command> --help` to see all available options.
