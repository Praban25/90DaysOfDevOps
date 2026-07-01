Day 31 – Dockerfile: Build Your Own Images

Task 1: Your First Dockerfile

Create a folder called my-first-image
Inside it, create a Dockerfile that:
Uses ubuntu as the base image
Installs curl
Sets a default command to print "Hello from my custom image!"
Build the image and tag it my-ubuntu:v1
Run a container from your image
Verify: The message prints on docker run

==>

sudo mkdir my-first-image
vi Dockerfile

#base image
FROM ubuntu:latest

#update packge and install curl
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

#command
CMD ["echo", "Hello Everyone, from my custom image!"]

Small catch which i get while building the image is "Temporary failure resolving 'security.ubuntu.com'"
Have created /etc/docker/daemon.json file and updated below dns entry as above error due to DNS resolution was failing.

{
  "dns": ["8.8.8.8", "1.1.1.1"]
}

sudo docker build -t my-ubuntu:v1 .

sudo docker run my-ubuntu:v1

It prints : "Hello Everyone, from my custom image!"

-----------------------------------------------------------------------------------

Task 2: Dockerfile Instructions

Create a new Dockerfile that uses all of these instructions:

FROM — base image
RUN — execute commands during build
COPY — copy files from host to image
WORKDIR — set working directory
EXPOSE — document the port
CMD — default command
Build and run it. Understand what each line does.

==>

sudo mkdir docker-demo

sudo vi Dockerfile

#base image
FROM python:3.12-slim

#set working dir
WORKDIR /app

#copy files from host to imag
COPY . .

#run echo command while building image
RUN echo "Docker image successfully build..!!"

#expose container port
EXPOSE 8000

#default command
CMD ["python", "-m", "http.server", "8000"]

++++

sudo vi index.html

<!DOCTYPE html>
<html>
<head>
    <title>Docker Demo From Docker</title>
</head>
<body>
    <h1>Hello from Docker! Practising Dockerfile</h1>
</body>
</html>

sudo docker build -t docker-demo:v1
sudo docker run -p 8000:8000 docker-demo:v1

In Browser : http://localhost:8000

(In above project we created index.html and Dockerfile. Taking base image python:3.12-slim, build container, exposing port 8000 and the last
command launches Python's built-in web server on port 8000.)

-------------------------------------------------------------------------------------

Task 3: CMD vs ENTRYPOINT

1. Create an image with CMD ["echo", "hello"] — run it, then run it with a custom command. What happens?
2. Create an image with ENTRYPOINT ["echo"] — run it, then run it with additional arguments. What happens?
Write in your notes: When would you use CMD vs ENTRYPOINT?

==>

1. Create new folder and jump in that folder.
sudo vi Dockerfile

#base image
FROM ubuntu:22.04

#command
CMD ["echo", "hello Docker"]

docker build -t cmd-demo:latest
docker run cmd-demo:latest

It prompts "hello Docker" and exited.

docker run cmd:latest cat /etc/os-release		--> docker replace default CMD command and shows os-release details
docker run cmd:latest date						--> docker replace default CMD command and shows date

Notes : CMD provides a default command but if you specify another command when running the container, Docker replaces the CMD.

++++

2. Create new folder and jump into that.
sudo vi Dockerfile

#base image
FROM ubuntu:22.04

#command
ENTRYPOINT ["echo"]

docker build -t entrypoint:latest
docker run entrypoint:latest

It prompts (blank) and exited.

docker run entrypoint:latest cat /etc/os-release		--> docker replace default CMD command and prompts cat /etc/os-release
docker run entrypoint:latest date						--> docker replace default CMD command and promts date

Notes : With ENTRYPOINT, Docker does not replace the command. Instead, it appends anything you type after the image name as an arguments.


3. Use ENTRYPOINT when the container must always run that exact command. Users cannot easily bypass it.
   Use CMD when you want to provide a default action that users can easily change or override when running the container

--------------------------------------------------------------------------------------------

Task 4: Build a Simple Web App Image

Create a small static HTML file (index.html) with any content
Write a Dockerfile that:
Uses nginx:alpine as base
Copies your index.html to the Nginx web directory
Build and tag it my-website:v1
Run it with port mapping and access it in your browser

==>

Create new folder and jump into that.

vi Dockerfile

#base image
FROM nginx:alpine

#copy index.html to nginix web directory
COPY index.html /usr/share/nginx/html/

#expose nginx port
EXPOSE 80


vi index.html

<!DOCTYPE html>
<html>
<head>
    <title>My First Docker Website</title>
</head>
<body>
    <h1>🚀 Welcome to My Docker Website!</h1>
    <p>This website is running inside an Nginx Docker container.</p>

    <h2>Learning Docker is fun! 🎉</h2>
</body>
</html>

docker build -t nginx-alp:latest
docker run -d -p 8000:80 --name myweb nginx-alp:latest

---------------------------------------------------------------------------------------

Task 5: .dockerignore

Create a .dockerignore file in one of your project folders
Add entries for: node_modules, .git, *.md, .env
Build the image — verify that ignored files are not included

==>

Have added below folder and files in task 4 folder
.git
.env
README.md
node_modules/

vi .dockerignore

node_modules
.git
*.md

docker build -t nginx-alp:v1

While building image can see "=> transferring context: " which indication that the ignored files were excluded.

++++

vi Dockerfile

#base image
FROM nginx:alpine

#copy index.html to nginix web directory
COPY . /usr/share/nginx/html/

#expose nginx port
EXPOSE 80

docker build -t nginx-alp:v2
docker run -d -p 8081:80 --name new-web nginx-alp:v2
docker exec -it new-web sh
cd /usr/share/nginx/html
ls -la

can see due to .dockerignore file docker exclude those files, folders while building the image.

------------------------------------------------------------------------------------------------

Task 6: Build Optimization

1. Build an image, then change one line and rebuild — notice how Docker uses cache
2. Reorder your Dockerfile so that frequently changing lines come last
3. Write in your notes: Why does layer order matter for build speed?

==>

1. After the first build, Docker uses cached layers for unchanged instructions and rebuilds only the changed layer and the layers after it. This makes builds much faster.

2. Frequently changing instructions should be placed last so Docker can reuse cached layers for the earlier unchanged instructions, which speeds up the build process. 

3. Docker builds images one instruction at a time, creating a cacheable layer for each instruction. When a layer changes, Docker must rebuild 
that layer and every layer after it. Placing stable instructions (such as installing packages) before frequently changing instructions (such as 
copying application code) allows Docker to reuse more cached layers, resulting in significantly faster rebuilds.

------------------------------------------------------------------------------------------------
