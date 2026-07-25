
Day 39 – What is CI/CD?

# Task 1: The Problem
Think about a team of 5 developers all pushing code to the same repo manually deploying to production.

Write in your notes:

1. What can go wrong?
2. What does "it works on my machine" mean and why is it a real problem?
3. How many times a day can a team safely deploy manually?

==>

1. 
* Developers overwrite each other's changes during deployment.
* Someone will deploy the wrong version or branch.
* In Manual deployment steps are missed or executed incorrectly.
* Configuration or environment differences cause failures.
* No automated testing before production deployment.
* Rollbacks are slow and error-prone if something breaks.
* Production downtime due to human mistakes

2. It Means a developer's code runs perfectly on their local computer but fails on another developer's machine, the test environment, or production.
* Different operating systems, software versions, dependencies, or configurations can cause inconsistent behavior.
* Bugs are difficult to reproduce and fix.
* Development slows down because teams spend time troubleshooting environment issues instead of building features.
* It reduces confidence in deployments and software quality.

3. 
* Usually only a few times per day (often 1–3), depending on the team's experience and the complexity of the application.
* As deployment frequency increases, the risk of human error also increases.
* Manual deployments are slow, repetitive, and not scalable.
* This is why DevOps teams use CI/CD pipelines to automate testing and deployments, enabling safe deployments many times a day with much lower risk.

Notes : Manual deployments become a bottleneck as teams grow. Automation through CI/CD improves consistency, reduces human error, and allows faster and 
safer software releases.

----------------------------------------------------------------------------------------

# Task 2: CI vs CD
Research and write short definitions (2-3 lines each):

1. Continuous Integration — what happens, how often, what it catches
2. Continuous Delivery — how it's different from CI, what "delivery" means
3. Continuous Deployment — how it differs from Delivery, when teams use it
4. Write one real-world example for each.

==>

1. Definition:
Continuous Integration is the practice of developers frequently (often several times a day) merging their code into a shared repository. Every change 
automatically triggers a build and tests to catch errors like build failures, merge conflicts, or broken functionality early.

Real-world example:
A developer pushes code to GitHub, and GitHub Actions automatically builds the application and runs unit tests before allowing the code to be merged.

2. Definition:
Continuous Delivery extends CI by ensuring that every successful code change is automatically built, tested, and prepared for release. The software is 
always in a deployable state, but a manual approval is required before deploying to production.

Real-world example:
After passing all automated tests, a Jenkins pipeline prepares the application for production. The release manager reviews and clicks "Deploy" to release it.

3. Definition:
Continuous Deployment goes one step further than Continuous Delivery. Every code change that passes all automated tests is automatically deployed to 
production without any manual approval. It is used by teams with highly reliable automated testing and monitoring.

Real-world example:
A company like Netflix or Amazon automatically deploys small, tested code changes to production multiple times a day without human intervention.

----------------------------------------------------------------------------------------

# Task 3: Pipeline Anatomy
A pipeline has these parts — write what each one does:

Trigger — what starts the pipeline
Stage — a logical phase (build, test, deploy)
Job — a unit of work inside a stage
Step — a single command or action inside a job
Runner — the machine that executes the job
Artifact — output produced by a job

==> 

1. Definition:
A trigger is the event that starts a CI/CD pipeline. Common triggers include a code push, pull request, scheduled run, or manual execution.

Example:
A developer pushes code to the main branch, automatically starting the pipeline.

2. Definition:
A stage is a logical phase in the pipeline that groups related jobs. Typical stages include Build, Test, and Deploy.

Example:
A pipeline may have three stages: Build → Test → Deploy.

3. Definition:
A job is a set of tasks that run within a stage. Jobs can run sequentially or in parallel, depending on the pipeline configuration.

Example:
In the Test stage, one job runs unit tests while another runs integration tests.

4. Definition:
A step is a single command or action performed within a job. Multiple steps together complete the job.

Example:
A build job may have these steps:

Install dependencies
Compile the application
Package the build

5. Definition:
A runner is the machine or environment that executes the pipeline jobs. It can be a cloud-hosted or self-hosted server.

Example:
A GitHub-hosted Ubuntu runner executes the build and test jobs.

6. Definition:
An artifact is a file or output generated by a job that can be stored and used by later stages or downloaded after the pipeline finishes.

Example:
A compiled .jar file, Docker image, or test report produced during the build stage is saved as an artifact.

----------------------------------------------------------------------------------------

# Task 4: Draw a Pipeline
Draw a CI/CD pipeline for this scenario:

A developer pushes code to GitHub. The app is tested, built into a Docker image, and deployed to a staging server.

Include at least 3 stages. Hand-drawn and photographed is perfectly fine.

==>

CICD pipeline image uploaded in repo


-----------------------------------------------------------------------------------------

# Task 5: Explore in the Wild

Open any popular open-source repo on GitHub (Kubernetes, React, FastAPI — pick one you know)
Find their .github/workflows/ folder
Open one workflow YAML file
Write in your notes:
1. What triggers it?
2. How many jobs does it have?
3. What does it do? (best guess)

==>

Sample.yaml

name: Analyze API Changes

on:
  pull_request_target:
    types: [opened, edited, reopened, synchronize]

permissions:
  pull-requests: write

jobs:
  api_changes:
    runs-on: ubuntu-latest
    if: github.repository == 'react/react-native'
    steps:
      - name: Check out main branch
        uses: actions/checkout@v6
      - name: Setup Node.js
        uses: ./.github/actions/setup-node
      - name: Run yarn install
        uses: ./.github/actions/yarn-install
      - name: Run diff-js-api-changes
        id: diff-js-api-changes
        uses: ./.github/actions/diff-js-api-changes
      - name: Post PR comment
        uses: ./.github/actions/post-pr-comment
        with:
          marker: '<!-- api-changes -->'
          sections: '[${{ toJSON(steps.diff-js-api-changes.outputs.message) }}]'


1. The workflow runs whenever a pull request is created or updated.
2. 1 Job : api_changes
3. This workflow automatically checks whether a Pull Request changes the JavaScript API and then posts the results as a comment on the Pull Request.


--------------------------------------------------------------------------------------
