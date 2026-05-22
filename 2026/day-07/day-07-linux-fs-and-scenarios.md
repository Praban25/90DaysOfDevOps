Day 7 - Linux File System Hierarchy & Scenario-Based Practice

Scenario 1: Service Not Starting

A web application service called 'myapp' failed to start after a server reboot.
What commands would you run to diagnose the issue?
Write at least 4 commands in order.

==>

sudo systemctl status myapp		--> to check the myapp service status. (active (running),inactive(dead))
sudo journalctl -u myapp -n 100		--> to check last 100 lines of logs for myapp service
sudo journalctl -u myapp -f		--> to check live logs for service myapp (in another shell for monitoring)
sudo systemctl start myapp		--> If myapp service is stop, then to start the myapp service
sudo systemctl is-enabled myapp		--> To check if Myapp service is set to enable at startup so that at every restart of the instance, when system boots, it will start the myapp service auto.

--------------------------------------------------

Scenario 2: High CPU Usage

Your manager reports that the application server is slow.
You SSH into the server. What commands would you run to identify
which process is using high CPU?

==>

ssh -i </private key path> user@host		--> To ssh into the system
htop						--> To get proper visual of processes, cpu, memory usage
ps -aux --sort=-%cpu | head -n 10		--> to check Top 10 high cpu processes.
kill <pid>					--> To kill the process gracefully once confirm if we can kill it
kill -9 <pid>					--> To kill the process forcefully which is frozen
pkill <process_name>				--> if we can sure about the process name
pkill -f <process_name> 			--> If the process name is hidden inside a longer command -f flag tells pkill to look at the full command line argument
pgrep -fa <process_name>			--> Dry run before executing pkill command, it tells what you are about to kill	
ps -aux --sort=-%mem | head -n 10		--> to check Top 10 high memory processes. (for memory usage)

---------------------------------------------------------------

Scenario 3: Finding Service Logs

A developer asks: "Where are the logs for the 'docker' service?"
The service is managed by systemd.
What commands would you use?

==>

sudo systemctl status docker		--> To check docker service status
journalctl -u docker -n 200		--> shows last 200 lines for docker service
journalctl -u docket -f			--> shows live logs for docker service


-----------------------------------------------------------------

Scenario 4: File Permissions Issue

A script at /home/user/backup.sh is not executing.
When you run it: ./backup.sh
You get: "Permission denied"

What commands would you use to fix this?

==>

cd /home/user			--> jump into /home/user/ directory
ls -lh	backup.sh		--> to check the file permission for backup.sh file (X permission needed to execute the file.)
chmod +x backup.sh		--> to provide executable permission to the backup.sh file
ls -lh	backup.sh		--> to verify file permission again
./backup.sh			--> run and check. File will get execute

---------------------------------------------------------------------- 
 

