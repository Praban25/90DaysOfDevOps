### Task 1: Self-Assessment Checklist
Go through the checklist below. For each item, mark yourself honestly:
- **Can do confidently**	--> c
- **Need to revisit**		--> r
- **Haven't done yet**		--> y

#### Linux
- [c] Navigate the file system, create/move/delete files and directories
- [c] Manage processes — list, kill, background/foreground
- [c] Work with systemd — start, stop, enable, check status of services
- [c] Read and edit text files using vi/vim or nano
- [c] Troubleshoot CPU, memory, and disk issues using top, free, df, du
- [c] Explain the Linux file system hierarchy (/, /etc, /var, /home, /tmp, etc.)
- [c] Create users and groups, manage passwords
- [c] Set file permissions using chmod (numeric and symbolic)
- [c] Change file ownership with chown and chgrp
- [c] Create and manage LVM volumes
- [c] Check network connectivity — ping, curl, netstat, ss, dig, nslookup
- [r] Explain DNS resolution, IP addressing, subnets, and common ports

#### Shell Scripting
- [c] Write a script with variables, arguments, and user input
- [r] Use if/elif/else and case statements
- [r] Write for, while, and until loops
- [r] Define and call functions with arguments and return values
- [r] Use grep, awk, sed, sort, uniq for text processing
- [r] Handle errors with set -e, set -u, set -o pipefail, trap
- [c] Schedule scripts with crontab

#### Git & GitHub
- [c] Initialize a repo, stage, commit, and view history
- [c] Create and switch branches
- [c] Push to and pull from GitHub
- [c] Explain clone vs fork
- [c] Merge branches — understand fast-forward vs merge commit
- [r] Rebase a branch and explain when to use it vs merge
- [c] Use git stash and git stash pop
- [c] Cherry-pick a commit from another branch
- [r] Explain squash merge vs regular merge
- [c] Use git reset (soft, mixed, hard) and git revert
- [r] Explain GitFlow, GitHub Flow, and Trunk-Based Development
- [r] Use GitHub CLI to create repos, PRs, and issues

---

### Task 2: Revisit Your Weak Spots

1. Pick **3 topics** from the checklist where you marked "Need to revisit"
2. Go back to that day's challenge and redo the hands-on tasks
3. Document what you re-learned in `day-28-notes.md`

==>

Have revisit the DNS section in networking with IP addressing and subnetting :

Revised :
* DNS works for systems - how simple website loads to the browser :
When we type google.com or any web url in the browser(here browser is a client) it check with local cache first --> then go to DNS resolver to find the IP address of that web.
It queries first to Root DNS --> then TLD domain --> then Authoritative serve. Once fond the IP address, it send that IP address to the browser 
which then uses to establish a connection to load that web.

* DNS caching : once the request complete, if user like to revisit the same web then system uses it cache memory to load the ip address.
* TTL : Time to Live -- TTL is an expiration date attached to every DNS record. It tells the DNS Recursor exactly how many seconds it is allowed to keep the IP address in its cache before it must delete it and ask the Authoritative servers for a fresh copy.

* DNS Records :
	* A Record : maps domain to IPv4 address
	* AAAA Record : maps domain to IPv6 address
	* CNAME (Canonical Name): Its an alias that points one domain to another domain instead of IP
	* MX record (Mail exchanger) : Specify the mail server responsible for receiving emails on behalf of your domain name.
	
* IP addressing and subnets:
	*  1. [32 - CIDR number]				32 - 24 = 8
	   2. Formula for Number of hosts		2 raise to 8 = 256
	   3. Number of usable Hosts			256 - 2 = 254
	   
* curl abc.com:8080  --> 
	1. Find IP address from dns resolution
	2. initiate TCP 3-Way Handshake to establish a connection specifically targeting Port 8080
	3. sends an HTTP GET request to retrieve the hosted web content
	
* Unable to reach a database at 10.16.2.44:3306 :
	1. Ping or Traceroute to the DB IP to check if DB is rechable from App server
	2. Run rc -zv 10.16.2.44:3306 or telnet 10.16.2.44 3306 to check if any culprit to block the traffic and the DB service is running and listning on that interface.
		
	
* Scripting :
	* count=$((count - 1))		--> equivalent of writing count = count - 1
	* -z "$1"					--> check if argument is empty?
	* -n "$1"					--> check if argument is not empty.
	* (\$0): "$0"				--> to print the literal text "$0" argument
	* (\$#): "$#"				--> Total number of arguments
	* (\$@): "$@"				--> Print list of arguments
	* "$EUID" -ne 0				--> Effective User ID - 0 for root -- so it check if EUID not equal to 0
	* dpkg -s "$PACKAGE"		--> Check the status of Debian Package
	* set -euo pipefail			--> Bash Strict Mode. -e (Exit on error), -u (Unset Variables), -0 (Pipe Failures)
	
	
* Git Workflows :
	* Git flow
	* GitHub flow
	* Trunk-based
	
---------------------------------------------------------------------------------

Task 3: Quick-Fire Questions

Answer these from memory (no Googling). Then verify your answers:

1. What does chmod 755 script.sh do?
2. What is the difference between a process and a service?
3. How do you find which process is using port 8080?
4. What does set -euo pipefail do in a shell script?
5. What is the difference between git reset --hard and git revert?
6. What branching strategy would you recommend for a team of 5 developers shipping weekly?
7. What does git stash do and when would you use it?
8. How do you schedule a script to run every day at 3 AM?
9. What is the difference between git fetch and git pull?
10. What is LVM and why would you use it instead of regular partitions?
	
==> 

1. It set permissions as User 7(r,w,x), Groups 5(r,x), others 5(r,x)
2. Process is generated when any program initiate. We can identify it by process id which can use to identify resource usage. 
service is generally groups of processes and it control by systemd (systemctl). we can set it auto On while booting the system. It need to be up for long time.
3. sudo ss -tulpn | grep 8080 or sudo lsof -i :8080  (edited as got wrong)
4. -euo -e exit immidiately if any command fails, -u checks for undefine variables, -o checks for pipe falis due to bad commands
5. git reset --hard --> use to return on previous or defined commit, also it will remove git commit history and the files on local.
git revert  --> safe way to revert any existing commit. It preserve commit history and one new commit added for the same. Used for shared repo working.
6. Github flow i will recommend for a team of 5 developers shipping weekly. It can use to share repo work within develpoers with feature branches and for continuous development.
7. Git stash we can use when we like to jump on any another branch and we are middle of something. It will save our current work so that we can jump on another branch. With git stash pop / apply  we can get back that work again.
8. By configuring cronjobs we can scheduled the script to run everyday at 3 am. like 0 3 * * * path/of/script
9. Git fetch only download the changes which your teammates have pushed. Git pull download and merge the changes which your teammates pushed.
10. LVM - Logical volume management. We can use it for chunk of disk space for specific work. we can then add or shrink the space of that volume on the fly too. 

---------------------------------------------------------------------------

Task 4: Organize Your Work

Make sure all your daily submissions (day-1 through day-27) are committed and pushed
Check that your git-commands.md is up to date
Check that your shell scripting cheat sheet is complete
Verify your GitHub profile and repos are clean (from Day 27)

==> 

Done

-----------------------------------------------------------------------------

Task 5: Teach It Back

Pick one topic you've learned and write a short explanation (5-10 lines) as if you're teaching it to someone who has never heard of it. Add it to your day-28-notes.md.

Examples:

Explain Git branching to a non-developer
Explain file permissions to a new Linux user
Explain what a crontab is and why sysadmins use it

==>

Backlog

------------------------------------------------------------------------------
