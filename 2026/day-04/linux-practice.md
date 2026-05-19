Day 4 - Linux Practice: Processes and Services

I Have install ssh package to my Ubuntu system for todays practise
sudo apt install ssh

To check the ssh process have used below commands :
ps -aux | grep ssh	--> Shows ssh process details
pgrep -l ssh		--> shows pid of sshd
htop			--> can use htop too for check real time processes

To start ssh service and check the status :
sudo systemctl start ssh	--> To start ssh service
sudo systemctl status ssh	--> To check ssh service status
sudo systemctl enable ssh	--> To set ssh service enable at every system startup


To debug and while restarting ssh :
sudo systemctl stop ssh		--> To stop ssh service
journalctl -u ssh -n 200	--> To check the logs for ssh service

sudo systemctl start ssh	--> To start ssh service
journalctl -u ssh -n 200	--> To check the logs for ssh service


Besides that learn below commands too :
journalctl --since "20 min ago"			--> show all system logs 20 min ago from current time (example --since today, "2026-05-18 12:00:00")
journalctl --since "2026-05-18 12:00:00" --until "2026-05-18 13:00:00"		--> Within Timeframe
journalctl -u ssh --since today		--> To check particular service logs
journalctl -f		--> Shows real time logs while debugging or restarting the services
journalctl -u <service> -f		--> Shows real time logs for specific service
sudo systemctl list-units --type=service --state=running		--> List all unit services which are in running state
sudo systemctl list-units --type=service --all		--> Shows all unit services
systemctl is-active <ssh>	--> To quickly check if particular service status