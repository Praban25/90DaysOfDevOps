Day 12 – Breather & Revision (Days 01–11)

Command revised today
ps -aux
ps -aux | grep nginx
htop
pstree
pgrep docker
kill -9 <pid>
pkill <Process_name>
killall <Process_name>
uptime
vmstat
free -h
traceroute www.google.com
ss tulpn
nc -zv 0.0.0.0 80
curl -i www.trainwithshubham.com
dig 
nslookup
ip a
df -h
du -sh *
du -ahx / | sort -rh | head -n 50 
sudo systemctl status ssh
sudo systemctl enable ssh
sudo systemctl is-enabled ssh
sudo systemctl list-units --type=service --state=running
sudo journalctl -u ssh -n 20
nload
ip -s link
nginx -t && systemctl reload nginx
ps -aux --sort=-%cpu | head -n 10
ls -lh
chmod
chown
ssh -i <keypair> user@public_dns
scp -i <keypair> user@public_dns:<log_file_path> <path_to_download>
sudo journalctl -u nginx | tail -n 50 > log_file.log
sudo useradd
sudo passwd
sudo groupadd
sudo usermod -aG <group> <user>
sudo gpasswd -a <user> <group>
sudo chown -R <full path>
sudo groupadd
sudo chgrp -R <full path>
chgrp --reference=fileA.txt fileB.tx
ls -lR

-------------------------------------------------------------------------------------

1. Which 3 commands save you the most time right now, and why?
==>
ls -lR
sudo chown -R <full path>
ssh -i <keypair> user@public_dns
sudo journalctl -u nginx | tail -n 50 > log_file.log
scp -i <keypair> user@public_dns:<log_file_path> <path_to_download>
htop
sudo journalctl -u ssh -f
du -ahx / | sort -rh | head -n 50
ps -aux | grep nginx


*******************************************************
2. How do you check if a service is healthy? List the exact 2–3 commands you’d run first.
==>
sudo systemctl status <service_name>
sudo journalctl -u <service_name> -f
sudo systemctl is-enabled <service_name>
sudo ss -tulpn | grep <port_or_process>

*******************************************************
3. How do you safely change ownership and permissions without breaking access? Give one example command.
==>
find <file_path> -type <f or d> -print
chown --reference=<file1_path> <file2_path>
find <file_path> -type d -exec chmod 755 {} +
find <file_path> -type f -exec chmod 644 {} +

*******************************************************
4. What will you focus on improving in the next 3 days?
==>
Will focus for complex commands with pipes, grep, output to input
Like to create small scripts which can check system health, or disk/memory usage, network usage and shoot email if certain threshold reaches.
Cronjobs to scheduled such scripts on regular intervals.