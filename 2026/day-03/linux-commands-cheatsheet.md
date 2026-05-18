Day 3 - Linux commands

Process Management

ps -aux		--> Displays detailed information (user, CPU%, memory%) for all processes.
ps -e or ps -A	--> Display every process on the system.
top		--> Real time system monitoring, such as task manager in windows.
htop		--> User friendly version of command top
pstree		--> Shows processes in hierarchical tree format - parent-child format
pgrep <process_name>	--> Searches for processes by name and returns their Process ID
pidof		--> find the process ID of a running program
kill <PID>	--> To send SIGTERM for Graceful shutdown of any process
kill -9 <PID>	--> Sends a SIGKILL to force-stop a process immediately
pkill <name>	--> Kill processes based on their name or other attribute rather than PID
killall <name>	--> Kills every instance of a process with a specific name
nice -n <> command	--> Starts a new process with a specific priority (highest priority -19 and lowest 19)
renice -n <> command	--> Adjusts the priority of an already running process
uptime		--> Shows how long the system has been running and the current load average
vmstat		--> Reports information about processes, memory, paging, block I/O, and CPU activity
lsof -i :<port>	--> Lists files (and processes) opening a specific port. Incredible for finding what's hogging a port.



Networking:

Traceroute	--> Tracks the path packets take to reach a host, showing each hop along the way
ip a		--> Displays all network interfaces, link statuses, and assigned IP addresses
ip route	--> Shows the current routing table and default gateway.
ss -tulnp	--> Displays all listening TCP (t) and UDP (u) ports in numeric format (n) without resolving names (l for listening). Faster and modern replacement for netstat.
nc -zv <IP> <port>	--> Uses Netcat to test if a specific port on a remote host is open
curl -I <URL>	--> Fetches the HTTP headers from a website; great for checking web server responses without downloading the whole page
dig <domain>	--> Performs a detailed DNS lookup (returns A records, MX records, etc.)
nslookup <domain>	--> A legacy tool for querying DNS records


File System:

df -h		--> Displays disk space usage for all mounted file systems in a human-readable format
du -sh *	--> Shows the total size of each file and folder in the current directory. Excellent for tracking down what is eating up disk space.
chmod 755 <file>	--> Changes file permissions (Read/Write/Execute for owner, Read/Execute for group and others).
chown user:group <file>	--> Changes the user and/or group ownership of a file or directory.
find /path -name "filename"	--> Searches for files and directories recursively
grep -ri "text" /path	--> Recursively searches for a specific string inside all files within a directory, ignoring case
du -ahx / | sort -rh | head -n 50	--> scan for disk usage, each folder, sorting recursively- human readable and display first 50 results
