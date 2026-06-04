Day 18 – Shell Scripting: Functions & intermediate Concepts

Task 1: Basic Functions

Create functions.sh with:
A function greet that takes a name as argument and prints Hello, <name>!
A function add that takes two numbers and prints their sum
Call both functions from the script

==>

sudo vi functions.sh

#!/bin/bash

read -p "Enter your name & First Number & Second Number (separated by space) :  " your_name n1 n2

greet() {
        local name=$1
        echo "Hello ${name}"
}


add() {
        local num1=$1
        local num2=$2
        local sum=$((num1 + num2))
        echo "The sum of $num1 and $num2 is $sum "
}


greet "$your_name"
add "$n1" "$n2"

sudo chmod +x functions.sh
./functions.sh

(have added inputs from user at the first and define functions as per in above script)

**********************************************************************

Task 2: Functions with Return Values

Create disk_check.sh with:
A function check_disk that checks disk usage of / using df -h
A function check_memory that checks free memory using free -h
A main section that calls both and prints the results

==>

#!/bin/bash

#disk usage check function
check_disk() {
        df -h /
}

#memory usage check function
check_memory() {
        free -h
}

#main
echo "Running System check"
echo "#####################################"
echo "Disk usage of root partition"
check_disk

echo "#####################################"
echo "Memory usage of system"
check_memory

echo "finished"


sudo chmod +x disk_check.sh
./disk_check.sh

************************************************************************

Task 3: Strict Mode — set -euo pipefail

Create strict_demo.sh with set -euo pipefail at the top
Try using an undefined variable — what happens with set -u?
Try a command that fails — what happens with set -e?
Try a piped command where one part fails — what happens with set -o pipefail?
Document: What does each flag do?

set -e →
set -u →
set -o pipefail →

==>

#!/bin/bash
# Enable Bash Strict Mode
set -euo pipefail

echo "--- Testing set -u (Undefined Variables) ---"
# Uncomment the line below to test. The script will crash instantly.
# echo "My secret token is: $UNDEFINED_VAR"

echo "--- Testing set -e (Command Failures) ---"
# This invalid command will fail. Because of -e, the script stops immediately.(uncomment below line to test)
# invalid_command_here

echo "This line will NEVER execute because the command above failed."

echo "--- Testing set -o pipefail (Piped Failures) ---"
# If the previous lines didn't stop the script, this pipeline would.
# 'fake_command' fails, but 'wc -l' succeeds. pipefail catches the 'fake_command' failure.
fake_command | wc -l

++++

set -e → Exit immediately --> here we didn't define variable hence it catch the same and exit the script  (unbound variable and exits.)
set -u → catches typos in variables or somewhere in script and exit immediately. (command not found error and halts)
set -o pipefail → By default, Bash only looks at the last command in a pipe. so -o checked each command in the pipe and exit if its failed with an error.

*********************************************************************

 
Task 4: Local Variables

Create local_demo.sh with:
A function that uses local keyword for variables
Show that local variables don't leak outside the function
Compare with a function that uses regular variables

==>

sudo local_demo.sh

#!/bin/bash

# --- Function 1: Using local variables ---
local_function() {
    local local_var="I am inside the local function"
    echo "Inside local_function: \$local_var = '$local_var'"
}

# --- Function 2: Using regular (global) variables ---
global_function() {
    global_var="I am inside the global function"
    echo "Inside global_function: \$global_var = '$global_var'"
}

# --- Main Demonstration ---

echo "========================================="
echo "1. TESTING LOCAL VARIABLES"
echo "========================================="
# Run the function
local_function

# Try to access the variable outside the function
echo "Outside function: \$local_var = '$local_var'"
if [ -z "$local_var" ]; then
    echo "Result: Success! The variable did NOT leak outside."
else
    echo "Result: Fail! The variable Leaked. Immidiate action needed"
fi

echo ""
echo "========================================="
echo "2. TESTING REGULAR (GLOBAL) VARIABLES"
echo "========================================="
# Run the function
global_function

# Try to access the variable outside the function
echo "Outside function: \$global_var = '$global_var'"
if [ -z "$global_var" ]; then
    echo "Nothing in Local variable. All good"
else
    echo "Result: Danger! The variable LEAKED and is now globally accessible."
fi
echo "========================================="

*****************************************************************************

Task 5: Build a Script — System Info Reporter

Create system_info.sh that uses functions for everything:

A function to print hostname and OS info
A function to print uptime
A function to print disk usage (top 5 by size)
A function to print memory usage
A function to print top 5 CPU-consuming processes
A main function that calls all of the above with section headers
Use set -euo pipefail at the top
Output should look clean and readable.

==>

sudo system_info.sh

#!/bin/bash


set -euo pipefail


systeminfo() {
        echo "The Hostname is $HOSTNAME"
        source /etc/os-release
        echo "The OS is $PRETTY_NAME"
        echo "Version is $VERSION"
}

uptime() {
        echo "****System Uptime****"
        command uptime
}

disk_usage() {
        echo "****Top 5 Disk usage****"
        set +o pipefail
        du -ahx / 2>/dev/null | sort -rh | head -n 5
        set -o pipefail
}

mem_usage() {
        echo "****Memory Usage****"
        free -h
}

top_cpu() {
        echo "****Top 5 CPU Processes****"
        ps axo user,pid,%cpu,start --sort=-%cpu | head -n 6
}


# ----Main Function----

main() {
        echo "####################################################"
        echo "                SYSTEM INFO REPORT                  "
        echo "####################################################"
        echo "Generated on : $(date)"
        echo "####################################################"


        systeminfo


        uptime


        disk_usage


        mem_usage


        top_cpu


        echo "#####################################################"
        echo "                 END OF REPORT                       "
        echo "#####################################################"

}


main


sudo chmod +x system_info.sh
./system_info.sh

*********************************************************************************

Have learn below points :

Have tried define functions and how it use in script
set -euo pipefail usage and tested.
Use of local and global function
use of [ -z "$local_var" ] -> (is empty) &  [ -n "$global_var" ] -> (not empty)
set +o pipefail  --> temp allow pipes to exit early
set -o pipefail  --> turn on pipefail again
