Day 26 – GitHub CLI: Manage GitHub from Your Terminal

Task 1: Install and Authenticate

Install the GitHub CLI on your machine
Authenticate with your GitHub account
Verify you're logged in and check which account is active

Answer in your notes: What authentication methods does gh support?

==> 

sudo apt update
sudo apt install curl gpg -y		--> Update your package list and install prerequisites

sudo mkdir -p -m 755 /etc/apt/keyrings
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo gpg --dearmor -o /etc/apt/keyrings/githubcli-archive-keyring.gpg
sudo chmod go+r /etc/etc/apt/keyrings/githubcli-archive-keyring.gpg		--> Download and add the official GitHub archive keyring

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null		--> Add the GitHub CLI repository to your sources

sudo apt update
sudo apt install gh -y		--> Update your package list again and install gh

gh auth login		--> Authenticate with GitHub

gh auth status		--> Verify the Connection

++++

Interactive Web/Device Code Authentication: The CLI generates a unique device code, opens a browser link (or prompts you to open one), and securely links your local CLI instance to your GitHub account via OAuth.

Personal Access Tokens (PATs): You can manually generate a Classic Token or a Fine-Grained Token on GitHub.com and paste it directly into the CLI, or pass it via the GH_TOKEN or GITHUB_TOKEN environment variables (ideal for automation and CI/CD pipelines).

SSH Keys (Indirectly for Git Operations): While you authenticate the CLI app itself using the options above, gh can generate, add, and use SSH keys to handle the underlying Git push/pull traffic if selected during setup.

------------------------------------------------------------------------

Task 2: Working with Repositories

Create a new GitHub repo directly from the terminal — make it public with a README
Clone a repo using gh instead of git clone
View details of one of your repos from the terminal
List all your repositories
Open a repo in your browser directly from the terminal
Delete the test repo you created (be careful!)

==>


gh repo create cli-test-repo --public --add-readme		--> new repo created from cli, public accessible with readme

gh repo clone Praban25/cli-test-repo				--> clone mention repo with cli

gh repo view Praban25/cli-test-repo				--> details of mention repo through cli

gh repo list							--> List all repos
gh repo list --limit 50						--> default limit of list is 30. To see more than that  use --limit flag

gh repo view Praban25/cli-test-repo --web			--> To open repo in browser directly from terminal

gh repo delete Praban25/cli-test-repo				--> TO delete the test repo

-----------------------------------------------------------------------------

Task 3: Issues

Create an issue on one of your repos from the terminal — give it a title, body, and a label
List all open issues on that repo
View a specific issue by its number
Close an issue from the terminal

Answer in your notes: How could you use gh issue in a script or automation?

==>

Note : if you are on the local and inside the repo then you can exclude "-R your-username/my-test-repo" as it will pick the current repo.

gh issue create -R your-username/my-test-repo --title "Bug: Login button not working" --body "The login button on the homepage is unresponsive when clicked on mobile devices." --label "bug"		--> Created an issue on one of your repos from the terminal — give it a title, body, and a label

gh issue list -R your-username/my-test-repo		--> List all open issues on that repo

gh issue view 1 -R your-username/my-test-repo		--> View a specific issue by its number

gh issue close 1 -R your-username/my-test-repo		--> Close an issue from the terminal

--------------------------------------------------------------------------------

Task 4: Pull Requests

Create a branch, make a change, push it, and create a pull request entirely from the terminal
List all open PRs on a repo
View the details of your PR — check its status, reviewers, and checks
Merge your PR from the terminal

Answer in your notes
What merge methods does gh pr merge support?
How would you review someone else's PR using gh?

==>

git checkout -b feature-cli-demo		--> To create new branch and switch on it
then make some changes in any file (Readme.md) - commit the changes and push it to the feature branch.

