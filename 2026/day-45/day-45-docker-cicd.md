Day 45 – Docker Build & Push in GitHub Actions

# Task 1: Prepare

Use the app you Dockerized on Day 36 (or any simple Dockerfile)
Add the Dockerfile to your github-actions-practice repo (or create a minimal one)
Make sure DOCKER_USERNAME and DOCKER_TOKEN secrets are set from Day 44

==>

Have copied below files from Day 36 to the current repo which use for GitHub-actions-practice (on root)

Dockerfile index.js package.json package-lock.json

To check secrets:
* Go to your GitHub repository in your browser.
* Click on Settings > Secrets and variables > Actions.
* Confirm that both secrets exist:
	* DOCKER_USERNAME
	* DOCKER_TOKEN

------------------------------------------------------------------------------------------------

# Task 2: Build the Docker Image in CI

Create .github/workflows/docker-publish.yml that:

Triggers on push to main
Checks out the code
Builds the Docker image and tags it
Verify: Check the build step logs — does the image build successfully?

# Task 3: Push to Docker Hub

Add steps to:

Log in to Docker Hub using your secrets
Tag the image as username/repo:latest and also username/repo:sha-<short-commit-hash>
Push both tags
Verify: Go to Docker Hub — is your image there with both tags?

# Task 4: Only Push on Main

Add a condition so the push step only runs on the main branch — not on feature branches or PRs.

Test it: push to a feature branch and verify the image is built but NOT pushed.

==>

Here we are taking above 3 task together.

go to main branch first and create feature branch:

git checkout -b feature/docker-publish 
vi .github/workflows/docker-publish.yml

We have tag the repo as v2 here with commit hash.

Also have comment the push on branch and put it as workflow_dispatch so that can run the workflow manually whenever required. 
Tested with On push also, it works fine.



name: Build and Push Docker Image

on:
  #  push:
  #    branches: [ "main" ] # Trigger on push to main branch (or change to master/your default branch)
  workflow_dispatch:     # Allows manual trigger from GitHub Actions tab

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Extract Short Commit Hash
        id: vars
        run: echo "sha_short=$(git rev-parse --short HEAD)" >> $GITHUB_OUTPUT        

      - name: Log in to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_TOKEN }}

      - name: Build and Push Docker Image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ${{ secrets.DOCKER_USERNAME }}/express-app:v2
            ${{ secrets.DOCKER_USERNAME }}/express-app:sha-${{ steps.vars.outputs.sha_short }}

git add - commit - push to feature/docker-publish and create pr and merge it to main

Check on github - actions - Build and Push Docker Image - Run workflow tab to run workflow - select main branch
Have verified that image build successfull, both mention tags are pushed now on GitHub for the v2 image

Notes : 
* Why do both tags have the same image and size?
	When your GitHub Actions workflow runs, Docker builds the image only once from your source code. It then applies multiple labels (tags) to that single underlying build 
	output before pushing it to Docker Hub.   
	Because v2 (or latest) and sha-af3166f point to the exact same built container image, they share the exact same layers and file size (50.37 MB). Docker does not duplicate 
	or rebuild the image; it simply creates two different pointers for the exact same artifact.   
	
* Why is this practice so useful?
	Traceability & Auditing: If a bug shows up in production three weeks from now, looking at the tag sha-af3166f tells you instantly which exact Git commit built that image. 
	You can go straight to your GitHub repository history and see what code changed in that specific commit.
	
	Reliability: Relying solely on a latest tag is dangerous because latest constantly changes every time code is merged. Using immutable commit SHA tags ensures you always 
	know which version of code is deployed.
	
-----------------------------------------------------------------------------------------

# Task 5: Add a Status Badge

Get the badge URL for your docker-publish workflow from the Actions tab
Add it to your README.md
Push — the badge should show green

==>

* Copy the Status Badge Markdown
	Go to your GitHub repository (github-actions-practice) in your browser.
	Click on the Actions tab.
	In the left-hand sidebar, click on your workflow (e.g., Build and Push Docker Image).
	On the top right of the workflow runs list, click the three dots (...) menu button.
	Select Create status badge.
	In the window that pops up, make sure the branch is set to main (or your default branch), then click Copy status badge Markdown.
	
* Update and push README.md
	vi README.md
	Paste the badge Markdown at the very top of your file and save the file.
	
Stage - commit - push to the main. (you can either create feature branch and then push or push it directly on main.)

* Verification: Confirm that the badge displays a green passing status (showing passing), indicating that your latest CI/CD workflow executed successfully!

--------------------------------------------------------------------------------------------
