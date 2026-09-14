Day 43 – Jobs, Steps, Env Vars & Conditionals

# Task 1: Multi-Job Workflow

Create .github/workflows/multi-job.yml with 3 jobs:

build — prints "Building the app"
test — prints "Running tests"
deploy — prints "Deploying"
Make test run only after build succeeds. Make deploy run only after test succeeds.

Verify: Check the workflow graph in the Actions tab — does it show the dependency chain?

==>


Using existing github-action-practise repo

go to main branch first and create feature branch:

git checkout -b feature/multi-job 
vi .github/workflows/multi-job.yml



name: Multi-Job Workflow

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Build step
        run: echo "Building the App"

  test:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Test step
        run: echo "Running tests"

  deploy:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - name: Deploy step
        run: echo "Deploying app"


git add - commit - push to feature/multi-job and create pr and merge it to main

Checked on github - actions - Multi-Job Workflow - Run workflow tab to run workflow - select main branch

Its shows dependency chain as can confirm that test waits for build to turn green before starting, and deploy waits for test to complete before running.

----------------------------------------------------------------------------------

# Task 2: Environment Variables

In a new workflow, use environment variables at 3 levels:

Workflow level — APP_NAME: myapp
Job level — ENVIRONMENT: staging
Step level — VERSION: 1.0.0
Print all three in a single step and verify each is accessible.

Then use a GitHub context variable — print the commit SHA and the actor (who triggered the run).

==>

go to main branch first and create feature branch:

git checkout -b feature/env-vars 
vi .github/workflows/env-vars.yml


name: Environment and Context Variables

on:
  push:
    branches: [ main ]
  workflow_dispatch:

env:
  APP_NAME: myapp

jobs:
  print-onfo:
    runs-on: ubuntu-latest
    env:
      ENVIRONMENT: staging

    steps:
      - name: Print Environment and Context Variables
        env:
          VERSION: 1.0.0
        run: |
          echo "-- ENVIRONMENT VARIABLES --"
          echo "App Name: $APP_NAME"
          echo "Environment: $ENVIRONMENT"
          echo "Version: $VERSION"
          echo ""
          echo "-- GitHub Context Variables --"
          echo "Commit SHA: ${{ github.sha }}"
          echo "Actor: ${{ github.actor }}"
		  
git add - commit - push to feature/env-vars and create pr and merge it to main.
Checked on github - actions - Environment and Context Variables Workflow - Run workflow tab to run workflow - select main branch	  
It prints Env Vars and Context Vars as expected 

-- ENVIRONMENT VARIABLES --
App Name: myapp
Environment: staging
Version: 1.0.0

-- GitHub Context Variables --
Commit SHA: e7f33ed1c*****8c2bda5735cb****d974b
Actor: Praban25

----------------------------------------------------------------------------------------------------

# Task 3: Job Outputs

Create a job that sets an output — e.g., today's date as a string
Create a second job that reads that output and prints it
Pass the value using outputs: and needs.<job>.outputs.<name>
Write in your notes: Why would you pass outputs between jobs?

==>

go to main branch first and create feature branch:

git checkout -b feature/jobs-outputs 
vi .github/workflows/jobs-outputs .yml


name: Pass Outputs Between Jobs

on:
  push:
    branches: [ main ]
  workflow_dispatch:


jobs:
  generate-date:
    runs-on: ubuntu-latest
    outputs:
      current_date: ${{ steps.set-date.outputs.date_str }}
    steps:
      - name: Generate Today's date
        id: set-date
        run: |
          TODAY=$(date +'%y-%m-%d')
          echo "date_str=$TODAY" >> $GITHUB_OUTPUT

  read-date:
    runs-on: ubuntu-latest
    needs: generate-date
    steps:
      - name: Print Received Output
        run: |
          echo "Date received from previous job: ${{ needs.generate-date.outputs.current_date }}"
		  
		  
git add - commit - push to feature/jobs-outputs and create pr and merge it to main.
Checked on github - actions - Pass Outputs Between Jobs Workflow - Run workflow tab to run workflow - select main branch

