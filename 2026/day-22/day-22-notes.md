Day 22 – Introduction to Git: Your First Repository

Task 1: Install and Configure Git

1. Verify Git is installed on your machine
2. Set up your Git identity — name and email
3. Verify your configuration

==>

1. git --version	--> Shows you git version if its already installed

if git not installed
sudo apt get install git	--> To install git on your system (ubuntu)

++++

2.
git config --global user.name  "Your Name"		--> To add git username to use in global
git config --global user.email "you@example.com"	--> To add git useremail to use in global

3.
git config user.name		--> To check the specific for user.name
git config user.email		--> To check the specific for user.email

git config --list		--> To see all global configurations at once

*************************************************************************************

Task 2: Create Your Git Project

Create a new folder called devops-git-practice
Initialize it as a Git repository
Check the status — read and understand what Git is telling you
Explore the hidden .git/ directory — look at what's inside

==>

mkdir devops-git-practice
cd devops-git-practice
git init		--> To initialize it as git repository - Initialized empty Git repository in /your/path/devops-git-practice/.git/
git status		--> To check the git status - It says you are currently on default branch, no commits yet, no history and versions and also check if any new or 			    modified files for tracking.

.git/ directory :
This directory is the "brain" of your repository; it stores all your project's history, configuration, and version metadata.
You will see several files and folders. Here is what they do:

HEAD: A file that points to the branch you are currently working on (e.g., ref: refs/heads/main).

config: This file contains your project-specific configurations (like the local repository settings, or remote URLs if you link to GitHub).

description: Only used by the GitWeb program to describe the project; you can safely ignore this.

hooks/: A folder containing example scripts that Git can trigger automatically before or after actions like committing or pushing code.

info/: Contains a global exclude file for patterns you don't want Git to track (similar to a .gitignore file).

objects/: The core database. This is where Git stores the actual content of your files and your commit history as compressed files. Right now, it is mostly empty.

refs/: Short for references. This directory stores pointers to your branches, tags, and remote commits.

*************************************************************************

Task 3: Create Your Git Commands Reference

Create a file called git-commands.md inside the repo
Add the Git commands you've used so far, organized by category:
Setup & Config
Basic Workflow
Viewing Changes
For each command, write:
What it does (1 line)
An example of how to use it

==>

Have created new repository as git_practise in which git-commnds.md file created and putting git commands which am going to use and learn with some one line explanation for quick understanding.

*************************************************************************

Task 4: Stage and Commit

Stage your file
Check what's staged
Commit with a meaningful message
View your commit history

==>

git add <file_name>		--> To make that file tracked and staging
git add .			--> can use this for add all the untracked files to track and staging.

git status			--> To check the current status of our changes - like files are untracked or added for staging
git rm --cached <file_name>	--> if you like to unstage (untracked) some file which is by mistakenly get staging.

git commit -m "Meaningful message"	--> This make sure that after commit takes everything in your staging area and saves it as a permanent snapshot in your 					    project's history
git log				--> It will display a detailed record of your commit.
git log --oneline		--> Compact view of your git log

(HEAD -> main):
This pointer indicates that your local workspace is currently looking at this exact commit on the main branch.

************************************************************************

Task 5: Make More Changes and Build History

Edit git-commands.md — add more commands as you discover them
Check what changed since your last commit
Stage and commit again with a different, descriptive message
Repeat this process at least 3 times so you have multiple commits in your history
View the full history in a compact format

==>

vi git-commands.md 		--> add more command as you work on and learned.
git status			--> to check if any changes in your local repo
git add <file_name>		--> to add the file in staging / tracked
git commit -m "commit message"	--> give meaningful message for this commit - what it is exactly for

Repeat the above for 2 more time

git log --oneline		--> gives you compact view of your all above commits.

************************************************************************

Task 6: Understand the Git Workflow
Answer these questions in your own words (add them to a day-22-notes.md file):

What is the difference between git add and git commit?
2. What does the staging area do? Why doesn't Git just commit directly?
3. What information does git log show you?
4. What is the .git/ folder and what happens if you delete it?
5. What is the difference between a working directory, staging area, and repository?

==>

git add : git add looks for changes and the tells git that these changes need to include for the permanent snapshot in next stage (i.e. git commit)
   git commit : permanently saves your changes. It takes everything you previously prepared with git add, bundles it together, and writes a permanent snapshot into 		your project’s history timeline with a descriptive message.

2. Staging area is useful to work on multiple files and it gives us chance to review the changes again. with git diff we can review the same before committing it to the clean project.

3. git log show you below :
The Commit Hash (a unique 40-character SHA-1 ID used to identify that specific snapshot).
The Author (the name and email of the person who made the change).
The Date and Time when the commit was created.
The Commit Message explaining what changes were made.
The HEAD pointer, which shows which branch or commit you are currently looking at.

4. The .git/ folder is the hidden brain database of your repository. It contains all the internal configurations, references to branches, and the compressed binary files of your entire commit history.

If you delete .git/ folder then :
You will completely lose all version history, all past commits, all branches, and your ability to travel back in time or push to remote servers like GitHub. To Git, it becomes just a regular, untracked folder.

5. Working Directory: This is your actual local folder on your computer's filesystem. It's where you actively create, delete, and modify files using your code editor. It represents the current, messy state of your project.

Staging Area (Index): A hidden file inside the .git/ directory that tracks the changes you intend to include in your next commit. It is the preparation phase.

Repository (Git Directory): This is the permanent database (the .git/ folder) where Git stores all metadata and the complete history of your project's commits. Once something is here, it is safely recorded.

******************************************************************************