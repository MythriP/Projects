import psutil
import csv
import time
import os
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler

# Event handler to monitor file changes
class FileChangeHandler(PatternMatchingEventHandler):
    def __init__(self):
        super().__init__(patterns=['*'], ignore_directories=False)
    # created file log
    def on_created(self, event):
        handle_event('created', event.src_path)
    # modified log
    def on_modified(self, event):
        handle_event('modified', event.src_path)
    # moved file log
    def on_moved(self, event):
        handle_event('moved', event.dest_path)

def handle_event(event_type, file_path):
    # Get the process that triggered the event
    process = get_event_process(file_path)
    pid, process_name = get_process_info(process, file_path)

    log_data([time.strftime('%Y-%m-%d %H:%M:%S'), event_type, file_path, pid, process_name])
    print(f"File {event_type}: {file_path} (PID: {pid}, Process: {process_name})")

# Function to get the process that triggered the file system event
def get_event_process(file_path):
    for proc in psutil.process_iter(['name', 'exe', 'cmdline', 'open_files']):
        try:
            for open_file in proc.open_files():
                if open_file.path == file_path:
                    return proc
        except (psutil.AccessDenied, psutil.NoSuchProcess):
            pass
    return None

# Function to get process information
def get_process_info(process, file_path):
    if process:
        return process.pid, process.name()
    else:
        # Try to get the PID from the file handle
        try:
            open_files = psutil.Process().open_files()
            for open_file in open_files:
                if open_file.path == file_path:
                    pid = open_file.pid
                    return pid, psutil.Process(pid).name()
        except (psutil.AccessDenied, psutil.NoSuchProcess, IndexError):
            pass
    return 'N/A', 'N/A'

# Function to log the monitored data to a CSV file
def log_data(data):
    log_file = 'monitor_log.csv'
    with open(log_file, 'a', newline='') as file:
        writer = csv.writer(file)
        if os.path.getsize(log_file) == 0:  # Check if the file is empty
            writer.writerow(['Timestamp', 'Event Type', 'File Path', 'PID', 'Process Name'])  # Write header row
        writer.writerow(data)

# Get the root directory of the script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Main monitoring loop
if __name__ == "__main__":
    event_handler = FileChangeHandler()
    observer = Observer()
    observer.schedule(event_handler, script_dir, recursive=True)
    observer.start()

    try:
        while True:
            # Keep the program running indefinitely
            time.sleep(1) # monitor after every second
    except KeyboardInterrupt:
        # Stop the observer when the user presses Ctrl+C
        observer.stop()
    observer.join()