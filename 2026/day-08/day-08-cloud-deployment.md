Day 08 – Cloud Server Setup: Docker, Nginx & Web Deployment

Pre-requisite : AWS Free tier Login must be created.
Login AWS console. Search for EC2 - Launch Instance
Name : Udaan_server
App & OS image : Ubuntu
Machine Image : Free Tier eligible one
Architecture : 64-bit
Instance Type : t3.micro (free tier eligible)
Key-pair : Create new - Give keypair name - type: RSA - file format: pem
Network setting : Create security group - allow ssh traffic : anywhere - allow http traffic from internet
Storage : 8 GB gp3
Launch Instance

Open Gitbash - go to keypair path
ssh -i <keypair_name> ubuntu@<public_dns>

sudo apt-get update		--> to update the repo
sudo apt install nginx		--> To install nginx
sudo systemctl status nginx	--> To check nginx status
sudo systemctl enable nginx	--> To set nginx service start at every reboot

open browser - put url as : http://<public_IPv4_address>		--> It displays Welcome to Nginx page

sudo journalctl -u nginx -f		--> To check the live logs for nginx
sudo journalctl -u nginx | tail -n 50 > log_file.log		--> To redirect last 50 lines of nginx logs to log_file.log

To download the log file on your system
scp -i <Ubantu-UdaanDay05.pem> ubuntu@ec2-54-188-234-98.us-west-2.compute.amazonaws.com:~/nginx_23may26.log .

Successfully created EC2 instance - ssh instance - update repo - install nginx, service check and set enable to every reboot - Nginx welcome page checked with Browser - pull logs and redirect to the file - download those logs to the local system.
