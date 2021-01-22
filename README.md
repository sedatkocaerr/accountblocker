# Accountblocker
Accountblocker with node.js , angular , socket.io

AccountBlocker is a session multi-session blocking project.
Allows the user to log in from 2 different browsers at the same time with 1 account.

Allow the 1 page for 1 browser.

## Account Block screen photo
![Alt Text](https://media.giphy.com/media/mbcrUnpgY1Q6BHIheh/giphy.gif)

## Multi Page Block screen photo
![Alt Text](https://media.giphy.com/media/CBoCqjdnftvu1qefZb/giphy.gif)


## Using Docker Compose
You can run the required infrastructure components by issuing a simple command:
```
$ docker-compose up
```
form your terminal command line, whilst being inside the repository rot directory.

It might be a good idea to run the services in detached mode, so you don't accidentally stop them. To do this, execute:
```
$ docker-compose up -d
```
To stop all services, from the repository root execute this command:
```
$ docker-compose stop
```
Hence that this command does not remove containers so you can run them again using docker-compose up or docker-compose start and your data will be retained from the previous section.

If you want to clean up all data, use
```
$ docker-compose down
```
This command stops all services and removes containers. The images will still be present locally so when you do docker-compose up - containers will be created almost instantly and everything will start with clean volumes.

