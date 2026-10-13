Day 44 – Secrets, Artifacts & Running Real Tests in CI

# Task 1: GitHub Secrets

Go to your repo → Settings → Secrets and Variables → Actions
Create a secret called MY_SECRET_MESSAGE
Create a workflow that reads it and prints: The secret is set: true (never print the actual value)
Try to print ${{ secrets.MY_SECRET_MESSAGE }} directly — what does GitHub show?
Write in your notes: Why should you never print secrets in CI logs?

==> 


* Go to your GitHub repository in your browser, click on Settings in the top navigation bar, expand Secrets and variables in the left sidebar, and select Actions.
* Click on New repository secret. In the Name field, type MY_SECRET_MESSAGE, enter a test message of your choice in the Secret field, and click Add secret.
	* Verification: You should see MY_SECRET_MESSAGE listed under the Repository secrets dashboard.


Using existing github-action-practise repo

go to main branch first and create feature branch:

git checkout -b feature/test-secrets 
vi .github/workflows/secret-test.yml

name: Test Secret Workflow
on:
  push:
    branches: [ "main" ]
  workflow_dispatch:

jobs:
  test-secret:
    runs-on: ubuntu-latest
    steps:
      - name: Check if secret is set
        env:
          MY_SECRET_MESSAGE: ${{ secrets.MY_SECRET_MESSAGE }}

        run: |
          if [ -n "$MY_SECRET_MESSAGE" ]; then
            echo "The secret is set: true"
          else
            echo "The secret is set: false"
          fi

git add - commit - push to feature/secret-test and create pr and merge it to main

Check on github - actions - Test Secret Workflow - Run workflow tab to run workflow - select main branch
Can see GitHub automatically detects secrets and masks them in the logs, replacing the value with asterisks (***).

Notes : Never print secrets in your logs because anyone who can view your repository can also see those logs.
While GitHub tries to hide secrets with stars (***), it is easy to make a mistake or use a third-party tool that accidentally bypasses the filter, leaving your passwords 
or API keys exposed in plain text for anyone to steal.

--------------------------------------------------------------------------------------------

# Task 2: Use Secrets as Environment Variables

