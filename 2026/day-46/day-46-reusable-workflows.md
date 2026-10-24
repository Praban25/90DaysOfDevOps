Day 46 – Reusable Workflows & Composite Actions

# Task 1: Understand workflow_call

Before writing any code, research and answer in your notes:

What is a reusable workflow?
What is the workflow_call trigger?
How is calling a reusable workflow different from using a regular action (uses:)?
Where must a reusable workflow file live?

==>

1. What is a reusable workflow?
	* What it is: A template workflow that you can run from inside other workflows. Instead of copy-pasting the exact same YAML code across multiple repositories or projects, 
	you write it once and call it whenever needed.

	* Why & When to use it: Imagine you manage 10 microservices, and every single one needs to run a security vulnerability scan and push a Docker image before deploying. 
	Instead of maintaining 10 identical sets of code, you create one reusable workflow. If your security scanning tool updates, you only update it in one place.

	* How it works: It acts like a function in programming—you pass inputs to it, it runs its jobs, and it returns the result.
	
2. What is the workflow_call trigger?
	* What it is: A special trigger (on: workflow_call) that tells GitHub: "This workflow cannot be triggered by a normal push or pull request directly; it is waiting to be 
	called by another workflow."

	* Why & When to use it: It acts as the "open for business" sign for your reusable workflow. Without on: workflow_call, GitHub won't allow other workflows to invoke it.

	* How it looks in code:

YAML
on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string
		
This also lets you define inputs and secrets that the calling workflow must pass down.

3. How is calling a reusable workflow different from using a regular action (uses:)?
	While both use the uses: keyword, they operate at completely different levels:
	
=================================================================================================================================================================
FEATURE              | REGULAR ACTION (uses: actions/checkout@v4)                       | REUSABLE WORKFLOW (uses: ./.github/workflows/deploy.yml)
=================================================================================================================================================================
What is it?          | A single tool or script written in JavaScript or Docker.         | An entire workflow containing multiple jobs, steps, and runners.
---------------------+------------------------------------------------------------------+----------------------------------------------------------------
Where does it run?   | Runs as a single step inside one of your job's timeline.         | Runs as a separate workflow graph with its own independent jobs.
---------------------+------------------------------------------------------------------+----------------------------------------------------------------
Use case             | Checking out code, setting up Node.js, uploading artifacts.      | Orchestrating an entire pipeline stage (e.g., Build, Test, Deploy).
=================================================================================================================================================================

4. Where must a reusable workflow file live?
	To be successfully called, a reusable workflow file must follow specific location rules:

	* It must live inside the .github/workflows/ directory.

	* Same repository: It can live in the exact same repository as the caller workflow (referenced like uses: ./.github/workflows/build-template.yml).

	* Different repository: It can live in a completely different, centralized repository (e.g., a shared DevOps repo), provided that:

		1. The repository is Public, or Internal (if you are on GitHub Enterprise).

		2. The calling workflow has permission to access that repository.
			(Referenced like uses: my-org/shared-workflows/.github/workflows/docker-build.yml@main)
			
-------------------------------------------------------------------------------------------------------

# Task 2: Create Your First Reusable Workflow

Create .github/workflows/reusable-build.yml:

Set the trigger to workflow_call
Add an inputs: section with:
app_name (string, required)
environment (string, required, default: staging)
Add a secrets: section with:
docker_token (required)
Create a job that:
Checks out the code
Prints Building <app_name> for <environment>
Prints Docker token is set: true (never print the actual secret)
Verify: This file alone won't run — it needs a caller. That's next.

==>

Using github-actions-practise repo

Go to main branch and then create branch as feature\reusable-build

Then..
vi .github/workflows/reusable-build.yml


name: Reusable Build Pipeline

