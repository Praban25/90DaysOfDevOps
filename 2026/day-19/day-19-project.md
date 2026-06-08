Day 19 – Shell Scripting Project: Log Rotation, Backup & Crontab

Task 1: Log Rotation Script

Create log_rotate.sh that:

Takes a log directory as an argument (e.g., /var/log/myapp)
Compresses .log files older than 7 days using gzip
Deletes .gz files older than 30 days
Prints how many files were compressed and deleted
Exits with an error if the directory doesn't exist

==>

sudo vi log_rotate.sh


!/bin/bash

#Ensuring the argument is provided
if [ -z ""$1 ]; then
        echo "Missing log directory argument" >&2
        echo "Usage: $0 <path_of_directory> " >&2
        exit 1
fi

LOG_DIR="$1"

#check if directory exist & valid
if [ ! -d "$LOG_DIR" ]; then
        echo "Error: Directory '$LOG_DIR' not exist" >&2
        exit 1
fi

echo "Starting Log Rotation"
echo ""

#Compress .log files older than 7 days
COMPRESSED_COUNT=$(find "$LOG_DIR" -name "*.log.*" -type f -mtime +7 -print | wc -l)
find "$LOG_DIR" -name "*.log.*" -type f -mtime +7 -exec gzip {} \;

#Delete .gz files older than 30 days
DELETED_COUNT=$(find "$LOG_DIR" -name "*.gz" -type f -mtime +30 -print | wc -l)
find "$LOG_DIR" -name "*.gz" -type f -mtime +30 -delete


# 3. Print the results
echo "Log cleanup complete:"
echo ""
echo "  - Files compressed: $COMPRESSED_COUNT"
echo "  - Files deleted:    $DELETED_COUNT"

sudo chmod +x log_rotate.sh
./log_rotate.sh

What i learn:
Error handling for argument
Error handling for directory if not exist

****************************************************************************************

Task 2: Server Backup Script
 
Create_backup.sh that:

Takes a source directory and backup destination as arguments
Creates a timestamped .tar.gz archive (e.g., backup-2026-02-08.tar.gz)
Verifies the archive was created successfully
Prints archive name and size
Deletes backups older than 14 days from the destination
Handles errors — exit if source doesn't exist

==>

sudo vi create_backup.sh


#!/bin/bash

# Ensure both source and destination arguments are provided
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Error: Missing arguments." >&2
    echo "Usage: $0 <source_directory> <backup_destination>" >&2
    exit 1
fi

SRC_DIR="$1"
DEST_DIR="$2"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILENAME="backup-$TIMESTAMP.tar.gz"
BACKUP_PATH="$DEST_DIR/$BACKUP_FILENAME"

# 1. Error Handling: Verify source directory exists
if [ ! -d "$SRC_DIR" ]; then
    echo "Error: Source directory '$SRC_DIR' does not exist." >&2
    exit 1
fi

# 2. Check/Create destination directory
if [ ! -d "$DEST_DIR" ]; then
    echo "Destination '$DEST_DIR' does not exist. Creating it now..."
    mkdir -p "$DEST_DIR" || { echo "Error: Failed to create destination directory." >&2; exit 1; }
fi

echo "Starting server backup..."
echo "Source:      $SRC_DIR"
echo "Destination: $DEST_DIR"
echo "###################################################"

# 3. Create the timestamped .tar.gz archive
tar -czf "$BACKUP_PATH" -C "$SRC_DIR" .


# 4. Archive Size
ARCHIVE_SIZE=$(du -sh "$LOG_DIR" | awk '{print $1}')

if [ $? -eq 0 ] && [ -f "$BACKUP_PATH" ]; then
        echo "Backup created successfully!"
        echo "Archive Name: $BACKUP_FILENAME"
        echo "Archive Size: $ARCHIVE_SIZE"
else
        echo "Error: Backup archive creation failed." >&2
        exit 1
fi


