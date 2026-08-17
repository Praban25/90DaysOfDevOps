
Day 42 – Runners: GitHub-Hosted & Self-Hosted

# Task 1. GitHub-Hosted Runners

Create a workflow with 3 jobs, each on a different OS:
ubuntu-latest
windows-latest
macos-latest

In each job, print:
The OS name
The runner's hostname
The current user running the job
Watch all 3 run in parallel

Write in your notes: What is a GitHub-hosted runner? Who manages it?

==>

Using existing github-action-practise repo

go to main branch first and create feature branch:

git checkout -b feature/runners 
vi .github/workflows/runners.yml


name: GitHub Hosted Runners

on:
  workflow_dispatch:

jobs:
  ubuntu-runner:
    runs-on: ubuntu-latest

    steps:
      - name: Show Ubuntu Runner Details
        run: |
          echo "OS Name: "
          uname -s

          echo "Hostname: "
          hostname

          echo "Current user: "
          whoami

  windows-runner:
    runs-on: windows-latest

    steps:
      - name: Show Windows Runner Details
        shell: pwsh
        run: |
          Write-Host "OS Name: "
          [System.Environment]::OSVersion.VersionString

          Write-Host "Hostname: "
          hostname

          Write-Host "Current user: "
          whoami

  macos-runner:
    runs-on: macos-latest
      
    steps:
      - name: Show MacOS Runner Details
        run: |
          echo "OS Name: " 
          uname -s
          
          echo "Hostname: "
          hostname
          
          echo "Current user: "
          whoami


git add - commit - push to feature/runners and create pr and merge it to main

Check on github - actions - GitHub Hosted Runners - Run workflow tab to run workflow - select main branch
Can see 3 jobs are running parallel on OS Ubuntu - windows - macos. 

## Notes:
A GitHub-hosted runner is a virtual machine provided by GitHub to execute GitHub Actions workflows and jobs.
GitHub manages the underlying runner infrastructure, including provisioning and maintaining the runner environment.
Multiple independent jobs in a GitHub Actions workflow can run in parallel on different GitHub-hosted runners.

--------------------------------------------------------------------------------------------------------

# Task 2: Explore What's Pre-installed

On the ubuntu-latest runner, run a step that prints:
Docker version
Python version
Node version
Git version

Look up the GitHub docs for the full list of pre-installed software on ubuntu-latest
Write in your notes: Why does it matter that runners come with tools pre-installed?

==>

git checkout -b feature/preinstalled-tools
vi .github/workflows/preinstalled-tools.yml

name: Preinstalled Tools for Ubuntu-Latest

on:
  workflow_dispatch:

jobs:
  check-tools:
    runs-on: ubuntu-latest

    steps:
      - name: check pre-installed tools
        run: |
          echo "--Docker Version--"
          docker --version

          echo "--Python Version--"
          python3 --version

          echo "--node.js Version--"
          node --version

          echo "--GIT Version--"
          git --version

          echo "--Preinstalled tools list--"
          apt list --installed




Note: Have added below command to list all pre-installed tool list and it works.
apt list --installed

GitHub-hosted runners come with a large collection of commonly used development, testing, and DevOps tools already installed.
Pre-installed tools matter because they allow CI/CD workflows to start immediately without spending time installing common dependencies. This makes pipelines faster, 
simpler, and more consistent across runs.

--------------------------------------------------------------------------------------------------

# Task 3: Set Up a Self-Hosted Runner

Go to your GitHub repo → Settings → Actions → Runners → New self-hosted runner
Choose Linux as the OS
Follow the instructions to download and configure the runner on:
Your local machine, OR
A cloud VM (EC2, Utho, or any VPS)
Start the runner — verify it shows as Idle in GitHub
Verify: Your runner appears in the Runners list with a green dot.

==>

Using WSL Ubuntu

Pre-requisites: 
curl --version
sudo apt update
sudo apt install curl -y

Go to Github Repo - → Actions → Runners → New Runner → New self-hosted runner - OS (Linux) (x64)

GitHub will then show you copy-paste commands specifically for your repository and runner. GitHub's current instructions follow this exact flow: select OS/architecture, 
download/extract the runner, then run the configuration script to register it.