on:
  workflow_call:
    inputs:
      app_name:
        description: 'The name of the application being built'
        required: true
        type: string
      environment:
        description: 'The Target Enviornment (staging or production)'
        required: true
        default: 'staging'
        type: string
    secrets:
      docker_token:
        description: 'Docker Hub token for authentication'
        required: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Print Build Details
        run: |
          echo "Building ${{ inputs.app_name }} for {{ inputs.environment }}"

      - name: Verify Docker Token Safely
        env:
          DOCKER_TOKEN: ${{ secrets.docker_token }}
        run: |
          if [ -n "$DOCKER_TOKEN" ]; then
            echo "Docker token is set: true"
          else
            echo "Docker token is set: false"
          fi

------------------------------------------------------------------------------------------

# Task 3: Create a Caller Workflow

Create .github/workflows/call-build.yml:

Trigger on push to main
Add a job that uses your reusable workflow:
jobs:
  build:
    uses: ./.github/workflows/reusable-build.yml
    with:
      app_name: "my-web-app"
      environment: "production"
    secrets:
      docker_token: ${{ secrets.DOCKER_TOKEN }}
Push to main and watch it run
Verify: In the Actions tab, do you see the caller triggering the reusable workflow? Click into the job — can you see the inputs printed?

==>

create another wf as suggested:

vi .github/workflows/call-build.yml


name: Call Build Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build:
    uses: ./.github/workflows/reusable-build.yml
    with:
      app_name: "my-web-app"
      environment: "production"
    secrets:
      docker_token: ${{ secrets.DOCKER_TOKEN }}
	  

Git add . - git commit and git push to feature\reusable-build.
Create PR and merge to the main

	* Go to your GitHub repository and click on the Actions tab. You will see Call Build Pipeline running.
		* Click into the running workflow. You will see that it successfully invoked the reusable workflow, passed the inputs, and printed:		
		* Building my-web-app for production
		* Docker token is set: true

------------------------------------------------------------------------------------------------------

# Task 4: Add Outputs to the Reusable Workflow

Extend reusable-build.yml:

Add an outputs: section that exposes a build_version value
Inside the job, generate a version string (e.g., v1.0-<short-sha>) and set it as output
In your caller workflow, add a second job that:
Depends on the build job (needs:)
Reads and prints the build_version output
Verify: Does the second job print the version from the reusable workflow?

==>

Update .github/workflows/reusable-build.yml as per below.


name: Reusable Build Pipeline

on:
  workflow_call:
    inputs:
      app_name:
        description: 'The name of the application being built'
        required: true
        type: string
      environment:
        description: 'The Target Enviornment (staging or production)'
        required: true
        default: 'staging'
        type: string
    secrets:
      docker_token:
        description: 'Docker Hub token for authentication'
        required: true
    outputs:
      build_version:
        description: 'The version string generated during the build'
        value: ${{ jobs.build.outputs.version }}

jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      version: ${{ steps.generate_version.outputs.built_ver }}
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Generate Build Version
        id: generate_version
        run: |
          # Creates a version like v1.0-abc1234 using the short git commit SHA
          SHORT_SHA=$(git rev-parse --short HEAD)
          VERSION="v1.0-$SHORT_SHA"
          echo "Generated version: $VERSION"
          echo "built_ver=$VERSION" >> $GITHUB_OUTPUT          

      - name: Print Build Details
        run: |
          echo "Building ${{ inputs.app_name }} for ${{ inputs.environment }}"

      - name: Verify Docker Token Safely
        env:
          DOCKER_TOKEN: ${{ secrets.docker_token }}
        run: |
          if [ -n "$DOCKER_TOKEN" ]; then
            echo "Docker token is set: true"
          else
            echo "Docker token is set: false"
          fi


Update .github/workflows/call-build.yml as per below:

name: Call Build Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build:
    uses: ./.github/workflows/reusable-build.yml
    with:
      app_name: "my-web-app"
      environment: "production"
    secrets:
      docker_token: ${{ secrets.DOCKER_TOKEN }}

  print-version:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Read Output from Usable workflow
        run: |
          echo "The reusable workflow successfully generated version: ${{ needs.build.outputs.build_version }}"



git add - commit - push to feature\reusable-build, Raise PR and push to Main.

	* Go to your GitHub repository's Actions tab.
	* Click into your running workflow.
	* Once both jobs finish, click into the print-version job and look at the logs. It successfully print the version string (e.g., v1.0-xxxxxxx) passed up from the reusable workflow.
	
	-------------------------------------------------------------------------------------------------
	
