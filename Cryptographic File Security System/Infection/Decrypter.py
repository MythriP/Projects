#!/usr/bin/env python3
import os
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes

def decrypt_file_rsa(file_path, private_key, log_file):
    with open(file_path, 'rb') as file:
        cipher_text = file.read()
        plaintext = private_key.decrypt(
            cipher_text,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )
    with open(file_path, 'wb') as file:
        file.write(plaintext)
    with open(log_file, 'a') as log:
        log.write(f"Decrypted files List:\n")
        log.write(f"{file_path}\n")

def decrypt_files_in_directory(directory_path, excluded_extensions, private_key_file, log_file):
    with open(private_key_file, 'rb') as key_file:
        private_key = serialization.load_pem_private_key(
            key_file.read(),
            password=None,
            backend=default_backend()
        )

    file_count = 0
    dir_count = 0

    for root, dirs, files in os.walk(directory_path):
        dir_count += 1
        for file in files:
            file_count += 1
            file_extension = os.path.splitext(file)[1].lower()

            if file_extension in excluded_extensions:
                continue

            file_path = os.path.join(root, file)
            decrypt_file_rsa(file_path, private_key, log_file)

    try:
        os.remove(private_key_file)
    except OSError as e:
        print(f"Error in deleting key: {e}")

    with open(log_file, 'a') as log:
        log.write(f"Total directories: {dir_count}\n")
        log.write(f"Total files: {file_count}\n")
        log.write("Congratulations... Your files have been decrypted successfully.\n")

def main():
    excluded_extensions = ('.py', '.pem', '.md')
    directory_path = os.getcwd()
    key_file = 'rsa_key.pem'
    secret_password = 'hello world'
    log_file = 'decryption_log.txt'

    if os.path.exists(key_file):
        print('Please enter the secret password:')
        entered_password = input('')

        if secret_password == entered_password:
            decrypt_files_in_directory(directory_path, excluded_extensions, key_file, log_file)
            print('Congratulations... Your files have been decrypted successfully.')
            try:
                os.startfile(log_file)  # Opens the log file using the default program
            except OSError as e:
                print(f"Error in opening log file: {e}")
        else:
            print('Password is wrong!')
    else:
        print('Key does not exist!')

if __name__ == "__main__":
    main()
