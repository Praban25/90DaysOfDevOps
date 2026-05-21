Day 6 - Linux Fundamentals: Read and Write Text Files

Today’s goal is to practice basic file read/write using only fundamental commands.

commands : 
touch txtfilehacks		--> Create an empty file named 'txtfilehacks'
echo "text_to_insert" >> <File_name>		--> using echo command, appending the txt into file
cat <file_name>			--> to check the file content
tac <file_name>			--> it shows last comment first.. in reverse format. latest comment will be first.
head -n 2 <file_name>		--> first 2 lines of the file
tail -n 2 <file_name>		--> last 2 lines of the file
tail -2f <file_name>		--> to check live changes, like for log files
cat <file_name> > <another_file>		--> one file content redirect to another file (use >> to append more data)
cat <file_name> | xargs -L 1 mkdir		--> It takes input form file and as per -L 1 argument create folder for each line in that file
