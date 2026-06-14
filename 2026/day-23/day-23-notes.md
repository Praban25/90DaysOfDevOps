Day 23 – Git Branching & Working with GitHub

Task 1: Understanding Branches
Answer these in your day-23-notes.md:

What is a branch in Git?
2. Why do we use branches instead of committing everything to main?
3. What is HEAD in Git?
4. What happens to your files when you switch branches?

==>

In GIT, Branch is a same copy of the existing or master branch. Once we create the branch then after we can make changes or tests new features on it and then commit and push so that the main branch remain steady and working (Clean project). Whenever we create any new repository, git creates a default branch named Main or Master

2.
Branch makes you test new features, bug fixes without messing it to the Main branch. So that no harm to the main (stable version of the project) branch and if any test / experiment fails we can simply delete the newly created branch.
It allows you to work on different features parallelly. So that work can get easy and distributed within team.
It allows us to use Pull Requests. So that before the new feature merging to the main, teammates can review, test and make sure it should be bug free.


3. HEAD is the current commit. It is the GIT way of tracking which branch you are currently working on. If you make new commit then the HEAD moves to the new Commit.

4. When switch branch, git updates the present working directory and physically update, delete or add the files in your folder which are matching exactly to the state of commit. Also if you make change and try to switch branch then git stop you and ask you to commit the changes or stash then before switching the branch.

*****************************************************************

Task 2: Branching Commands — Hands-On
In your devops-git-practice repo, perform the following:

List all branches in your repo
Create a new branch called feature-1
Switch to feature-1
Create a new branch and switch to it in a single command — call it feature-2
Try using git switch to move between branches — how is it different from git checkout?
Make a commit on feature-1 that does not exist on main
Switch back to main — verify that the commit from feature-1 is not there
Delete a branch you no longer need
Add all branching commands to your git-commands.md

==>

git branch		--> to see all local branches
git branch -a		--> to see all local and remote branches

git branch feature-1	--> To create new branch name feature-1
git switch feature-1	--> To switch to the branch feature-1
git checkout -b feature-2	--> To create and switch to the new branch name feature-2
git switch -c <branch-name> | Creates a new branch and switches to it immediately. |
git checkout -b <branch-name> | The older equivalent to create and switch to a branch. |
git branch -d <branch-name> | Deletes a branch safely (fails if there are unmerged changes). |
git branch -D <branch-name> | Force-deletes a branch, discarding any unmerged changes. |

********************************************************************

Task 3: Push to GitHub

Create a new repository on GitHub (do NOT initialize it with a README)
Connect your local devops-git-practice repo to the GitHub remote
Push your main branch to GitHub
Push feature-1 branch to GitHub
Verify both branches are visible on GitHub
Answer in your notes: What is the difference between origin and upstream?

==>

cd devops-git-practice
git init
git remote add origin git@github.com:Praban25/git_practise.git
ssh-keygen already updated in GitHub so using that only
git switch -c feature-branch-1
touch feature-branch-test
echo "Testing feature branch" > feature-branch-test
git status
git add feature-branch-test
git commit -m "Feature branch created and testing new file"
git push -u origin feature-branch-1 

checked on GitHub..

Origin is the main code (Stable) and upstream is the copy of the main code which is use for create new feature or bug fixes and once its done, create pull request which then after goes to review with senior colleague and after approval get merge to main / master branch

***************************************************************************

Task 4: Pull from GitHub

Make a change to a file directly on GitHub (use the GitHub editor)
Pull that change to your local repo
Answer in your notes: What is the difference between git fetch and git pull?

==>

git pull = git fetch + git merge

Make some changes like new file on feature branch and commit on GitHub
on local -  go to the local repo directory
git pull origin feature-branch-1	--> it will pull all the changes from GitHub to your local and your local files get change too

Git fetch : It reaches out to the remote repository (GitHub) and downloads all the new commits, branches, and tags that your team members have pushed.

Git pull : It downloads all remote data and make physically changes on your local repo too. Risk is if any of your colleague make changes on the file where you are also working then it will show you merge conflict

Have tested by committing changes on the test file on same line on GitHub and then local. Then tried to pull from GitHub. It shows 

**************************************************************************

Task 5: Clone vs Fork

Clone any public repository from GitHub to your local machine
Fork the same repository on GitHub, then clone your fork
Answer in your notes:
What is the difference between clone and fork?
When would you clone vs fork?
After forking, how do you keep your fork in sync with the original repo?


==>

Forking is a GitHub-side action. When you fork a repository, you are creating a complete copy of someone else's project under your own GitHub account. It lives on GitHub's servers, not your computer.

Cloning is a Git action that downloads a repository (either the original one or your forked one) from a remote server (like GitHub) down onto your local machine so you can physically edit the files.


git remote add upstream https://github.com/OriginalOwner/original-repo.git	--> Link your local repo to the original project
git fetch upstream		--> Download all the new commits from the original project without touching your local code yet.
git switch master		--> Ensure you are on your primary branch (usually main or master).
git merge upstream/main		--> Combine the original project's updates into your local branch.
git push origin main		--> Push these newly merged changes back up to your fork on GitHub so your cloud version is also up to date.

****************************************************************************
