Day 25 – Git Reset vs Revert & Branching Strategies

Task 1: Git Reset — Hands-On

Make 3 commits in your practice repo (commit A, B, C)
Use git reset --soft to go back one commit — what happens to the changes?
Re-commit, then use git reset --mixed to go back one commit — what happens now?
Re-commit, then use git reset --hard to go back one commit — what happens this time?

Answer in your notes:
What is the difference between --soft, --mixed, and --hard?
2. Which one is destructive and why?
3. When would you use each one?
4. Should you ever use git reset on commits that are already pushed?

==>

git reset --soft HEAD~1		--> It will reset to the one step previous commit(HEAD~1) and HEAD file kept on system with staging area
git reset --mixed HEAD~1	--> It will reset to the one step previous commit(HEAD~1) and HEAD file kept on system with untracked area
git reset --hard HEAD~1		--> It will reset to the one step previous commit(HEAD~1) and clean the file too from the system

1.
--soft : will reset to the one step previous commit(HEAD~1) and HEAD file kept on system with staging area
--mixed : will reset to the one step previous commit(HEAD~1) and HEAD file kept on system with untracked area
--hard : will reset to the one step previous commit(HEAD~1) and clean the file too from the system

2. --hard : is most dangerous and destructive as it will clear the commit from commit history as well as the files for that commits get clean from the local.

3. 
--soft : use case when we forgot to add other files too in last commit. Also when we would like some small commits need to be clean and create one commit to see good commit history
--mixed : its a default behaviour for mixed and use case when you like to clear few last commits and also like to add more files in single commit.
--hard : its destructive so use wisely. Use case when you totally mess up the code and like to move to the last successful commit to restart the work.

*****************************************************************************************

Task 2: Git Revert — Hands-On

Make 3 commits (commit X, Y, Z)
Revert commit Y (the middle one) — what happens?
Check git log — is commit Y still in the history?

Answer in your notes:
How is git revert different from git reset?
2. Why is revert considered safer than reset for shared branches?
3. When would you use revert vs reset?

==>

git revert <commit_hash> 		--> to revert the changes in any file. It will preserve the last commit history and create new commit for the same.

Git revert preserve the history and added one more commit. It will useful for public / shared repo working.
The main reason is it preserve the history. So in shared branches, other developers / people are working then with git log they can also come to know the history commits and it will be easy to all of them what, when and why the changes happens in the code.
 
revert : Use git revert for public branches (commits already pushed). It is a safe, non-destructive operation that creates a new commit to undo changes.
reset : Use git reset for local branches (commits not yet pushed). It is a destructive operation that rewrites history by moving your branch pointer backward.

********************************************************************************************

Task 3: Reset vs Revert — Summary

Create a comparison in your notes:

						git reset						git revert
What it does					revert commit to the given Head as per action		its not delete the commit history. it will 
						provided --soft --mixed --hard				create new commit for the changes
	
Removes commit from history?			Yes							No

Safe for shared/pushed branches?		No							Yes

When to use					To reset commit history					To preserve commit history and its safe

*******************************************************************************************

Task 4: Branching Strategies

Research the following branching strategies and document each in your notes with:

How it works (short description)
A simple diagram or flow (text-based is fine)
When/where it's used
Pros and cons
GitFlow — develop, feature, release, hotfix branches
2. GitHub Flow — simple, single main branch + feature branches
3. Trunk-Based Development — everyone commits to main, short-lived branches

Answer:
4. Which strategy would you use for a startup shipping fast?
5. Which strategy would you use for a large team with scheduled releases?
6. Which one does your favorite open-source project use? (check any repo on GitHub)

==>

1. GitFlow
How it works:
A highly structured, feature-heavy branching model designed around releases. It relies on two long-lived branches (main for production, develop for pre-production) and three types of supporting short-lived branches (feature/*, release/*, and hotfix/*).

Visual Flow
Plaintext
main     ───────────────────────────────────► [Production]
              ▲                   ▲
hotfix      └─── [Fix] ─────────┘
              ▲                   ▲
release     │         ┌─ [RC] ──┘
              │         │         ▼
develop  ───┴─────────┴─────────┴───────────► [Next Version]
              ▲         ▲
feature     └── [F1] ─┘
When/Where it's used: Enterprise environments, legacy systems, or software with strict, scheduled release cycles (like mobile apps, embedded firmware, or on-premise software) where continuous deployment isn't viable.

Pros: Great for rigid release tracking; completely isolates features under development from production-ready code; clear, dedicated path for critical emergency fixes.

Cons: High complexity; notorious for massive merge conflicts ("merge hell") when long-running branches finally merge back; fundamentally slows down development speeds.


2. GitHub Flow
How it works:
A lightweight, agile alternative centered entirely around a single production-ready main branch. Developers branch off main for a feature, open a Pull Request (PR) for review and testing, and merge directly back into main to trigger immediate deployment.

Visual Flow
Plaintext
main    ─────────────────────────●──────────► [Production]
             \                   / (Deploy)
feature     └─── [Feature 1] ─┘
When/Where it's used: Modern web applications, SaaS products, and open-source projects where code can be safely integrated and deployed multiple times a day.

Pros: Incredibly simple to learn and execute; minimizes merge overhead; dramatically speeds up feedback loops and delivery velocity.

Cons: main is directly exposed, requiring exceptionally strong automated test suites and monitoring; highly inefficient if you need to support multiple active versions of the same product in production.


3. Trunk-Based Development
How it works:
A high-velocity strategy where developers merge small, frequent code increments directly into a single central branch (the "trunk" or main) multiple times a day. Feature branches are either skipped entirely or kept strictly short-lived (lasting only a few hours), utilizing feature flags to hide uncompleted work from users.

Visual Flow
Plaintext
main (Trunk)  ──●──●──●──●──●──●──●──► [Production]
                  \ /  \ /  \ /
short-lived      ▼    ▼    ▼   (Hours max)
When/Where it's used: High-performing DevOps teams and modern tech companies (like Google and Meta) aiming for authentic Continuous Integration (CI).

Pros: Practically eliminates massive merge conflicts; forces code to be built in small, manageable pieces; ensures maximum transparency across the team.

Cons: Requires immense team discipline and high engineering maturity; completely dependent on flawless automated testing frameworks and a robust architectural mastery of feature flagging.


4. I will use GitHub Flow strategy for a startup shipping fast. It has 2 branches 1 is main and one is feature. Easy to manage and deploy multiple times a day.

5. Will use GitFlow strategy for a large team with scheduled releases. GitFlow creates dedicated, secure spaces (release/* branches) where QA engineers can harden, debug, and stabilize the upcoming version without forcing developers to stop writing code for the next milestone on the develop branch.

6.


***************************************************************************************

Task 5: Git Commands Reference Update

Update your git-commands.md to cover everything from Days 22–25:

Setup & Config
Basic Workflow (add, commit, status, log, diff)
Branching (branch, checkout, switch)
Remote (push, pull, fetch, clone, fork)
Merging & Rebasing
Stash & Cherry Pick
Reset & Revert

==> 

Done. Updated Git commands in git-commands.md and pushed on my GitHub repo

****************************************************************************************
				

