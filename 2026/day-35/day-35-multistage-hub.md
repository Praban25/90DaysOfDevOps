
Day 35 – Multi-Stage Builds & Docker Hub

Task 1: The Problem with Large Images

Write a simple Go, Java, or Node.js app (even a "Hello World" is fine)
Create a Dockerfile that builds and runs it in a single stage
Build the image and check its size
Note down the size — you'll compare it later.

==>


mkdir hello-go
cd hello-go

# create main.go
vi main.go

package main

import "fmt"

func main() {
    fmt.Println("Hello, Docker.. with go...!")
}

# initialize go module which creates go.mod file
go mod init hello-go

# created docker file
FROM golang:1.24

WORKDIR /app

COPY . .

RUN go build -o hello

CMD ["./hello"]

# build docker image
docker build -t hello-go .

# run docker container.
docker run hello-go

# output
Hello, Docker.. with go...!

docker images				--> to check the image size, label etc

IMAGE                     ID             DISK USAGE   CONTENT SIZE
hello-go:latest           46d82f4bf2a8       1.36GB          333MB

----------------------------------------------------------------------------------------------

Task 2: Multi-Stage Build

Rewrite the Dockerfile using multi-stage build:

Stage 1: Build the app (install dependencies, compile)
Stage 2: Copy only the built artifact into a minimal base image (alpine, distroless, or scratch)
Build the image and check its size again
Compare the two sizes
Write in your notes: Why is the multi-stage image so much smaller?

==>

#Create a New Multi-Stage Dockerfile
vi Dockerfile

# Build stage
FROM golang:1.24 AS builder

WORKDIR /app

COPY . .

# CGO_ENABLED=0 creates a statically linked binary. GOOS=linux builds for Linux.
RUN GCO_ENABLED=0 GOOS=linux go build -o hello

# Run stage
FROM alpine:latest

WORKDIR /app

# Copy only the compiled executable from the builder stage.
COPY --from=builder /app/hello .

CMD ["./hello"]

# build new multi-stage image
docker build -t hello-go-multi .

# run the container
docker run hello-go-multi

# To check hello-go all images 
docker image ls hello-go* 

IMAGE                   ID             DISK USAGE   CONTENT SIZE
hello-go:latest         46d82f4bf2a8       1.36GB          333MB
hello-go-multi:latest   6cb279dba156       16.5MB          5.2MB		--> image size decreased.

# Why is the multi-stage image so much smaller?
* The first stage uses the full Go image only to compile the application.
* The second stage starts from a minimal Alpine Linux image.
* Only the compiled executable is copied into the final image.
* The Go compiler, source code, build cache, and other unnecessary files are not included.
* This results in a much smaller, faster, and more secure Docker image.

----------------------------------------------------------------------------------------------

Task 3: Push to Docker Hub

Create a free account on Docker Hub (if you don't have one)
Log in from your terminal
Tag your image properly: yourusername/image-name:tag
Push it to Docker Hub
Pull it on a different machine (or after removing locally) to verify

==>

# Simply create login on Dockerhub web if you dont have.

docker login			--> To lgon docker hub through cli. Enter your details as requested there. If it ask to enter the code then simply copy the url and paste it 
on browser and enter the code there.

#something like this, device confirmation.
Your one-time device confirmation code is: ABCD-WXYZ
Press ENTER to open your browser or submit your device code here: https://login.docker.com/activate

# Tag the Image
docker tag hello-go-multi prabankini2026udaan/hello-go:v1

# Push the Image
docker push prabankini2026udaan/hello-go:v1

# Go to docker hub on browser and check your repositories.

# To remove the image from local
docker rmi prabankini2026udaan/hello-go:v1

# To pull the image from docker hub
docker pull prabankini2026udaan/hello-go:v1

----------------------------------------------------------------------------------------------------

Task 4: Docker Hub Repository

Go to Docker Hub and check your pushed image
Add a description to the repository
Explore the tags tab — understand how versioning works
Pull a specific tag vs latest — what happens?

==>

# Description added.

# Docker tags are labels used to identify different versions of an image. A tag such as v1 always refers to that specific version, making deployments 
reproducible. The latest tag is simply a conventional tag and is not automatically updated to the newest image unless it is explicitly pushed. Pulling 
yourusername/image:v1 retrieves that exact version, while pulling yourusername/image:latest (or omitting the tag) retrieves the image currently associated 
with the latest tag.

------------------------------------------------------------------------------------------------------

Task 5: Image Best Practices

Apply these to one of your images and rebuild:

Use a minimal base image (alpine vs ubuntu — compare sizes)
Don't run as root — add a non-root USER in your Dockerfile
Combine RUN commands to reduce layers
Use specific tags for base images (not latest)
Check the size before and after.

==> 

# Have changed the builder Image to "golang:1.25-alpine3.23" as 1.24-alpine one not available on docker hub
vi Dockerfile

# optimized Docker file

# Stage 1: Build
FROM golang:1.25-alpine3.23 AS builder

WORKDIR /app

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o hello

# Stage 2: Run
FROM alpine:3.22

WORKDIR /app

# Create a non-root user. Instead of running as root, create a dedicated user:
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup

# Copy only the compiled binary
COPY --from=builder /app/hello .

# Change ownership
RUN chown appuser:appgroup /app/hello

# Run as non-root
USER appuser

CMD ["./hello"]


# Image size is as below.
hello-go-optmz:v1                 3812b6548a5b         20MB          6.5MB

# Error have got as image not found
ERROR: failed to build: failed to solve: golang:1.24.0-alpine3.22: failed to resolve source metadata for docker.io/library/golang:1.24.0-alpine3.22: 
docker.io/library/golang:1.24.0-alpine3.22: not found

--------------------------------------------------------------------------------------











