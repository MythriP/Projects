import os
import re

# Pattern to detect potentially encrypted files
ENCRYPTED_FILE_PATTERN = r'[a-zA-Z0-9+/=]+'
def is_file_encrypted(file_path):
    try:
        with open(file_path, 'r') as f:
            content = f.read()
            if re.match(ENCRYPTED_FILE_PATTERN, content):
                return True
    except UnicodeDecodeError:
        return True
    return False

def detect_policy_violations(log_file):
    alerts = []

    with open(log_file, 'r') as f:
        next(f)  # Skip the header row
        for line in f:
            timestamp, event_type, file_path, pid, process_name = line.strip().split(',')

            if event_type == 'modified':
                if is_file_encrypted(file_path):
                    alerts.append(f"Policy violation detected: File {file_path} appears to be encrypted at {timestamp}")

    return alerts

# load log file
log_file = 'monitor_log.csv'
alerts = detect_policy_violations(log_file)
for alert in alerts:
    print(alert)