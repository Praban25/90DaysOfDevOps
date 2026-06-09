Day 20 – Bash Scripting Challenge: Log Analyzer and Report Generator

Task 1: Input and Validation
Your script should:

Accept the path to a log file as a command-line argument
Exit with a clear error message if no argument is provided
Exit with a clear error message if the file doesn't exist
Task 2: Error Count
Count the total number of lines containing the keyword ERROR or Failed
Print the total error count to the console
Task 3: Critical Events
Search for lines containing the keyword CRITICAL
Print those lines along with their line number
Example output:

--- Critical Events ---
Line 84: 2025-07-29 10:15:23 CRITICAL Disk space below threshold
Line 217: 2025-07-29 14:32:01 CRITICAL Database connection lost
Task 4: Top Error Messages
Extract all lines containing ERROR
Identify the top 5 most common error messages
Display them with their occurrence count, sorted in descending order
Example output:

--- Top 5 Error Messages ---
45 Connection timed out
32 File not found
28 Permission denied
15 Disk I/O error
9  Out of memory
Task 5: Summary Report
Generate a summary report to a text file named log_report_<date>.txt (e.g., log_report_2026-02-11.txt). The report should include:

Date of analysis
Log file name
Total lines processed
Total error count
Top 5 error messages with their occurrence count
List of critical events with line numbers

==>

sudo vi log_analyzer.sh


#!/bin/bash

# ==========================================
# Task 1: Input and Validation
# ==========================================

# Check if a file path argument was provided
if [ -z "$1" ]; then
    echo "Error: No log file path provided."
    echo "Usage: $0 /path/to/logfile.log"
    exit 1
fi

LOG_FILE="$1"

# Check if the file actually exists
if [ ! -f "$LOG_FILE" ]; then
    echo "Error: File '$LOG_FILE' does not exist."
    exit 1
fi

# ==========================================
# Setup and Variables
# ==========================================
CURRENT_DATE=$(date +%Y-%m-%d)
REPORT_FILE="log_report_${CURRENT_DATE}.txt"
TOTAL_LINES=$(wc -l < "$LOG_FILE" | xargs)

# ==========================================
# Task 2: Error Count
# ==========================================
# Counts lines containing 'ERROR' or 'Failed' (case-sensitive as per requirements)
ERROR_COUNT=$(grep -E "ERROR|Failed" "$LOG_FILE" | wc -l | xargs)

echo "Total Errors/Failures found: $ERROR_COUNT"
echo "----------------------------------------"

# ==========================================
# Task 3: Critical Events
# ==========================================
echo "--- Critical Events ---"
# grep -n outputs "line_num:line_content", which we format using sed or awk
CRITICAL_EVENTS=$(grep -n "CRITICAL" "$LOG_FILE" | sed 's/:/ /' | awk '{printf "Line %s: ", $1; $1=""; print substr($0, 2)}')

if [ -z "$CRITICAL_EVENTS" ]; then
    echo "No critical events found."
else
    echo "$CRITICAL_EVENTS"
fi
echo "----------------------------------------"

# ==========================================
# Task 4: Top Error Messages
# ==========================================
echo "--- Top 5 Error Messages ---"

# This pipeline extracts lines with ERROR, aggressively trims common log timestamps/metadata
# (adjust the awk/cut command if your specific log format leaves trailing spaces),
# counts unique messages, sorts them, and grabs the top 5.
TOP_ERRORS=$(grep "ERROR" "$LOG_FILE" | awk '{ $1=$2=$3=""; print $0 }' | sed -e 's/^[ \t]*//' | sort | uniq -c | sort -rn | head -5)

if [ -z "$TOP_ERRORS" ]; then
    echo "No ERROR messages found."
else
    echo "$TOP_ERRORS"
fi
echo "----------------------------------------"

# ==========================================
# Task 5: Summary Report
# ==========================================
{
    echo "========================================"
    echo "LOG ANALYSIS SUMMARY REPORT"
    echo "========================================"
    echo "Date of Analysis:    $CURRENT_DATE"
    echo "Log File Name:       $(basename "$LOG_FILE")"
    echo "Total Lines Processed: $TOTAL_LINES"
    echo "Total Error Count:   $ERROR_COUNT"
    echo ""
    echo "--- Top 5 Error Messages ---"
    if [ -z "$TOP_ERRORS" ]; then
        echo "No ERROR messages found."
    else
        echo "$TOP_ERRORS"
    fi
    echo ""
    echo "--- Critical Events ---"
    if [ -z "$CRITICAL_EVENTS" ]; then
        echo "No critical events found."
    else
        echo "$CRITICAL_EVENTS"
    fi
} > "$REPORT_FILE"

echo "Summary report successfully generated: $REPORT_FILE"

sudo chmod +x log_analyzer.sh
./log_analyzer.sh <path of logs>

************************************************************************