gh pr create --title "Feature: gh cli practice" --body "Practise to create PR from CLI / alternative for UI"  --> Create PR from CLI
gh pr list				--> To check the list of open PR's on this repo
gh pr status				--> To check the PR status
gh pr view 2				--> To check the particular PR with its number
gh pr merge 2				--> To merge the PR from cli
gh pr merge 2 --squash			--> can flag your merge method directly (--squash  here)


gh pr merge supports below methods:
Merge commit
Rebase
Squash

2. review someone else's PR using gh:

gh pr list
gh pr view 44
gh pr checkout 44		-->To actually test the code or look at it in your local IDE (like VS Code), use the checkout command. gh will automatically handle pulling down their branch for you
gh pr diff			--> To see exactly what lines of code were added, modified, or deleted, view the diff directly in your terminal
gh pr review 44 --approve -b "Looks fantastic, everything tests out perfectly!"		--> Once you are done inspecting the changes, you can submit your official GitHub review
gh pr review 44 --changes-requested -b "Please fix the typo in the file and update."	--> To Request Changes
gh pr review 44 --comment -b "Left a few more comments for future reference."		--> To Leave a General Comment

--------------------------------------------------------------------------------

Task 5: GitHub Actions & Workflows (Preview)

List the workflow runs on any public repo that uses GitHub Actions
View the status of a specific workflow run

Answer in your notes: How could gh run and gh workflow be useful in a CI/CD pipeline?
(Don't worry if you haven't learned GitHub Actions yet — this is a preview for upcoming days)

==>

gh run list -R cli/cli				--> To view recent workflow runs for a public repository
gh run list -R cli/cli --branch main		--> Filter by branch
gh run list -R cli/cli --event pull_request	--> Filter by events
gh run list -R cli/cli --limit 50		--> Increase the results limit. By default, it shows the 20 most recent runs.
gh run view 123456789 -R cli/cli		--> To view an interactive summary of a specific run
gh run view 123456789 -R cli/cli --log		--> If a run fails and you want to look at the continuous integration logs directly inside your terminal window without opening a browser, append the log flag
gh run watch 123456789 -R cli/cli		--> If a workflow is actively in progress and you want to watch the logs stream live on your terminal until it completes, use the watch command


How could gh run and gh workflow be useful in a CI/CD pipeline? :



-------------------------------------------------------------------------------------

Task 6: Useful gh Tricks

Explore and try these — add the ones you find useful to your git-commands.md:

gh api — make raw GitHub API calls from the terminal
gh gist — create and manage GitHub Gists
gh release — create and manage releases
gh alias — create shortcuts for commands you use often
gh search repos — search GitHub repos from the terminal


==>

gh alias set il "issue list"		--> create an alias called "il" that lists your open issues
gh search repos "react dashboard"	--> Search for repositories matching a keyword (e.g., "react dashboard")
gh search repos "react dashboard" --language=typescript --stars=">500"		--> to serch repos TypeScript projects with more than 500 stars
gh search repos "react dashboard" --limit 5		--> By default, it shows 30 results. Limit it to the top 5 to keep your terminal clean
gh gist create script.js --public		--> To upload a local file (e.g., script.js) as a public Gist 
gh gist list				--> To see a list of your recently created Gists
echo "Error: Database connection failed" | gh gist create --desc "Log file"		--> You can also pipe text directly into a Gist. Great for sharing error logs
gh release create v1.0.0 --generate-notes --draft		--> Create a new release tagged v1.0.0. We'll generate the changelog notes automatically from your commit history
gh release upload v1.0.0 ./dist/my-app.zip		--> If you have a compiled file, zip, or installer to share, attach it to that release
gh release edit v1.0.0 --draft=false			--> Once everything looks good, take it out of draft status and publish it
gh api user				--> Test the API by requesting your own public profile details
gh api user --jq '.public_repos'	--> GitHub sends back a lot of JSON data. You can filter it right in the terminal using the --jq flag
gh api -X PUT /user/starred/cli/cli	--> To create something new, like putting a star on a repository, send a POST request using the -X flag

------------------------------------------------------------------------------

