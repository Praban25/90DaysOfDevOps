Day 40 – Your First GitHub Actions Workflow

# Task 1: Set Up

Create a new public GitHub repository called github-actions-practice
Clone it locally
Create the folder structure: .github/workflows/

==>

Created new repo as github-actions-practice on github

git clone https://github.com/<your-username>/github-actions-practice.git		--> Locally clone

cd github-actions-practice

mkdir -p .github/workflows			--> created folder structure: .github/workflows/

----------------------------------------------------------------------------------

# Task 2: Hello Workflow

Create .github/workflows/hello.yml with a workflow that:

Triggers on every push
Has one job called greet
Runs on ubuntu-latest
Has two steps:
Step 1: Check out the code using actions/checkout
Step 2: Print Hello from GitHub Actions!
Push it. Go to the Actions tab on GitHub and watch it run.

Verify: Is it green? Click into the job and read every step.

==>
cd .github/workflows/
vi hello.yml

---
name: Hello Workflow

'on':
  push:

jobs:
  greet:
    runs-on: ubuntu-latest

    steps:
      - name: checkout repository
        uses: actions/checkout@v7

      - name: Print greetings
        run: echo "Hello from GitHub Actions..!!"
		
Note : While using actions/checkout@v4 getting message as 
"Node.js 20 is deprecated. The following actions target Node.js 20 but are being forced to run on Node.js 24: actions/checkout@v4. 
For more information see: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/"

Have check and change it to v7 (latest one). It works smooth

----------------------------------------------------------------------------------------------------------

# Task 3: Understand the Anatomy

Look at your workflow file and write in your notes what each key does:

on:
jobs:
runs-on:
steps:
uses:
run:
name: (on a step)

==>

on: Defines the event(s) that trigger the workflow, such as push or pull_request.
jobs: Defines one or more jobs that the workflow will execute.
runs-on: Specifies the runner (operating system/environment) where the job runs, for example ubuntu-latest.
steps: Lists the sequence of tasks or actions that are executed in a job.
uses: Uses a pre-built GitHub Action from GitHub Marketplace or another repository.
run: Executes shell commands or scripts on the runner.
name: Provides a descriptive name for the step, making it easier to read the workflow logs.

-----------------------------------------------------------------------------------------------------------

# Task 4: Add More Steps

Update hello.yml to also:

Print the current date and time
Print the name of the branch that triggered the run (hint: GitHub provides this as a variable)
List the files in the repo
Print the runner's operating system
Push again — watch the new run.

==>

---
name: Hello Workflow

'on':
  push:

jobs:
  greet:
    runs-on: ubuntu-latest

    steps:
      - name: checkout repository
        uses: actions/checkout@v7

      - name: Print greetings
        run: echo "Hello from GitHub Actions..!!"

      - name: print current date and time
        run: date

      - name: branch name that triggered the run
        run: echo "${{ github.ref_name }}"

      - name: List the files in repo
        run: ls ${{ github.workspace }}

      - name: Print the runner operating system
        run: |
          echo "Runner OS: ${{ runner.os }}"
		  
		  
Notes : can run multiple commands in single run :

- name: Print system information
  run: |
    echo "Current Date:"
    date

    echo "Current Directory:"
    pwd
	
The "|" is called the literal block scalar in YAML.
		  
-----------------------------------------------------------------------------------------------------

# Task 5: Break It On Purpose

Add a step that runs a command that will fail (e.g., exit 1 or a misspelled command)
Push and observe what happens in the Actions tab
Fix it and push again
Write in your notes: What does a failed pipeline look like? How do you read the error?

==>

with exit 1   --> Error: Process completed with exit code 1.
invalid command		--> Error: Process completed with exit code 127.

A failed pipeline is shown with a red ❌ in GitHub Actions. Open the failed workflow, select the failed job, and read the logs of the failed step. The error message tells 
what failed and why. Fix the issue, commit the changes, and push again to rerun the pipeline.

------------------------------------------------------------------------------------------------------