curl -o actions-runner-linux-x64-<version>.tar.gz -L <github-runner-download-url>
tar xzf ./actions-runner-linux-x64-*.tar.gz
./config.sh --url https://github.com/YOUR_USERNAME/YOUR_REPOSITORY --token YOUR_TOKEN   --> Follow the instructions

./run.sh		--> Start the Runner

It should show below :
Connected to GitHub
Listening for Jobs

GitHub → Repository → Settings → Actions → Runners   => Idle		--> To Verify

----------------------------------------------------------------------------------------------------

# Task 4: Use Your Self-Hosted Runner

Create .github/workflows/self-hosted.yml
Set runs-on: self-hosted
Add steps that:
Print the hostname of the machine (it should be YOUR machine/VM)
Print the working directory
Create a file and verify it exists on your machine after the run
Trigger it and watch it run on your own hardware
Verify: Check your machine — is the file there?


==>


git checkout -b feature/self-hosted-ubuntu
vi .github/workflows/self-hosted.yml

name: Self Hosted Runner Test

on:
  workflow_dispatch:

jobs:
  test-self-hosted-runner:
    runs-on: self-hosted

    steps:
      - name: show runner information
        run: |
          echo "==Operating System=="
          uname -a

          echo "==HostName=="
          hostname

          echo "==Current User=="
          whoami

          echo "==Working Directory=="
          pwd

      - name: Create Test File
        run: |
          echo "This Test file created by GitHub Actions on my self-hosted runner." > github-runner-test.txt

      - name: Verify test file
        run: |
          echo "Verify File Creation"
          ls -l github-runner-test.txt

          if [ -f github-runner-test.txt ]; then
            echo "File created successfully"
          else
            echo "File not created"
            exit 1
          fi

      - name: Display file contents
        run: |
          echo "==File Contents=="
          cat github-runner-test.txt


git add - commit - push to feature/self-hosted-ubuntu, create pr and merge it to main.
run workflow to test.

Have verified PWD path and also verified the github-runner-test.txt file created on the same location.

++++

## Mistake and Learnings:

Downloaded GitHub runner
        ↓
actions-runner/
        ↓
git add .
        ↓
git commit
        ↓
~354 MB accidentally entered Git history 		--> error: RPC failed: HTTP 408 fatal: the remote end hung up unexpectedly


### Fix Applied:

Add actions-runner/ to .gitignore				--> add downloaded GitHub runner to .gitignore file
        ↓
Remove it from Git tracking
        ↓
Identify that the feature branch was unpublished
        ↓
git reset --soft origin/main
        ↓
Commit only intended files
        ↓
Push clean feature branch
        ↓
Create PR


#### Commands to Use for Fix

git ls-files										--> Check what files are tracked
git ls-files actions-runner/						--> Check whether a directory is tracked
git diff --stat origin/main..HEAD					--> Check what your branch changed compared with main
git log --oneline --all -- actions-runner/			--> Check commits involving a particular directory
git fetch origin									--> Refresh remote information
git branch -r										--> See remote branches
echo "actions-runner/" > .gitignore					--> Ignore a directory
git rm -r --cached actions-runner/					--> Remove an already-tracked directory but keep it locally
git reset --soft origin/main						--> Safely rebuild an unpublished feature branch from main while keeping changes
git commit -m "Add self-hosted Ubuntu runner wf"	--> Commit changes
git push -u origin feature/self-hosted-ubuntu		--> Push a new branch

-------------------------------------------------------------------------------------------------------

# Task 5: Labels

Add a label to your self-hosted runner (e.g., my-linux-runner)
Update your workflow to use runs-on: [self-hosted, my-linux-runner]
Trigger it — does it still pick up the job?
Write in your notes: Why are labels useful when you have multiple self-hosted runners?

==>


Repository → Settings → Actions → Runners → Click your Runner → labels → create new (my-ubuntu-runner)

vi .github/workflows/self-hosted.yml				--> used existing workflow

runs-on: [self-hosted, my-linux-runner]				--> edited / added this new label here

git add - commit - push to feature/self-hosted-ubuntu, create pr and merge it to main.

run workflow to test.

it picks the self hosted & my-linux-runner label runner. 
for cross check have provided wrong label and workflow waits for the runner as check.

Notes : Labels allow GitHub Actions to choose a specific type of self-hosted runner based on its capabilities or purpose. When multiple self-hosted runners are available, 
labels help route jobs to the correct runner.

-----------------------------------------------------------------------------------------------------------



