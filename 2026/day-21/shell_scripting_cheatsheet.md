

Quick Reference Table

Topic				Key Syntax					Example
Variable			VAR="value"					NAME="DevOps"
Argument			$1, $2						./script.sh arg1
If					if [ condition ]; then		if [ -f file ]; then
For loop			for i in list; do			for i in 1 2 3; do
Function			name() { ... }				greet() { echo "Hi"; }
Grep				grep pattern file			grep -i "error" log.txt
Awk					awk '{print $1}' file		awk -F: '{print $1}' /etc/passwd
Sed					sed 's/old/new/g' file		sed -i 's/foo/bar/g' config.txt

*********************************************************************

Task 1: Basics
Shebang (#!/bin/bash)
Tells the kernel which interpreter to use to execute the script. It ensures the script runs in a Bash environment regardless of the user's current shell.

Bash
#!/bin/bash
echo "Running in bash!"
Running a script
Scripts require execution permissions to run directly, though they can also be passed directly to the interpreter.

Bash
chmod +x script.sh  # Grant execute permissions
./script.sh         # Execute the script from the current directory
bash script.sh      # Run via explicit interpreter (ignores execution permissions)
Comments
Used to document code or temporarily disable execution lines.

Bash
# This is a single-line comment
echo "Hello" # This is an inline comment
Variables
Store data for reuse. Do not use spaces around the = sign during declaration.

Bash
NAME="Alice"       # Declaring a variable
echo $NAME         # Using a variable (Unquoted: subject to word splitting)
echo "$NAME"       # Double quotes: Preserves whitespace, evaluates variables
echo '$NAME'       # Single quotes: Literal string, does not evaluate variables
Reading user input
Pauses execution to accept input from standard input and assigns it to a variable.

Bash
read -p "Enter your username: " USERNAME
echo "Welcome, $USERNAME"
Command-line arguments
Special variables reserved for parameters passed to a script at runtime.

Bash
echo "Script name: $0"
echo "First argument: $1"
echo "Number of arguments: $#"
echo "All arguments as a single list: $@"
echo "Exit status of last command: $?"

************************************************************************************

Task 2: Operators and Conditionals
String comparisons
Used to evaluate textual data. Always wrap string variables in double quotes inside [ ].

Bash
[ "$A" = "$B" ]   # True if strings are equal
[ "$A" != "$B" ]  # True if strings are not equal
[ -z "$A" ]       # True if string is empty (zero length)
[ -n "$A" ]       # True if string is not empty (non-zero length)
Integer comparisons
Used to evaluate numeric values.

Bash
[ $X -eq $Y ]     # Equal to
[ $X -ne $Y ]     # Not equal to
[ $X -lt $Y ]     # Less than
[ $X -gt $Y ]     # Greater than
[ $X -le $Y ]     # Less than or equal to
[ $X -ge $Y ]     # Greater than or equal to
File test operators
Used to check properties and permissions of files and directories.

Bash
[ -f "$FILE" ]    # True if file exists and is a regular file
[ -d "$DIR" ]     # True if directory exists
[ -e "$FILE" ]    # True if file/directory exists at all
[ -r "$FILE" ]    # True if file is readable
[ -w "$FILE" ]    # True if file is writable
[ -x "$FILE" ]    # True if file is executable
[ -s "$FILE" ]    # True if file exists and is not empty
if, elif, else syntax
Executes code blocks conditionally based on exit statuses.

Bash
if [ "$1" -gt 100 ]; then
    echo "Large number"
elif [ "$1" -eq 100 ]; then
    echo "Exactly 100"
else
    echo "Small number"
fi
Logical operators
Combines or inverts conditional checks.

Bash
[[ $A -eq 1 && $B -eq 2 ]]  # Logical AND
[[ $A -eq 1 || $B -eq 2 ]]  # Logical OR
if ! [ -d "$DIR" ]; then    # Logical NOT (Inverts condition)
Case statements
Matches a variable against multiple patterns; highly efficient for multi-option menus.

Bash
case "$1" in
    start) echo "Starting service..." ;;
    stop)  echo "Stopping service..." ;;
    *)     echo "Usage: $0 {start|stop}" ;;
esac

*************************************************************************************

Task 3: Loops
for loop
Iterates over a predefined list of items or executes a fixed number of times.

Bash
# List-based loop
for USER in alice bob charlie; do
    echo "User: $USER"
done

# C-style loop
for ((i=1; i<=5; i++)); do
    echo "Iteration $i"
done
while loop
Executes code repeatedly as long as the underlying condition remains true.

Bash
COUNT=1
while [ $COUNT -le 3 ]; do
    echo "Count: $COUNT"
    ((COUNT++))
done
until loop
Executes code repeatedly as long as the underlying condition remains false.

Bash
COUNT=1
until [ $COUNT -gt 3 ]; do
    echo "Count: $COUNT"
    ((COUNT++))
done
Loop control
Alters the flow of execution within loops.

Bash
for i in {1..5}; do
    [ $i -eq 2 ] && continue # Skip the rest of this iteration
    [ $i -eq 4 ] && break    # Exit the loop entirely
    echo $i
done
Looping over files
Uses filename expansion (globbing) to safely process files.

Bash
for FILE in *.log; do
    [ -f "$FILE" ] || continue # Handle edge case where no .log files exist
    echo "Processing $FILE"
done
Looping over command output
Reads output line-by-line, which avoids memory issues with massive command outputs.

Bash
# Stream command output directly into a while loop
df -h | while read -r LINE; do
    echo "Disk Line: $LINE"
done

