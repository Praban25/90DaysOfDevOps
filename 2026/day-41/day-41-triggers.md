Day 41 – Triggers & Matrix Builds

# Task 1: Trigger on Pull Request

Create .github/workflows/pr-check.yml
Trigger it only when a pull request is opened or updated against main
Add a step that prints: PR check running for branch: <branch name>
Create a new branch, push a commit, and open a PR
Watch the workflow run automatically
Verify: Does it show up on the PR page?

==> 

Create new repo on Github - name "github-actions-practice"

Clone the repo in your local system. Initiate repo by creating README.md and push to repo.

git checkout -b feature/pr-test		--> Create new branch and jump on it.
mkdir -p .github/workflows/			--> create workflow dir
vi .github/workflows/pr-check.yml	--> create pr-check.yml

---
name: PR Check

'on':
    pull_request:
        branches:
            - main
        types:
            - opened
            - synchronize

jobs:
    pr-check:
        runs-on: ubuntu-latest

        steps:
            - name: Print PR Branch
              run: |
                echo "PR check running for Branch: ${{ github.head_ref }}"
				



git status
git add .
git commit -m "PR Check workflow - pull request"
git push origin feature/pr-test		--> Push it to feature/pr-test

GO to github repo and create pull request - base: main  - compare: feature/pr-check
Check workflow - Click action tab and select PR Check workflow. It runs successfully.

While the PR is still open, make another change:

echo "Testing PR workflow" >> README.md
git add -- commit -- push

The synchronize event triggered the workflow again. Check again in Action tab to verify.

---------------------------------------------------------------------------------------------

# Task 2: Scheduled Trigger

Add a schedule: trigger to any workflow using cron syntax
Set it to run every day at midnight UTC
Write in your notes: What is the cron expression for every Monday at 9 AM?


==>

In your existing pr-check.yml just add below after branches and before jobs - 

vi .github/workflows/pr-check.yml


    branches:
      - main

  schedule:
    - cron: '0 9 * * 1'

  workflow_dispatch:  

jobs:


0 9 * * 1   		--> this schedule will runs at 9:00 UTC, only on Monday.

One catch : Need to merge the PR to Main to get the workflow_dispatch (run workflow) tab on github action tab

After merging PR, run workflow tab appear and can say schedule cron task also in place.

-------------------------------------------------------------------------------------------------

# Task 3: Manual Trigger

Create .github/workflows/manual.yml with a workflow_dispatch: trigger
Add an input that asks for an environment name (staging/production)
Print the input value in a step

Go to the Actions tab → find the workflow → click Run workflow
Verify: Can you trigger it manually and see your input printed?

==> 

go to main branch first and create feature branch:

git checkout -b feature/manual-workflow
vi .github/workflows/manual.yml


name: Manual Environment Workflow

on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Select the Environment'
        required: true
        type: choice
        options:
          - staging
          - production

jobs:
  manual-deployment:
    runs-on: ubuntu-latest

    steps:
      - name: Print Environment
        run: |
          echo "Selected Environment: ${{ inputs.environment }}"



git add & push to feature/manual-workflow branch.
create pr from github and merge it to the main branch

Manual Environment Workflow can see now under Github - action - all workflow
Also can triggerd the workflow manually.

----------------------------------------------------------------------------------------------------

# Task 4: Matrix Builds

Create .github/workflows/matrix.yml that:

Uses a matrix strategy to run the same job across:
Python versions: 3.10, 3.11, 3.12
Each job installs Python and prints the version
Watch all 3 run in parallel
Then extend the matrix to also include 2 operating systems — how many total jobs run now?

==>


go to main branch first and create feature branch:


git checkout -b feature/python-matrix
vi .github/workflows/matrix.yml


name: Python Matix

on:
  workflow_dispatch:

jobs:
  python-test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        python-version:
          - '3.10'
          - '3.11'
          - '3.12'


    steps:
      - name: Setup Python
        uses: actions/setup-python@v6
        with:
          python-version: ${{ matrix.python-version }}


      - name: Print Python Version
        run: python --version

git add - commit - push to feature/python-matrix

Check on github - actions - Python Matrix - Run workflow tab to run workflow - select main branch
can see 3 jobs runs in parallel.

++++

in same python-matix wrokflow make changes as below to use the same on multiple os:

name: Python Matix

on:
  workflow_dispatch:

jobs:
  python-test:
    runs-on: ${{ matrix.os }}

    strategy:
      matrix:
        python-version:
          - '3.10'
          - '3.11'
          - '3.12'

        os:
          - ubuntu-latest
          - windows-latest

    steps:
      - name: Setup Python
        uses: actions/setup-python@v6
        with:
          python-version: ${{ matrix.python-version }}


      - name: Print Python Version
        run: python --version


git add - commit - push to feature/python-matrix

Check on github - actions - Python Matrix - Run workflow tab to run workflow - select main branch
can see 6 jobs runs in parallel.

Notes : A GitHub Actions matrix strategy allows the same job to run multiple times with different combinations of variables such as programming language versions, 
operating systems, or configurations.

--------------------------------------------------------------------------------------------------

# Task 5: Exclude & Fail-Fast

In your matrix, exclude one specific combination (e.g., Python 3.10 on Windows)
Set fail-fast: false — trigger a failure in one job and observe what happens to the rest
Write in your notes: What does fail-fast: true (the default) do vs false?

==>

go to main branch first and create feature branch:


git checkout -b feature/matrix-fail-fast
vi .github/workflows/matrix.yml

name: Python Matix

on:
  workflow_dispatch:

jobs:
  python-test:
    runs-on: ${{ matrix.os }}

    strategy:
      fail-fast: false

      matrix:
        python-version:
          - '3.10'
          - '3.11'
          - '3.12'

        os:
          - ubuntu-latest
          - windows-latest

        exclude:
          - python-version: '3.10'
            os: windows-latest

    steps:
      - name: Setup Python
        uses: actions/setup-python@v6
        with:
          python-version: ${{ matrix.python-version }}


      - name: Print Python Version
        run: python --version

      - name: Intentional failure
        if: matrix.python-version == '3.11' && matrix.os == 'ubuntu-latest'
        run: exit 1


git add - commit - push to feature/matrix-fail-fast and create pr and merge it to main

Check on github - actions - Python Matrix - Run workflow tab to run workflow - select main branch
can see python 3.10 - windows jobs excluded and 3.11 - ubuntu job exited but other jobs run due to fail-fast: false

++++

have update fail-fast: true

git add - commit - push to feature/matrix-fail-fast and create pr and merge it to main

Check on github - actions - Python Matrix - Run workflow tab to run workflow - select main branch

can see python 3.12 -ubuntu success (seems it run faster than 3.11 -ubuntu) and then 3.11 - ubuntu fail and other jobs didnt run - shows exclamatery mark.


fail-fast: true — default

If one matrix job fails, GitHub cancels in-progress and queued matrix jobs. This helps save time and resources when continuing the remaining matrix combinations is unnecessary.

fail-fast: false

If one matrix job fails, GitHub allows the other matrix jobs to continue running. This is useful when you want to see the results of every matrix combination, even if one fails.

----------------------------------------------------------------------------------------------------------
