Day 15 – Networking Concepts: DNS, IP, Subnets & Ports


Task 1: DNS – How Names Become IPs
Explain in 3–4 lines: what happens when you type google.com in a browser?
What are these record types? Write one line each:
A, AAAA, CNAME, MX, NS
Run: dig google.com — identify the A record and TTL from the output
==>
When we type google.com or any web url in the browser(here browser is a client) it check with local cache first --> then go to DNS resolver to find the IP address of that web.
It queries first to Root DNS --> then TLD domain --> then Authoritative serve. Once fond the IP address, it send that IP address to the browser 
which then uses to establish a connection to load that web.

DNS Record Types : 
A: Maps a hostname to an IPv4 address (e.g., 192.0.2.1).

AAAA: Maps a hostname to an IPv6 address (e.g., 2001:db8::1).

CNAME: Creates an alias by pointing one hostname to another hostname (e.g., www.example.com to example.com).

MX: Specifies the mail servers responsible for receiving email on behalf of the domain.

NS: Delegates a DNS zone to use a specific set of authoritative name servers.

---------------------------------------------------------------------

Task 2: IP Addressing
What is an IPv4 address? How is it structured? (e.g., 192.168.1.10)
Difference between public and private IPs — give one example of each
What are the private IP ranges?
10.x.x.x, 172.16.x.x – 172.31.x.x, 192.168.x.x
Run: ip addr show — identify which of your IPs are private
==>
An IPv4 (Internet Protocol version 4) address is a unique 32-bit numerical label assigned to every device connected to a computer network that uses the Internet Protocol for communication.
It consisting of four numbers (called octets) separated by periods (e.g., 192.168.1.10).
	Each octet represents 8 bits of data ($4 \times 8 = 32$ bits total).
	Each octet can have a decimal value ranging from 0 to 255
	An IP address is logically split into two parts: the Network ID (identifies the specific network) and the Host ID (identifies the specific device on that network), 	determined by the subnet mask.

* Public IP Address : Its Globally unique address which is reachable across entire internet. Your ISP (Internet service provider) provided you and it assigned to your router so that you can connect to the world. (Example 8.8.8.8)
* Private IP Address : Used to connect your devices internally. They are re-usable and not unique globally and cannot be routed directly over internet. (Example: 192.168.1.1)

Private IP address ranges :
* Class A : 10.0.0.0 to 10.255.255.255
* Class B : 172.16.0.0 to 172.31.255.255
* Class C : 192.168.0.0 to 192.168.255.255
-----------------------------------------------------------------------

Task 3: CIDR & Subnetting
What does /24 mean in 192.168.1.0/24?
How many usable hosts in a /24? A /16? A /28?
Explain in your own words: why do we subnet?
Quick exercise — fill in:
CIDR	Subnet Mask	Total IPs	Usable Hosts
/24	?	?	?
/16	?	?	?
/28	?	?	?

==>
* CIDR (Classless Inter-Domain Routing) represent to the Notation ( /24 or /8 etc). It tells you exactly how many bits of the 32-bit IP address belong to the Network ID.
An IPv4 address is divided into four 8-bit octets (4 x 8 = 32 bits), a /24 means the first 24 bits (the first 3 octets) are strictly locked down for the network name.
	In 192.168.1.0/24, the 192.168.1. portion is the network ID.
	The remaining 8 bits (32 - 24 = 8) are left completely free for assigning to individual devices (known as Host ID).
	/24 mask is 255.255.255.0
* To calculate no of hosts:
	Formula : 1. [32 - CIDR number]				32 - 24 = 8
		  2. Formula for Number of hosts		2 raise to 8 = 256
		  3. Number of usable Hosts			256 - 2 = 254
Here the very first IP in the block used to identify the network itself. (Network Address)
The very last IP in the block used to send data to all hosts on that network simultaneously. (Broadcast address)
		
		/16		32 - 16 = 16
				2 raised to 16 = 65536
				65536 - 2 = 65534
		/28		32 - 28 = 4
				2 raised to 4 = 16
				16 - 2 = 14

* We do subnetting because :
	1. Devices are continuously broadcasting message to find each other. If we have large network then lot of noise in that network which slow down the network performance. We create small subnets so that devices can get their respective devices quickly and to have good network performance
	2. Security is the concern we do subnetting. We can do subnetting for Department wise also so that HR, accounting or dev dept can use their own network and through firewall rules we can control who can access / connect whose devices.
	3. Efficient use of IP's : For small offices like branch office with 10-12 computers dont need large network segments. So that we can subnet them by /28 so that it will not waste IP's

CIDR	Subnet Mask		Total IPs	Usable Hosts
/24	255.255.255.0		256		254
/16	255.255.0.0		65536		65534
/28	255.255.255.240		16		4

------------------------------------------------------------------------------------

Task 4: Ports – The Doors to Services
What is a port? Why do we need them?
Document these common ports:
Port	Service
22	?
80	?
443	?
53	?
3306	?
6379	?
27017	?
Run ss -tulpn — match at least 2 listening ports to their services

==> 
* Port is like we have street address but we if we have house numbers on that street then it will be easy to identify the house. Just like Port is use to identify an app/service quickly and easy to route traffic for the same. 
Ports allow a single device with a single IP address to multiplex its networking, cleanly separating and routing traffic to the exact application it belongs to.
A port is a 16-bit logical construction identifier (ranging from 0 to 65535) assigned to specific network processes and services running on an operating system.

Port	Service
22	ssh
80	http
443	https
53	dns
3306	MySql
6379	Redis
27017	MongoDB

--------------------------------------------------------------------------------------

Task 5: Putting It Together
Answer in 2–3 lines each:

You run curl http://myapp.com:8080 — what networking concepts from today are involved?
Your app can't reach a database at 10.0.1.50:3306 — what would you check first?

==>
* First it search for the DNS resolution to find ip address for myapp.com. Then it will initiate TCP 3-Way Handshake to establish a connection specifically targeting Port 8080. Finally, it sends an HTTP GET request over that network socket to retrieve the hosted web content.

* We will check the if the Database ip 10.0.1.50 is reachable or not by using Ping or Traceroute command on Application server
Second we will run nc -zv 10.0.1.50 3306 or telnet to check if Port 3306 is open to ensure that any Security group / firewall rule is culprit to block the traffic and that the database service is actually running and listening on that interface.

*************************************************************************************
	