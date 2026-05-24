Day 09 – Linux User & Group Management Challenge

Task 1: Create Users (20 minutes)
Create three users with home directories and passwords:

tokyo
berlin
professor
==>

sudo useradd -m tokyo
sudo useradd -m berlin
sudo useradd -m professor

sudo passwd tokyo
sudo passwd berlin
sudo passwd professor

*******************************************
Task 2: Create Groups (10 minutes)
Create two groups:

developers
admins
==>
sudo groupadd developers
sudo groupadd admins

********************************************
Task 3: Assign to Groups (15 minutes)
Assign users:

tokyo → developers
berlin → developers + admins (both groups)
professor → admins
==>
sudo usermod -aG developers Tokyo
sudo usermod -aG developers berlin
sudo gpasswd -a berlin admins && sudo gpasswd -a professor admins
id <user_name>		--> to verify user and their groups

*********************************************
Task 4: Shared Directory (20 minutes)
Create directory: /opt/dev-project
Set group owner to developers
Set permissions to 775 (rwxrwxr-x)
Test by creating files as tokyo and berlin
Verify: Check permissions and test file creation
==>
sudo mkdir /opt/dev-project
sudo chown -R :developers /opt/dev-project
sudo chmod 755 /opt/dev-project
ls- lh		--> to check the permissions and group assign to dev-project directory
checked file creations by su for all and as per group assign, files getting created and who is not part of group, getting permission denied

***********************************************
Task 5: Team Workspace (20 minutes)
Create user nairobi with home directory
Create group project-team
Add nairobi and tokyo to project-team
Create /opt/team-workspace directory
Set group to project-team, permissions to 775
Test by creating file as Nairobi
==>
Done
