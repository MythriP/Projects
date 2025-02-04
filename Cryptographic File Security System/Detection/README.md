# 5. Detection
This program (``detection.py``) is about analysing collected data during monitoring stage.
The collected data will be analysed based on file modification policy, whereby,
modified files will be checked if they are being encripted or already encrypted and send an alert.
If encryption process is detected, then the policy will be violeted. This will 
allow room for mitigation process such as aborting file encryption in stage 6.
## Libraries used
No special libraries were used only Os library and re library for checking encryption patterns that exist.

### How it works
This program ``detection.py`` should be run toigether with `monitor.py` where by
when monitoring process will be on and logging process being handled, the detection program will be reading `monitor_log.csv` file and assess files for any change automatically.

#### To run the program
We will run this program in windows operationg system as used for testing, using 
command ``python detection.py`` to view the process. When the program successfuly 
executes, it will print to the console Policy violation error for any file that has encryption pattern detected. 

The program successfully executed and provided the desired results.
