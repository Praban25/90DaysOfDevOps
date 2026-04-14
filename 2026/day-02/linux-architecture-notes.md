The **Linux Kernel** is the core of the system, acting as a bridge between computer hardware and software processes. It operates in a privileged kernel mode, giving it unrestricted access to physical resources. 

Process Management: Controls the creation, scheduling, and termination of processes, ensuring fair CPU distribution.
Memory Management: Allocates physical and virtual memory to processes while preventing them from interfering with each other.
Device Management: Uses device drivers to communicate with hardware like disks, network cards, and input devices.
File Systems: Manages how data is stored and retrieved from disks, providing a unified interface for different storage types. 


**User Space**
User space is the unprivileged memory area where all non-kernel applications run. Programs here run in user mode and cannot access hardware directly; they must request resources from the kernel via a System Call Interface (SCI).
 
Applications: Web browsers, text editors, and media players.
System Libraries: Essential code, such as the GNU C Library (glibc), that translates application requests into system calls which kernel understands.
Shells: The command-line interface (e.g., Bash) that allows users to interact with the kernel. 


**Init / Systemd**
The init system is the first process started by the kernel during boot (assigned PID 1) and serves as the parent of all other user space processes. 

Systemd: The modern standard for most distributions, systemd manages the system’s startup and ongoing services.
Service Management: It starts, stops, and restarts background services (daemons) like network managers or web servers.
Parallelization: Unlike older systems (like SysV init) that started services one by one, systemd starts services concurrently to speed up boot times.
Unit Files: Uses configuration files (targets, services, sockets) to define how the system should reach specific states, such as a graphical login.

In the world of Linux, when you press the power button, the kernel finishes loading and needs to start all the processes that make your computer useful (like the desktop interface, networking, and databases).
To do this, the kernel starts exactly one process, known as PID 1. This process is the "mother of all processes." Historically, this was init, but most modern systems now use systemd.

Traditional Init (SysVinit)
Init (short for initialization) is the classic method used for decades. It is based on a "linear" approach.

How it works: It uses Runlevels (numbered 0-6) to define the state of the system (e.g., Runlevel 3 is multi-user with networking, Runlevel 5 is graphical).

The Workflow: It runs shell scripts located in /etc/init.d/ one after another.

The Weak Point: Because it starts tasks sequentially (one by one), it is slow. If the network script hangs, the desktop script has to wait, making boot times much longer.

Modern Systemd
Systemd is the modern replacement for init. It was designed to overcome the "speed limit" of the old system and provide more control over complex modern hardware.

Parallelism: Unlike init, systemd starts as many services as possible at the same time. It doesn't wait for the hard drive to be ready if it can start the logging service first.

Units instead of Scripts: Instead of messy shell scripts, systemd uses .service files (Unit files). These are easy to read and manage.

Targets instead of Runlevels: Instead of numbers 1-6, it uses "Targets" (like multi-user.target or graphical.target).

On-Demand Starting: It can wait to start a service until it’s actually needed, saving memory and CPU.

How to tell which one you are using?
Open your terminal and run this command:
ps -p 1 -o comm=

If the output is systemd, you are on a modern system (Ubuntu, Fedora, Debian, CentOS 7+).

If the output is init, you are likely on an older or specialized "lightweight" Linux distribution.

The Bottom Line: While init was simple and predictable, systemd is the powerhouse that manages the high-speed, complex demands of modern servers and laptops today.


Key Differences :
Feature			          SysVinit (Old)			                Systemd (Modern)
Boot Speed		        Slow(Sequential)		                Fast (Parallel)
Configuration		      Complex Shell Scripts		            Simple Unit Files (.service)
Dependency		        Manual ordering			                Automatic dependency handling
Logging			          Scattered in /var/log/		          Centralized via journalctl
Process Tracking	    Hard to track child processes	      Uses "Cgroups" to track everything
