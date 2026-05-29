Day 14 – Networking Fundamentals & Hands-on Checks

Have check OSI model and TCP/IP model and understand the all layers and it usage, features and comparisons.

have hands on below command :

hostname -I
ip addr show
ping google.com
traceroute google.com
ss -tulpn
netstat -tulpn
dig google.com
nslookup google.com
curl -I https://axis.com
curl -I http://www.google.com
netstat -an | head
nc -zv localhost 22

Small troubleshooting : 
Have tested Nginx welcome webpage was working on windows which is configured on Nginx on Ubuntu (WSL)
nc -zv localhost 22		--> shows succeeded message
when have stop the nginx service on Ubuntu, Nginx welcome webpage stop loading.
and nc -zv localhost 22		--> connection refused message
When again have started nginx service on Ubuntu, Ngnix welcome webpage loaded on windows
and nc -zv localhost 22		--> shows succeeded message