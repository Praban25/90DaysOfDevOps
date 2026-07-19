
# Ansible Practise :

## Prerequisites :
 
## AWS CLI:
sudo apt install unzip curl -y
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws --version

## Terraform:
sudo snap install terraform --classic
terraform version

git:
unzip:
curl:

## Create IAM User:
Create user as terraform-user
permission - attached policy - AdministratorAccess
create access key and download - keep it safe

## Configure AWS CLI:
aws configure - AWS Access Key and secret key - region
aws sts get-caller-identity

## Create Key Pair in AWS :
Create keypair - download - keep it safe.


## TF project tree:
terraform-aws-ec2
│
├── main.tf
├── variables.tf
├── outputs.tf
├── terraform.tfvars
└── provider.tf

### main.tf
data "aws_ami" "ubuntu" {
  most_recent = true

  owners = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-resolute-26.04-amd64-server-*"]

  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_security_group" "ansible_sg" {
  name = "ansible-security-group"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "control_node" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.ansible_sg.id]

  tags = {
    Name = "ansible-control"
  }
}

resource "aws_instance" "managed_node" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.ansible_sg.id]

  tags = {
    Name = "ansible-managed"
  }
}


### outputs.tf
output "control_public_ip" {
  value = aws_instance.control_node.public_ip
}

output "managed_public_ip" {
  value = aws_instance.managed_node.public_ip
}


### provider.tf
provider "aws" {
  region = var.region
}

### variables.tf
variable "region" {
  default = "us-west-2"
}

variable "instance_type" {
  default = "t3.micro"
}

variable "key_name" {
  default = "terraform_key"
}


## terraform 
terraform init
terraform fmt
terraform validate
terraform plan		(check plan properly)
terraform apply

terraform outputs	(verify instances)

## ssh
chmod 400 terraform-key.pem
ssh -i terraform-key.pem ubuntu@CONTROL_PUBLIC_IP
ssh -i terraform-key.pem ubuntu@MANAGED_PUBLIC_IP

## .gitignore
.terraform/
*.tfstate
*.tfstate.*
.terraform.lock.hcl
terraform.tfvars
*.pem


# Ansible Setup
ssh -i terraform-key.pem ubuntu@<CONTROL_PUBLIC_IP>		--> ssh control node

sudo apt update
sudo apt upgrade -y										--> update system

sudo apt install ansible -y								--> install ansible
ansible --version

## Generate an SSH Key on the Control Node
ssh-keygen -t ed25519									--> genrerate ssh key

ls ~/.ssh
cat ~/.ssh/id_ed25519.pub								--> copy public key

ssh -i terraform-key.pem ubuntu@<MANAGED_PUBLIC_IP>		--> ssh managed node from laptop
vi ~/.ssh/authorized_keys								--> edit authorized_keys - Paste the copied public key, save, and exit.

ssh ubuntu@<MANAGED_PUBLIC_IP>							--> Test SSH from the Control Node


## ansible configuration on control node
mkdir ~/ansible-lab
cd ~/ansible-lab

vi inventory											--> create inventory file and paste as below
[servers]
managed ansible_host=<MANAGED_PUBLIC_IP>

[servers:vars]
ansible_user=ubuntu

ansible servers -i inventory -m ping					--> Test Connectivity with ping

ansible servers -i inventory -m setup					--> shows system information
ansible servers -i inventory -m command -a "uptime"		--> Check uptime
ansible servers -i inventory -m command -a "free -m"	--> Check memory


### first playbook - ping
vi ping.yml												--> ping.yml created

- name: Test connectivity
  hosts: servers
  become: yes

  tasks:
    - name: Ping managed node
      ansible.builtin.ping:
	  

ansible-playbook -i inventory ping.yml					--> connectivity check.

### Install Nginx with Ansible
vi install-nginx.yml									--> nginx installation with ansible

- name: Install Nginx
  hosts: servers
  become: yes

  tasks:
    - name: Update apt cache
      apt:
        update_cache: yes

    - name: Install nginx
      apt:
        name: nginx
        state: present

    - name: Start nginx
      service:
        name: nginx
        state: started
        enabled: yes
		
		
ansible-playbook -i inventory install-nginx.yml			--> It should install nginx to managed nodes.

