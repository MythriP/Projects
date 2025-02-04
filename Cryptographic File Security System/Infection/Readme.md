# FILE ENCRYPTION AND DECRYPTION PROGRAM (PART 3)

# Program descryption
This program is about encrypting and decrypting files recursively from the root directories where the programs are executed.

The encryption program `encrypter.py` cn cause har such as data loss if wrongly uses. You are adviced to run in a specific folder for testing purposes.
Use `decrypter.py` program to decrypt encrypted files.

# Libraries Required
These programs require the following libries to run:
- cryptography library (both encrypter and decryper programs)
- os library (both encrypter and decryper programs)
- csv library (for encrypter program for writing csv file)
- platform library (to determine the file Operating sustem such as Windows, Linux and MacOS during      execution of csv log file)

# How to prepare infection
- We will prepare our infection by compiling the encrypter program to generate the executable file.
- Compiled program will be in dist folder and the executable will run on the specific OS that
was used to generate the executable. For example, the executable developed n widows machine will only run 
in windows environment.

To compile the program, `pyinstaller` must be intelled example using pip command [`pip install pyinstaller`].

Run the command ``pyinstaller program_name.py`` to complile the program. Example , compiling
encrypter.py, we run `pyinstaller encrypter.py` command. This will generate executable file in dist folder
called, `encrypter`.

Zip `encrypter.exe` together with `key.key` file inorder to be send to the host.

# Preparing Email phishing
1. This is the method to be used for infection. An email will be send to a host 
   with executable [encrypter.exe] and `key.key` files in a zipped format.
2. The zipped file must be ``Self-extracting archive`` so that it can execute automtically after download.
    Tools that can be used to create the archive are WinRAR,Nullsoft Scriptable Install System, or 7-Zip.

# How to create a self extracting archive (using WinRAR)
To create a selextracting archive using WinRAR, we select checkbox `Create SFX archive`.

The following are sel extracting files attached:
1. Encrypter
2. Ransomeware decrypter
