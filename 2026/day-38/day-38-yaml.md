
Day 38 – YAML Basics

# Task 1: Key-Value Pairs

Create person.yaml that describes yourself with:

name
role
experience_years
learning (a boolean)
Verify: Run cat person.yaml — does it look clean? No tabs?

==>

vi person.yaml

name: Praban Kini
role: Aspiring DevOps and Cloud Engineer
experience_years: 3
learning: true

Yes, clean, no tabs.

--------------------------------------------------------------------------------------

# Task 2: Lists

Add to person.yaml:

tools — a list of 5 DevOps tools you know or are learning
hobbies — a list using the inline format [item1, item2]
Write in your notes: What are the two ways to write a list in YAML?

==>

tools:
  - git
  - github
  - linux
  - terraform
  - ansible
hobbies: [passionately learning devops, 90daysofdevops challange]

Block Style List: Each item starts with a hyphen (-) on a new line. For long lists
Inline Style List: All items are written on a single line inside square brackets ([]), separated by commas. For short lists

--------------------------------------------------------------------------------------

# Task 3: Nested Objects

Create server.yaml that describes a server:

server with nested keys: name, ip, port
database with nested keys: host, name, credentials (nested further: user, password)
Verify: Try adding a tab instead of spaces — what happens when you validate it?

==>

vi server.yaml

server:
  name: server-1
  ip: 192.168.2.10
  port: 80

database:
  host: localhost
  name: db-server
  credentials:
    user: admin
    password: dbadmin@123
	
sudo apt install yamllint			--> to verify yaml syntax
yamllint server.yaml				--> no output - all good | else it will prompt the error output

----------------------------------------------------------------------------------------

# Task 4: Multi-line Strings

In server.yaml, add a startup_script field using:

The | block style (preserves newlines)
The > fold style (folds into one line)
Write in your notes: When would you use | vs >?

==>

vi server.yaml

startup_script: |
  #!/bin/bash
  sudo apt update
  sudo apt install -y nginx
  sudo systemctl enable nginx
  sudo systemctl start nginx

description: >
  This will update system, then install nginx,
  enable nginx at every boot and start nginx service.

* | (Literal Block): Use when you want to preserve line breaks exactly, such as for shell scripts, configuration files, code snippets, or certificates.
* > (Folded Block): Use when you want multiple lines to be combined into a single paragraph, such as for descriptions, documentation, or long messages.

----------------------------------------------------------------------------------------------

# Task 5: Validate Your YAML

Install yamllint or use an online validator
Validate both your YAML files
Intentionally break the indentation — what error do you get?
Fix it and validate again

==>

Have install yamllint for validate both the files. Checked by putting tab in between colon and > (error found below)

server.yaml
  22:15     error    too many spaces after colon  (colons)
  
-----------------------------------------------------------------------------------------------

# Task 6: Spot the Difference

Read both blocks and write what's wrong with the second one:

# Block 1 - correct
name: devops
tools:
  - docker
  - kubernetes

# Block 2 - broken
name: devops
tools:
- docker
  - kubernetes


The list items have inconsistent indentation. - docker is not indented under tools:, while - kubernetes is. In YAML, all items in a list must be indented 
consistently using spaces.

-------------------------------------------------------------------------------------------------


