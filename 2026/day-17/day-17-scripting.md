Day 17 – Shell Scripting: Loops, Arguments & Error Handling

Task 1: For Loop
Create for_loop.sh that:
Loops through a list of 5 fruits and prints each one

Create count.sh that:
Prints numbers 1 to 10 using a for loop

==>

sudo vi for_loop.sh

#!/bin/bash

for fruit in Apple Banana Mango Cherry Papaya
do
        echo "I Love to eat ${fruit}s!!"
done

sudo chmod +x for_loop.sh
./for_loop.sh

++++

sudo vi count.sh

#!/bin/bash

for i in {1..10}
#for count in 1za 2za 3za 4za 5za 6za 7za 8za 9za 10za
do
        echo "Number : $i"
done

sudo chmod +x count.sh
sudo bash count.sh

Have also practise array where 2 list are getting combine with for loop.
Like things and colour with for loop i in {0..4}
colour=(" " " ")
things=(" " " ")

*******************************************************************

Task 2: While Loop
Create countdown.sh that:
Takes a number from the user
Counts down to 0 using a while loop
Prints "Done!" at the end

==>

sudo vi countdown.sh

#!/bin/bash

read -p "Enter the number to start the countdown :  " count

while [ $count -ge 0 ]
do
        echo $count
        count=$((count - 1))

        sleep 1
done

echo "Boooommmm!!!!"

sudo chmod +x countdown.sh
./contdown.sh

*********************************************************************

Task 3: Command-Line Arguments
Create greet1.sh that:

Accepts a name as $1
Prints Hello, <name>!
If no argument is passed, prints "Usage: ./greet.sh "

Create args_demo.sh that:

Prints total number of arguments ($#)
Prints all arguments ($@)
Prints the script name ($0)

==> 

sudo vi greet1.sh

#!/bin/bash

# Check if the first argument ($1) is empty
if [ -z "$1" ]; then
    echo "Usage: ./greet.sh <name>"
else
    echo "Hello, $1!"
fi

sudo chmod +x greet1.sh

++++

sudo vi args_demo.sh

#!/bin/bash

echo "Script name (\$0): $0"
echo "Total number of arguments (\$#): $#"
echo "All arguments (\$@): $@"

sudo chmod +x args_demo.sh
./args_demo.sh

****************************************************************

Task 4: Install Packages via Script
Create install_packages.sh that:
Defines a list of packages: nginx, curl, wget
Loops through the list
Checks if each package is installed (use dpkg -s or rpm -q)
Installs it if missing, skips if already present
Prints status for each package
Run as root: sudo -i or sudo su

==>

sudo vi install_packages.sh

#!/bin/bash

# Define the list of packages
PACKAGES=("nginx" "curl" "wget")

# Ensure the script is run with root/sudo privileges
if [ "$EUID" -ne 0 ]; then
  echo "Please run this script as root or using sudo."
  exit 1
fi

echo "Starting package installation check..."
echo "--------------------------------------"

# Loop through the list
for PACKAGE in "${PACKAGES[@]}"
do
    # Check if the package is installed
    # dpkg -s redirects standard output and errors to /dev/null so it stays quiet
    if dpkg -s "$PACKAGE" >/dev/null 2>&1; then
        echo "[ PRESENT ] $PACKAGE is already installed. Skipping."
    else
        echo "[ MISSING ] $PACKAGE is not installed. Installing now..."
        
        # Install the package (-y assumes 'yes' to prompts)
        apt-get install -y "$PACKAGE" >/dev/null 2>&1
        
        # Check if the installation was successful
        if [ $? -eq 0 ]; then
            echo "[ SUCCESS ] $PACKAGE has been successfully installed."
        else
            echo "[  ERROR  ] Failed to install $PACKAGE."
        fi
    fi
done

echo "--------------------------------------"
echo "All checks complete!"

sudo chmod +x install_packages.sh
sudo ./install_packages.sh

********************************************************************

Task 5: Error Handling
Create safe_script.sh that:
Uses set -e at the top (exit on error)
Tries to create a directory /tmp/devops-test
Tries to navigate into it
Creates a file inside
Uses || operator to print an error if any step fails
Example:

mkdir /tmp/devops-test || echo "Directory already exists"

==>

sudo vi safe_script.sh

#!/bin/bash
# Exit immediately if a command exits with a non-zero status
set -e

echo "Starting safe operations..."

# Wrap the operations in a block so we can catch any failure with the || operator
{
    # 1. Try to create the directory
    mkdir -p /tmp/devops-test
    
    # 2. Try to navigate into it
    cd /tmp/devops-test
    
    # 3. Create a file inside
    touch test_file.txt
    
    echo "Success: Directory created and file written safely!"

} || {
    # This block executes if ANY of the steps inside the bracket above fail
    echo "Error: An operation failed! Script terminating safely."
    exit 1
}


sudo chmod +x safe_script.sh
./safe_script.sh

**************************************************************