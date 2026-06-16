Day 24 – Advanced Git: Merge, Rebase, Stash & Cherry Pick

Task 1: Git Merge — Hands-On

Create a new branch feature-login from main, add a couple of commits to it
Switch back to main and merge feature-login into main
** Observe the merge — did Git do a fast-forward merge or a merge commit?
Now create another branch feature-signup, add commits to it — but also add a commit to main before merging
Merge feature-signup into main — what happens this time?

Answer in your notes:
What is a fast-forward merge?
When does Git create a merge commit instead?
What is a merge conflict? (try creating one intentionally by editing the same line in both branches)

==>

git pull origin master		--> to check all up to date on master branch

git switch -c feature-login	--> to create and switch feature-login branch
Created first-commit file and committed.
Created second-commit file and committed.

git switch master
git merge feature-login

** here git do fast forward as a result -- checked.


git switch -c feature-signup
created file and commit it on feature sign up
Jump back to master branch and created one file and commit it to the master branch.
git merge feature-signup	--> ask git to merge feature-signup branch and it opens nano editor.
have just hit Cntr + x to close that and git merge both the commit
git log --oneline --graph --all		--> To check the git log with graph it shows proper view of both the commits

++++

In my words, fast forward merge means that which we can merge directly on local without Pull request. target branch has not received any new commits since the feature branch was created.
Merge commit :
You created a feature branch from main.
You added commits to your feature branch.
Crucially, someone else (or you) added new commits directly to main in the meantime.
Because both branches have unique histories, Git cannot simply move a pointer forward. It must create a brand new commit—a Merge Commit—that has two parent commits and ties the two distinct histories back together.

A Merge Conflict happens during a three-way merge when Git gets confused. If you change a line of code on your feature branch, and someone else changes the exact same line of code on main in a different way, Git doesn't know which version is the correct one to keep. It stops the merge and asks you to decide.
To resolve conflict, i have switch to master branch - have open the file which are in diff and then provided the expected changes and save. Then git add and commit again
git log --oneline --graph --all 	--> to get the graphical view slightly of all commits history

*********************************************************************************

Task 2: Git Rebase — Hands-On

Create a branch feature-dashboard from main, add 2-3 commits
While on main, add a new commit (so main moves ahead)
Switch to feature-dashboard and rebase it onto main
Observe your git log --oneline --graph --all — how does the history look compared to a merge?

Answer in your notes:
What does rebase actually do to your commits?
2. How is the history different from a merge?
3. Why should you never rebase commits that have been pushed and shared with others?
4. When would you use rebase vs merge?

==>

switch to feature-dashboard branch and run
git rebase master		--> it will rebase the commit history. Master commit first and then followed by feature-dashboard commits.
Head moves to feature branch last commit as observe.


As observe, from feature to master,  after git rebase, Git literally rewrites your project history by creating brand-new commits behind the scenes.
Git commits take master commit first and then write the feature branch commits in git log also git head points to the feature branch commits last commit.

2. Git Merge : logs shows Y shape branch splitting and joining back together, Created new commit to tie the two branch together, its shows the exact history of commits

Git Rebase : It rewrite the git commit history and shows in straight line, does not create merge commit like git merge (while tie 2 branch together), its not the exact history we can see in logs.

3. Why should you never rebase shared commits as it literally rewrite the commit history and which is not exactly the time line and align. Also it will broke the commits history to the others who are worked on it already. it gets mess.

4. Rebase use when : 
	* You want a clean history
	* can use an interactive rebase (git rebase -i) to squash, rename, or fix up messy local WIP commits before 	 	  showing your code to reviewers.
   Merge use when : 
	* If multiple developers are actively pushing and pulling from the feature branch, always use merge.
	* You want total historical accuracy
	
**************************************************************************

Task 3: Squash Commit vs Merge Commit

Create a branch feature-profile, add 4-5 small commits (typo fix, formatting, etc.)
Merge it into main using --squash — what happens?
Check git log — how many commits were added to main?

Now create another branch feature-settings, add a few commits
Merge it into main without --squash (regular merge) — compare the history

Answer in your notes:
What does squash merging do?
2. When would you use squash merge vs regular merge?
3. What is the trade-off of squashing?

==>

git merge --squash feature-profile

how many commits were added to main?  --> only one commit can see added to the main

Merge it into main without --squash (regular merge) — compare the history :
git merge feature-settings --> its a fast forward merge and all commits can see on main branch. feature branch create commit to last commit in feature branch all can see in main branch commits

squash merge : it takes all feature merge together and create one merge on main
squash merge we can do when we dont like to show that we created new branch and once we commit the squash we can delete that branch too.
Due to squash we cant preserve the small small commits while developing the main branch through feature branch as it will combine all feature branch commits into one commit in main branch. Also if we delete that feature branch after committing to the main then it will show only one commit on main and if then after very difficult to check how the new feature or development happens in past.

*************************************************************************

Task 4: Git Stash — Hands-On

Start making changes to a file but do not commit
Now imagine you need to urgently switch to another branch — try switching. What happens?
Use git stash to save your work-in-progress
Switch to another branch, do some work, switch back
Apply your stashed changes using git stash pop
Try stashing multiple times and list all stashes
Try applying a specific stash from the list

Answer in your notes:
What is the difference between git stash pop and git stash apply?
2. When would you use stash in a real-world workflow?

==>

git stash		--> to save your unfinished work in current branch
git stash save "comments"		--> to save your stash with certain comments to recognize later
git stash pop		--> to get your unfinished work back
git stash list		--> to check the stash lists
git stash apply stash@{2}	--> to apply specific stash from the list
git stash clear		--> to empty your stashes from the git memory 

git stash pop : gives you the last stash back but it will not save it. Once it pop out it will get erase from the memory
   git stash apply : allows you to select specific stash if number of stash you saved with comments. It will remain in your stash list

2. We use stash when any unfinished work need to save and have to jump on another branch in case of high priority task like production issue arises

*****************************************************************************

Task 5: Cherry Picking

Create a branch feature-hotfix, make 3 commits with different changes
Switch to main
Cherry-pick only the second commit from feature-hotfix onto main
Verify with git log that only that one commit was applied

Answer in your notes:
What does cherry-pick do?
2. When would you use cherry-pick in a real project?
3. What can go wrong with cherry-picking?

==>

switch to main branch
git cherry-pick <commit_id_from_feature_branch>	--> It will add that specific commit from the feature branch to the main branch
git cherry-pick -x <commit-ID>		--> This automatically appends a line to the commit message saying (cherry picked from commit ...)


Cherry pick : It will pick the exact commit which id in the command from feature branch and put the same in main branch
We use cherry pick when any feature branch is not yet ready to merge but one of its commit or feature need to merge urgently on main branch.
Cherry pick sometime crates issue like missing dependencies. Also once you cherry pick one commit and later while merging the feature branch it will duplicate that code. Git knows that its the same changes but still record different commit id which make duplication of your code.

********************************************************************************