Pass a secret to a step as an environment variable
Use it in a shell command without ever hardcoding it
Add DOCKER_USERNAME and DOCKER_TOKEN as secrets (you'll need these on Day 45)

==>

* Add the Secrets to GitHub:

	* Go to your repository → Settings → Secrets and variables → Actions.

	* Click New repository secret, create one named DOCKER_USERNAME, and paste your Docker Hub username.

	* Click New repository secret again, create one named DOCKER_TOKEN, and paste your Docker Access Token.
	

Using existing github-action-practise repo

go to main branch first and create feature branch:

git checkout -b feature/docker-login-test
vi .github/workflows/docker-login-test.yml	

name: Docker Login Test
on:
  workflow_dispatch:

jobs:
  docker-login:
    runs-on: ubuntu-latest
    steps:
      - name:
        env:
          DOCKER_USERNAME: ${{ secrets.DOCKER_USERNAME }}
          DOCKER_TOKEN: ${{ secrets.DOCKER_TOKEN }}

        run: |
          # Use the environment variables safely in your command
          echo "$DOCKER_TOKEN" | docker login -u "$DOCKER_USERNAME" --password-stdin


git add - commit - push to feature/docker-login-test and create pr and merge it to main

Check on github - actions - Docker Login Test Workflow - Run workflow tab to run workflow - select main branch

------------------------------------------------------------------------------------

# Task 3: Upload Artifacts

Create a step that generates a file — e.g., a test report or a log file
Use actions/upload-artifact to save it
After the workflow runs, download the artifact from the Actions tab
Verify: Can you see and download it from GitHub?

==>

Using existing github-action-practise repo

go to main branch first and create feature branch:

git checkout -b feature/artifact-test
vi .github/workflows/artifact-test.yml

name: Generate and Upload Artifact
on:
  workflow_dispatch:

jobs:
  build_artifact:
    runs-on: ubuntu-latest
    steps:
      - name: Generate a Test Report File
        run: |
          mkdir -p output
          echo "This is a test report generated during the CI Build" > output/test-report.txt
          echo "Build Timestamp: $(date)" >> output/test-report.txt

      - name: Upload Artifact
        uses: actions/upload-artifact@v4
        with:
          name: my-test-report
          path: output/test-report.txt


git add - commit - push to feature/artifact-test and create pr and merge it to main

Check on github - actions - Generate and Upload Artifact Workflow - Run workflow tab to run workflow - select main branch

Notes: Download and Verify the Artifact:
GitHub Actions UI.
1. Go to your repository on GitHub and click the Actions tab.Click on your latest workflow run ("Generate and Upload Artifact").
2. CLick the latest job and find the Artifacts section.
3. Click on my-test-report to download the ZIP file to your computer. Unzip the downloaded folder and open test-report.txt in a text editor.
Verification: We can see the message “This is a test report generated during the CI build.” and the timestamp inside the downloaded text file.

----------------------------------------------------------------------------------------------

# Task 4: Download Artifacts Between Jobs

Job 1: generate a file and upload it as an artifact
Job 2: download the artifact from Job 1 and use it (print its contents)

Write in your notes: When would you use artifacts in a real pipeline?

==>

go to main branch first and create feature branch:

git checkout -b feature/multi-job-artifact
vi .github/workflows/multi-job-artifact.yml

name: Multi-Job Artifact Pipeline
on:
  workflow_dispatch:

jobs:
  generate-job:
    runs-on: ubuntu-latest
    steps:
      - name: Generate a file
        run: |
          mkdir -p build-output
          echo "Hello from Job 1! This file was passed securely to Job 2." > build-output/shared-data.txt
          echo "Generated at: $(date)" >> build-output/shared-data.txt

      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: workflow-artifact
          path: build-output/shared-data.txt

  consume-job:
    needs: generate-job  # Ensures Job 2 waits for Job 1 to finish successfully
    runs-on: ubuntu-latest
    steps:
      - name: Download artifact
        uses: actions/download-artifact@v4
        with:
          name: workflow-artifact

      - name: Use the downloaded file
        run: |
          echo "Successfully downloaded artifact from Job 1!"
          echo "--- File Contents Start ---"
          cat shared-data.txt
          echo "--- File Contents End ---"
		  
Notes : We would use artifacts in a real CI/CD pipeline whenever data or built assets need to be shared between separate jobs or saved for human inspection.

----------------------------------------------------------------------------------------------

# Task 5: Run Real Tests in CI
Take any script from your earlier days (Python or Shell) and run it in CI:

Add your script to the github-actions-practice repo
Write a workflow that:
Checks out the code
Installs any dependencies needed
Runs the script
Fails the pipeline if the script exits with a non-zero code
Intentionally break the script — verify the pipeline goes red
Fix it — verify it goes green again

==>


go to main branch first and create feature branch:

git checkout -b feature/run-real-test
vi .github/workflows/run-real-test.yml

name: Run Real Tests
on:
  workflow_dispatch:

jobs:
  run-script:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Debug workspace files
        run: |
          echo "Current working directory: $PWD"
          ls -la
          find . -name "check_status.py"

      - name: Run test script
        run: python3 ./scripts/check_status.py



Go to root folder and create folder name "scripts" then create script named "check_status.py"


import sys

def main():
    print("Running automated system check...")
    # Simulating a check that passes successfully
    print("All checks passed successfully!")
    sys.exit(0)

if __name__ == "__main__":
    main()


git add - commit - push to feature/run-real-test and create pr and merge it to main

Check on github - actions - Run Real Tests Workflow - Run workflow tab to run workflow - select main branch

Workflow will run successfully and shows green.
To break the script make below changes in script "check_status.py"

sys.exit(1)

push - merge to main and run workflow again. It will show red. It means it breaks.. Revert it as per above steps.

------------------------------------------------------------------------------------------

# Task 6: Caching
Add actions/cache to a workflow that installs dependencies
Run it twice — observe the time difference
Write in your notes: What is being cached and where is it stored?

==>

* Add a Requirements File: Create a file named requirements.txt in the root of your repository with a common Python package

requests==2.31.0

* go to main branch first and create feature branch:

git checkout -b feature/test-cache
vi .github/workflows/test-cache.yml


name: Cached Dependencies Pipeline
on:
  workflow_dispatch:

jobs:
  build-with-cache:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Cache Python dependencies
        uses: actions/cache@v4
        with:
          path: ~/.cache/pip
          key: ${{ runner.os }}-pip-${{ hashFiles('**/requirements.txt') }}
          restore-keys: |
            ${{ runner.os }}-pip-

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
		  
git add - commit - push to feature/test-cache and create pr and merge it to main

Check on github - actions - Cached Dependencies Pipeline Workflow - Run workflow tab to run workflow - select main branch

Notes : 
First time it will download and install the package from scratch. Note down the time for total job runtime.
Second time immediately trigger the workflow without changing requirements.txt.
Verification: Open the steps and look at the Cache Python dependencies step log. It should say “Cache hit: …”. By skiping downloading packages, making the second run noticeably faster.

What is being cached?
The downloaded package binaries and build files (in this case, cached from the local pip cache directory ~/.cache/pip), preventing pip from having to fetch them over the internet 
from PyPI on every single run.

Where is it stored?
It is stored securely in GitHub's external cache storage service associated with your repository, separate from your code commits, and is retrieved by GitHub Actions runners at 
the start of the job matching your cache key.

---------------------------------------------------------------------------------
