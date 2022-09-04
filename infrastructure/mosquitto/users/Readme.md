# Mosquitto User Management

## How to create a user
1. Install the Mosquitto cli
2. Run
	```sh
		mosquitto_passwd -c <password file> <username>
	```
3. Add the following to the config file
	```
		password_file /etc/mosquitto/password_file
	````