# 5. Delete backups older than 14 days from destination
DELETED_COUNT=$(find "$DEST_DIR" -name "backup-*.tar.gz" -type f -mtime +14 -print | wc -l)
find "$DEST_DIR" -name "backup-*.tar.gz" -type f -mtime +14 -delete

if [ "$DELETED_COUNT" -eq 0 ]; then
    echo "No old backups found to delete."
else
    echo "Purged $DELETED_COUNT old backup file(s)."
fi


echo "###########################################################"
echo "               Backup process complete.                    "
echo "###########################################################"
exit 0

sudo chmod +x create_backup.sh
./create_backup.sh /var/www/html /tmp/backups/server_bckup

What i learn : Error handling for every conditions

*******************************************************************************************

Task 3: Crontab

Read: crontab -l — what's currently scheduled?
Understand cron syntax:
* * * * *  command
│ │ │ │ │
│ │ │ │ └── Day of week (0-7)
│ │ │ └──── Month (1-12)
│ │ └────── Day of month (1-31)
│ └──────── Hour (0-23)
└────────── Minute (0-59)

Write cron entries (in your markdown, don't apply if unsure) for:
Run log_rotate.sh every day at 2 AM
Run backup.sh every Sunday at 3 AM
Run a health check script every 5 minutes

==>

sudo crontab -e

# 1. Run log_rotate.sh every day at 2 AM
0 2 * * * sh /home/praban/scripts/log_rotate.sh

# 2. Run backup.sh every Sunday at 3 AM
0 3 * * 0 sh /home/praban/scripts/create_backup.sh

# 3. Run a health check script every 5 minutes
*/5 * * * * sh /home/praban/scripts/health_check.sh

*********************************************************************************************

Task 4: Combine — Scheduled Maintenance Script

Create maintenance.sh that:

Calls your log rotation function
Calls your backup function
Logs all output to /var/log/maintenance.log with timestamps
Write the cron entry to run it daily at 1 AM

==>

sudo vi maintenance.sh


#!/bin/bash

# Configuration
LOG_DIR="/path/to/logs"
BACKUP_PATH="/path/to/logs" # Adjust if your backup directory is different
MAINTENANCE_LOG="/var/log/maintenance.log"

# Function to log messages with timestamps
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$MAINTENANCE_LOG"
}

# 1. Log Rotation Function
rotate_logs() {
    log_message "Starting log rotation..."
    
    # Compress logs older than 7 days
    COMPRESSED_COUNT=$(find "$LOG_DIR" -name "*.log" -type f -mtime +7 -print | wc -l)
    find "$LOG_DIR" -name "*.log" -type f -mtime +7 -exec gzip {} +
    log_message "Files compressed: $COMPRESSED_COUNT"

    # Delete compressed logs older than 30 days
    DELETED_COUNT=$(find "$LOG_DIR" -name "*.gz" -type f -mtime +30 -print -delete | wc -l)
    log_message "Files deleted: $DELETED_COUNT"
    
    log_message "Log rotation completed."
}

# 2. Backup/Size Status Function
check_backup_status() {
    log_message "Checking storage status..."
    
    # Calculate current size
    ARCHIVE_SIZE=$(du -sh "$BACKUP_PATH" | awk '{print $1}')
    log_message "Current disk usage for $BACKUP_PATH: $ARCHIVE_SIZE"
    
    log_message "Backup status check completed."
}

# --- Main Execution ---
# Ensure the script runs as root/sudo if writing to /var/log/
if [ ! -w "$(dirname "$MAINTENANCE_LOG")" ]; then
    echo "Error: Cannot write to $MAINTENANCE_LOG. Please run with sudo." >&2
    exit 1
fi

log_message "=== MAINTENANCE TASK STARTED ==="
rotate_logs
check_backup_status
log_message "=== MAINTENANCE TASK FINISHED ==="
echo "" >> "$MAINTENANCE_LOG" # Adds a blank line between runs

sudo chmod +x maintenance.sh
./maintenance.sh

**********************************************