Notes : Each job in GitHub Actions runs on a completely separate virtual machine, meaning they cannot automatically see or share data. Passing outputs allows jobs to 
communicate and hand off crucial information.

* Share Dynamic Data: Pass generated values (like version tags, release dates, or git hashes) to build and deploy steps.
* Control Workflow Decisions: Calculate flags early (like deciding whether to run tests) to trigger or skip future jobs.
* Hand Off Infrastructure Info: Send deployment results (like a new server IP or web URL) straight to testing or notification jobs.
* Drive Dynamic Matrix Jobs: Generate custom targets on the fly to run multiple test environments in parallel.

------------------------------------------------------------------------------------------------------

# Task 4: Conditionals
In a workflow, add:

A step that only runs when the branch is main
A step that only runs when the previous step failed
A job that only runs on push events, not on pull requests
A step with continue-on-error: true — what does this do?

==>

go to main branch first and create feature branch:

git checkout -b feature/conditional-wf
vi .github/workflows/conditional-wf.yml


name: Conditionals and Error Handling

on:
  push:
    branches: [ main, feature/* ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:

jobs:
  push-only-job:
    # Conditional Job : It runs Only on push events, NOT on pull request.
    if: github.event_name == 'push'
    runs-on: ubuntu-latest

    steps:
      - name: Step 1 - Intentional Failure (ignored)
      # continue-on-error prevents stopping the job from step failure
        continue-on-error: true
        run: |
          echo "Simulating a failing step.."
          exit 1

      - name: Step 2 - Failure Handler
      # conditional - Runs Only when the previous step in this job Failed
        if: failure()
        run: echo "Execution Caught!! A Previuos Step FAILED..!!"

      - name: Step 3 - Branch Specific Execution
      # conditional: Runs ONLY when the target branch is MAIN
        if: github.ref == 'refs/heads/main'
        run: echo "This step runs exclusively on MAIN Branch."

git add - commit - push to feature/conditional-wf and create pr and merge it to main.
Checked on github - actions - Conditionals and Error Handling Workflow - Run workflow tab to run workflow - select main branch

Note : When you set continue-on-error: true on a step, it prevents a step's failure from stopping the entire workflow. The step itself is flagged with a warning, but it 
does not mark the overall job as failed. Job Outcome Remains "Success"

--------------------------------------------------------------------------------------

# Task 5: Putting It Together

Create .github/workflows/smart-pipeline.yml that:

Triggers on push to any branch
Has a lint job and a test job running in parallel
Has a summary job that runs after both, prints whether it's a main branch push or a feature branch push, and prints the commit message

==>

go to main branch first and create feature branch:

git checkout -b feature/smart-pipeline
vi .github/workflows/smart-pipeline.yml


name: Smart Pipeline

on:
  push:
    branches:
      - '**'

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - name: Run Linter
        run: echo "Running Linter Check...."

  test:
    runs-on: ubuntu-latest
    steps:
      - name: Run Tests
        run: echo "Running Automated Test Suits.."

  summary:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - name: Print Branch Type (Main)
        if: github.ref == 'refs/heads/main'
        run: |
          echo "Branch Type: Main Branch Push"

      - name: Print Branch Type (Feature)
        if: github.ref != 'refs/heads/main'
        run: |
         echo "Branch Type: Feature Branch Push (${{ github.ref_name }})"

      - name: Print Commit Message
        run: |
          echo " Commit Message: ${{ github.event.head_commit.message }}" 


git add - commit - push to feature/smart-pipeline and create pr and merge it to main.
Checked on github - actions - Smart Pipeline Workflow - Run workflow tab to run workflow - select main branch

Notes : 
The wildcard pattern ** matches all branches names.
Because neither lint nor test contains a needs: key, GitHub Actions executes them simultaneously on separate runners.
The needs: [lint, test] directive forces summary to wait for both jobs to complete. It uses conditionals and context variables to print the branch type and commit message.

---------------------------------------------------------------------------------------------------
