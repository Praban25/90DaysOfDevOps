Day 10 – File Permissions & File Operations Challenge

Task 1: Create Files (10 minutes)
Create empty file devops.txt using touch
Create notes.txt with some content using vi or echo
Create script.sh using vim with content: echo "Hello DevOps"
==>
sudo touch devops.txt
sudo echo "content" notes.txt
sudo vi script.sh

umask		--> to check system default umask
Observation : files are getting crate with 644 permissions where as folder getting created with 755 permissions

***************************************************
Task 2: Read Files (10 minutes)
Read notes.txt using cat
View script.sh in vim read-only mode
Display first 5 lines of /etc/passwd using head
Display last 5 lines of /etc/passwd using tail
==>
sudo cat notes.txt
sudo vim script.sh
sudo cat /etc/passwd | head -n 5
sudo cat /etc/passwd | tail -n 5

***************************************************
Task 3: Understand Permissions (10 minutes)
Format: rwxrwxrwx (owner-group-others)

r = read (4), w = write (2), x = execute (1)
Check your files: ls -l devops.txt notes.txt script.sh

Answer: What are current permissions? Who can read/write/execute?
==>
All files are having 644 permissions. User-root & group-root. It means root user has read & write permission where as group and others has only read permission. No one can execute as no one has execute permission for these files.

****************************************************
Task 4: Modify Permissions (20 minutes)
Make script.sh executable → run it with ./script.sh
Set devops.txt to read-only (remove write for all)
Set notes.txt to 640 (owner: rw, group: r, others: none)
Create directory project/ with permissions 755
Verify: ls -l after each change
==>
sudo chmod 744 script.sh
sudo bash script.sh
sudo chmod 444 devops.txt
sudo chmod 640 notes.txt
sudo mkdir project		--> by default permission get as 755 to directory as check and verified

****************************************************
Task 5: Test Permissions (10 minutes)
Try writing to a read-only file - what happens?
Try executing a file without execute permission
Document the error messages
==>
W10: Warning: Changing a readonly file 		--> getting this when trying to insert something with sudo permission
E45: 'readonly' option is set (add ! to override)	--> if you still write something and tried to save with wq it shows you this warning (add ! to  override)
"devops.txt" E212: Can't open file for writing		--> normal user cant save anything in read only file. Getting this message.
-bash: ./script.sh: Permission denied			--> this message when trying to execute the script file without execute permission


Permission denied		--> if you dont have permission then getting this error (any- read,write,execute)