**********************************************************************************

Task 4: Functions
Defining and calling a function
Encapsulates a block of code for reusability. Invoke functions by name without parentheses.

Bash
# Definition
log_message() {
    echo "[INFO] System operational."
}

# Call
log_message
Passing arguments to functions
Functions handle arguments exactly like scripts, using positional variables.

Bash
greet() {
    echo "Hello, $1! Welcome to $2."
}

greet "Alice" "Production"
Return values
return yields a status code (0-255), while echo outputs actual data string payloads.

Bash
# Return status code
check_status() {
    return 0 
}

# Return data
get_name() {
    echo "John Doe"
}
Local variables
Prevents variables inside a function from overwriting variables in the global scope.

Bash
calculate() {
    local RESULT=$(( 10 * 5 ))
    echo $RESULT
}

***********************************************************************************

Task 5: Text Processing Commands
grep
Filters rows of text matching specific search patterns.

-i: Case-insensitive search

-r: Recursive directory search

-c: Count matching lines instead of displaying them

-n: Show line numbers

-v: Invert match (show lines that do not match)

-E: Extended regular expressions (ERE)

Bash
grep -rnvi "success" /var/log/syslog
awk
A powerful script language for field-based text manipulation and data reporting.

$1, $2: Represents columns based on delimiter

-F: Defines the field separator (default is whitespace)

BEGIN/END: Logic blocks triggered before or after parsing text lines

Bash
awk -F: 'BEGIN {print "Users:"} $3 > 1000 {print $1} END {print "Done"}' /etc/passwd
sed
Stream editor used for parsing and transforming text.

s/old/new/g: Substitute all occurrences of 'old' with 'new' globally across lines

d: Delete specific lines matching criteria

-i: In-place editing (modifies the file directly rather than outputting to stdout)

Bash
sed -i 's/http:\/\/localhost/https:\/\/api.site.com/g' config.json
sed '/^#/d' settings.conf  # Deletes all lines starting with a comment
cut
Extracts structured sections from lines of text.

-d: Set the delimiter

-f: Fields/columns to extract

Bash
echo "root:x:0:0" | cut -d: -f1,4
sort
Orders input text line-by-line.

-n: Sort numerically

-r: Reverse the sorted output order

-u: Unique lines output only

Bash
sort -t: -k3 -n /etc/passwd  # Sorts passwd file numerically by the 3rd column
uniq
Filters out adjacent duplicate lines from input text. Note: Requires input to be sorted first.

-c: Prefix lines with the number of occurrences

Bash
sort names.txt | uniq -c
tr
Translates, squeezes, or deletes characters from standard input.

-d: Delete specific target characters

Bash
echo "hello world" | tr 'a-z' 'A-Z'   # Convert to uppercase
echo "Price: $100" | tr -d '$'        # Strip currency symbols
wc
Counts lines, words, and byte metrics.

-l: Count total lines

-w: Count total words

-c: Count total characters

Bash
wc -l access.log
head / tail
Views the beginning or ending segments of text streams.

-n N: Output specific number of lines

-f: Follow mode (tails appended data to file live; ideal for application logs)

Bash
head -n 5 system.log
tail -f /var/log/nginx/error.log

**********************************************************************************

Task 6: Useful Patterns and One-Liners
1. Find and delete files older than N days
Bash
find /var/log/tmp -type f -mtime +30 -name "*.tmp" -delete

2. Replace a string across multiple configuration files in-place
Bash
find ./config -type f -name "*.conf" -exec sed -i 's/PORT=8080/PORT=9000/g' {} +

3. Parse and extract the IP addresses from an access log, outputting the top 5 hit counts
Bash
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -n 5

4. Tail a system log and filter for specific errors in real time
Bash
tail -f /var/log/syslog | grep --line-buffered -E "CRITICAL|FATAL|ERROR"

5. Check if a specific service is running, and print an alert if down
Bash
pgrep nginx >/dev/null && echo "Nginx: RUNNING" || echo "ALERT: Nginx is DOWN!"

****************************************************************************************

Task 7: Error Handling and Debugging
Exit codes
Indicate whether a script or command executed successfully.

Bash
ls /missing_folder
echo $?  # Outputs non-zero exit code (e.g., 2), indicating an error occurred

exit 0   # Hardcode explicit script success
exit 1   # Hardcode explicit script failure
set -e (Exit on error)
Instructs the script to terminate immediately if any command exits with a non-zero status.

Bash
set -e
cp non_existent_file.txt /tmp/  # Script crashes immediately here
echo "This line will never execute."
set -u (Unset variables)
Treats uninitialized/unset variables as an immediate execution error instead of expanding them to blank space.

Bash
set -u
echo $UNDEFINED_VARIABLE  # Throws "unbound variable" error and terminates
set -o pipefail
Ensures a pipeline returns the exit status of the last command to fail, rather than defaulting to the status of the final command in the chain.

Bash
set -o pipefail
invalid_command | echo "test"
echo $?  # Outputs failure code from invalid_command instead of success code from echo
set -x (Debug mode)
Prints a trace of every command along with its expanded arguments to stdout before execution.

Bash
set -x
NAME="DevOps"
echo "Deploying to $NAME"
set +x  # Turns off debugging mode
Trap
Catches system signals or exit triggers to run specific cleanup routines automatically before the process ends.

Bash
cleanup() {
    echo "Cleaning up temporary files..."
    rm -f /tmp/scratch_file.$$
}

# Bind the cleanup function to the script's EXIT state
trap cleanup EXIT

touch /tmp/scratch_file.$$

*******************************************************************************************