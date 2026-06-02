Day 16 – Shell Scripting Basics

Task 1: Your First Script
Create a file hello.sh
Add the shebang line #!/bin/bash at the top
Print Hello, DevOps! using echo
Make it executable and run it

==>

sudo vi hello.sh

#!/bin/bash
echo "Hello, DevOps!"

sudo chmod +x hello.sh
./hello.sh

********************************************************************************

Task 2: Variables
Create variables.sh with:
A variable for your NAME
A variable for your ROLE (e.g., "DevOps Engineer")
Print: Hello, I am <NAME> and I am a <ROLE>
Try using single quotes vs double quotes — what's the difference?

==>

sudo vi variables.sh

#!/bin/bash

Name="Praban"
Role="DevOps Engineer"

echo "Hello, I am $Name and i am a $Role"


sudo chmod +x variables.sh
sudo bash variables.sh

***********************************************************************************

Task 3: User Input with read
Create greet.sh that:
Asks the user for their name using read
Asks for their favourite tool
Prints: Hello <name>, your favourite tool is <tool>

==>

sudo vi greet.sh

#!/bin/bash

read -p "Enter your name :  " name
read -p "Enter your favourite tool :  " tool

echo "Hello $name, your favourite tool is $tool"

sudo chmod +x greet.sh
./greet.sh

*************************************************************************************

Task 4: If-Else Conditions
Create check_number.sh that:

Takes a number using read
Prints whether it is positive, negative, or zero


Create file_check.sh that:

Asks for a filename
Checks if the file exists using -f
Prints appropriate message

==>

sudo vi check_number.sh

#!/bin/bash

read -p "Enter the number :  " number

if [ $number -gt 0 ]; then
        echo "This number is Positive"
elif [ $number -lt 0 ] ; then
        echo "This number is Negative"
else
        echo "This number is Zero"
fi

sudo chmod +x check_number.sh
./check_number.sh

++++

sudo vi file_check.sh

#!/bin/bash

read -p "Enter the Filename :  " filename

if [ -f $filename ]; then
        echo "The $filename file exist, you can proceed"
else
        echo "The $filename file didnt exist, go back and search for the same"
fi


sudo chmod +x file_check.sh
./file_check.sh

*****************************************************************************************

Task 5: Combine It All
Create server_check.sh that:

Stores a service name in a variable (e.g., nginx, sshd)
Asks the user: "Do you want to check the status? (y/n)"
If y — runs systemctl status <service> and prints whether it's active or not
If n — prints "Skipped."

==>

sudo vi server_check.sh

#!/bin/bash

# Store the service name in a variable
SERVICE_NAME="nginx"

# Ask the user if they want to check the status
read -p "Do you want to check the status of $SERVICE_NAME? (y/n): " choice

# Convert choice to lowercase to handle 'Y' or 'y'
choice=${choice,,}

if [ "$choice" = "y" ]; then
    echo "Checking $SERVICE_NAME status..."
    echo "--------------------------------"
    
    # Run systemctl status
    systemctl status "$SERVICE_NAME"
    
    # Check the exit status of the systemctl command
    if [ $? -eq 0 ]; then
        echo "--------------------------------"
        echo "Result: $SERVICE_NAME is active and running."
    else
        echo "--------------------------------"
        echo "Result: $SERVICE_NAME is NOT active or not installed."
    fi

elif [ "$choice" = "n" ]; then
    echo "Skipped."
else
    echo "Invalid option. Please enter 'y' or 'n'."
fi

sudo chmod +x server_check.sh
./server_check.sh

*********************************************************************************************

Lesson Learn:
While creating script proper indentation is must else it will a nightmare to solve the exact issue.
Learn use of conditions if, elif, else, variables usage, -gt, -lt & -eq usage, usage of choice variable.
Step by steps checking and as per conditions, manipulations of things saves lots of time for recurring manual requests.