# Task 5: Create a Composite Action

Create a custom composite action in your repo at .github/actions/setup-and-greet/action.yml:

Define inputs: name and language (default: en)
Add steps that:
Print a greeting in the specified language
Print the current date and runner OS
Set an output called greeted with value true
Use the composite action in a new workflow with uses: ./.github/actions/setup-and-greet
Verify: Does your custom action run and print the greeting?

==>

Create feature\composite-action first and jump on it.
Create a folder structure and file at .github/actions/setup-and-greet/action.yml

name: 'Setup and Greet'
description: 'A custom composite action that greets, prints system details, and sets an output.'

inputs:
  name:
    description: 'The name of the person to greet'
    required: true
  language:
    description: 'The language code for the greeting (en, es, fr)'
    required: false
    default: 'en'

outputs:
  greeted:
    description: 'Indicates if the greeting completed successfully'
    value: ${{ steps.greet_step.outputs.greeted_status }}

runs:
  using: "composite"
  steps:
    - name: Print Greeting and System Info
      id: greet_step
      shell: bash
      run: |
        # Handle simple multi-language support based on input
        LANG_CODE="${{ inputs.language }}"
        NAME="${{ inputs.name }}"
        
        if [ "$LANG_CODE" = "es" ]; then
          echo "¡Hola, $NAME!"
        elif [ "$LANG_CODE" = "fr" ]; then
          echo "Bonjour, $NAME!"
        else
          echo "Hello, $NAME!"
        fi

        # Print current date and runner operating system
        echo "Current Date: $(date)"
        echo "Runner OS: ${{ runner.os }}"

        # Set the output variable for downstream steps
        echo "greeted_status=true" >> $GITHUB_OUTPUT



Create workflow as below:
vi .github/workflows/test-composite.yml

name: Test Composite Action Pipeline

on:
  push:
    branches: [ main ]

jobs:
  run-custom-action:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Run Setup and Greet Action
        id: my_custom_action
        uses: ./.github/actions/setup-and-greet
        with:
          name: "Developer"
          language: "en"

      - name: Verify Action Output
        run: |
          echo "The composite action reported back 'greeted': ${{ steps.my_custom_action.outputs.greeted }}"


git add - commit - push to feature\composite-action. Raise PR and merge to main.

	* Navigate to your repository on GitHub and open the Actions tab.
	* Click into the Test Composite Action Pipeline workflow.
	* Expand the Run Setup and Greet Action step. You will see it successfully execute the bash script, print the greeting, output the current date and runner OS (Linux), and pass 
	  the greeted: true status back up to your final step!
	  
-----------------------------------------------------------------------------------------------------------

# Task 6: Reusable Workflow vs Composite Action

============================================================
REUSABLE WORKFLOW VS. COMPOSITE ACTION - QUICK REFERENCE
============================================================

1. TRIGGERED BY:
   - Reusable Workflow : workflow_call
   - Composite Action  : uses: inside a step

2. CAN CONTAIN JOBS?
   - Reusable Workflow : Yes (Manages entire job graphs)
   - Composite Action  : No (Runs inside a single step of an existing job)

3. CAN CONTAIN MULTIPLE STEPS?
   - Reusable Workflow : Yes (Inside its individual jobs)
   - Composite Action  : Yes (Bundles multiple runner steps together)

4. LIVES WHERE?
   - Reusable Workflow : .github/workflows/
   - Composite Action  : Any directory (commonly .github/actions/)

5. CAN ACCEPT SECRETS DIRECTLY?
   - Reusable Workflow : Yes (Via explicit 'secrets:' block)
   - Composite Action  : No (Secrets must be passed via step-level 'env' or inputs)

6. BEST FOR:
   - Reusable Workflow : Standardizing entire pipeline templates or multi-job CI/CD stages across repos.
   - Composite Action  : DRYing up repetitive blocks of steps within a single workflow (e.g., tool setups, login scripts).
==================================================================================================================

