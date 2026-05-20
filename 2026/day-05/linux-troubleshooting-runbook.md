Day 5 - Linux Troubleshooting Drill: CPU, Memory, and Logs

Have created Ubuntu server on aws console & access it through ssh(gitbash)
Installed nginx on the same
nginx -v	--> version check
journalctl -u nginx -n 50	--> logs checked with journalctl for nginx
curl -I 127.0.0.1	--> Test the Web Server Locally
pgrep -l nginx		--> Get PID of nginx
ps -o pid,pcpu,pmem,comm -p <PID>	--> To get the info about cpu, mem for particular pid
df -lh		--> To check partitions space usage
iostat -xz 1 3	--> Disk monitoring - High r_await or w_await (Requests taking dozens of milliseconds to finish)
free -h		--> To check memory usage
vmstat 1 3	--> To check (wa) value for cpu wait time for I/O. Higher value indicates performance issue with disk
ip -s link	--> Shows all your network interfaces (Wi-Fi, Ethernet) along with the total number of data packets sent (TX) and received (RX).
nload		--> It draws a live, visual graph right in your terminal showing exactly how much data bandwidth your network is consuming at that very second.
ss -tulpn | grep nginx		--> To verify that Nginx is actively listening on the correct network interfaces and successfully accepting HTTP requests.	


To Check...	Quickest Command		Best Live Visual Command
RAM		free -h				htop
Disk		df -h				iostat -xz 1 3
Network		ip -s link			nload 



nginx -t && systemctl reload nginx	--> here -t first check nginix configuration, if all good, it will reload the nginx config changes. Else it will stops immediately, leaving your old (working) configuration running live while you fix the typo! 

Logs checked at /var/log/ngnix : 
access.log	--> shows access logs for nginx (tested on browser and with curl -I <url>)
error.log	--> shows error logs if any


Troubelshooting : 
curl -I http://localhost
	If this works (returns a 200, 301, or even a 404), **Nginx is alive and working**. The issue is out in your network/infra.

sudo ss -tulpn | grep nginx
	To check the port for ngnix is listing or not

curl -Iv http://<url>
	To get proper details for public web
