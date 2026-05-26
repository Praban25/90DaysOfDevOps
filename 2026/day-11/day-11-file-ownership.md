Day 11 – File Ownership Challenge (chown & chgrp)

Task 1: Understanding Ownership (10 minutes)
Run ls -l in your home directory
Identify the owner and group columns
Check who owns your files
Format: -rw-r--r-- 1 owner group size date filename

Document: What's the difference between owner and group?
==>
Owner : Owner generally represent a user, the single individual user account that created the file or directory.
Group : Group represent a collection on multiple users accounts bundled together under a single group name (like devlopers, IT, appteam)

***********************************************************
Task 2: Basic chown Operations (20 minutes)
Create file devops-file.txt
Check current owner: ls -l devops-file.txt
Change owner to tokyo (create user if needed)
Change owner to berlin
Verify the changes
Try:

sudo chown tokyo devops-file.txt
==>
sudo touch devops-file.txt
ls -l devops-file.txt
sudo chown Tokyo devops-file.txt		--> file permission 644
Observation : after changing the owner now previous owner unable to edit that file due to file permission applied. group and other has only read permissions.
sudo chown berlin devops-file.txt		--> Now user Tokyo also unable to edit that file due to change owner and file permissions

************************************************************
Task 3: Basic chgrp Operations (15 minutes)
Create file team-notes.txt
Check current group: ls -l team-notes.txt
Create group: sudo groupadd heist-team
Change file group to heist-team
Verify the change
==>
sudo touch team-notes.txt
sudo ls -l team-notes.txt
sudo groupadd heist-team
sudo chown :heist-team team-notes.txt
sudo ls -l team-notes.txt

************************************************************

Task 4: Combined Owner & Group Change (15 minutes)
Using chown you can change both owner and group together:

Create file project-config.yaml
Change owner to professor AND group to heist-team (one command)
Create directory app-logs/
Change its owner to berlin and group to heist-team
Syntax: sudo chown owner:group filename
==>
sudo touch project-config.yaml
sudo chown professor:heist-team project-config.yaml
sudo mkdir app-logs
sudo chown berlin:heist-team app-logs/

************************************************************
Task 5: Recursive Ownership (20 minutes)
Create directory structure:

mkdir -p heist-project/vault
mkdir -p heist-project/plans
touch heist-project/vault/gold.txt
touch heist-project/plans/strategy.conf
Create group planners: sudo groupadd planners

Change ownership of entire heist-project/ directory:

Owner: professor
Group: planners
Use recursive flag (-R)
Verify all files and subdirectories changed: ls -lR heist-project/
==>
Observation: using chmod -R flag we can change owner, groups or both for that directory and the sub directories with files inside it.
	     Using ls -lr for the directory, it shows the subdirectories and all files in subdirectories in deatils, permissions.

*************************************************************
Task 6: Practice Challenge (20 minutes)
Create users: tokyo, berlin, nairobi (if not already created)

Create groups: vault-team, tech-team

Create directory: bank-heist/

Create 3 files inside:

touch bank-heist/access-codes.txt
touch bank-heist/blueprints.pdf
touch bank-heist/escape-plan.txt
Set different ownership:

access-codes.txt → owner: tokyo, group: vault-team
blueprints.pdf → owner: berlin, group: tech-team
escape-plan.txt → owner: nairobi, group: vault-team
Verify: ls -l bank-heist/
==>
sudo groupadd vault-team
sudo groupadd tech-team
sudo mkdir bank-heist

***************************************************************

Learn commands:
groupadd
mkdir -p	--> (-p flag) it creates nested subdirectories all at once,
ls -lR		--> for the directory, it shows the subdirectories and all files in subdirectories in deatils, permissions.
chmod -R	--> can change owner, groups or both for that directory and the sub directories with files inside it.
chgrp -R	--> -R flag applies the change to the folder and all nested files/subfolders.
chgrp --reference=fileA.txt fileB.txt		--> If you want fileB to have the exact same group as fileA, use the --reference flag