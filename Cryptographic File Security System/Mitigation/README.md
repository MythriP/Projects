## Mitigation program
This program is developed to detect policy violation, notify the
system administrator using Windows prompt alert and performs termination process.
The program runs by creating backup and quarantine directories where affected files will be quarantined and moved to quarantine directory.
Quarantine process helps to reduce data loss and more damage to the files.

The program also moves restored files in backup directory thus separating secure files for use. If restroration fails, the files will remain quarantined.

# Running the program
The program is run using command `python mitigation.py`. After successfully, running the program, backup and quarantine directories will be created and store files according to the purpose of the directory.
The program reads ``monitor_log.csv`` file where by it checks file path violation and acts upon appropriately.

## libraries used
Libraries used are; os, re, ctypes, psutil, and shutil libraries.