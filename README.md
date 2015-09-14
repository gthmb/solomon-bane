# Solomon Bane - The Wise Choice

This is a single-page javascript application for accepting user data for an application, and providing status on previous applications. It was done just to play with vanilla JS on the client side (no frameworks) and with a simple node server.

It's not a production application, so it's not using SSL/HTTPS. It's really a front-end exercise, so I skipped things like user accounts and full authentication/authorization.

## Set up

### Requirements
* [Node.js](https://nodejs.org/): for the server/grunt
* [npm](https://www.npmjs.com/): this should be installed with Node by default
* [Grunt](http://gruntjs.com/): for dev-side tasks
 * requires the grunt-cli. Once npm is installed you can run `sudo npm install -g grunt` 

### Installing
* Clone this project or download the zip and unzip it. It's best to do this in a directory under a local webserver.
* Open your command line prompt
* `cd` into the base directory
* Run the command `npm install`
* Watch all the dependancies come rolling in

### Building the app
* `cd` into the base directory if you aren't already there
* Run the default Grunt command `grunt`
  * This kicks off the build process and runs the test suite

### Running the server
* `cd` into the `server` directory
* Run the command `node server.js`
  * You should now be able to access [http://localhost:3000](http://localhost:3000) in your browser and see 'Hello There!'

### Using the app
After you've built the project and are running the server, you visit the `deploy` folder in your browser to use the app. If the application isn't running on a webserver, then you'll need to load the `index.html` file directly. You can actually use the app without running the server, but you won't be able to submit any applications.

**On Devices/Local Network**: If you'd like to run the app (with server interaction) on a machine/device on your network that is not the machine hosting the application, you can! - and should, since this baby was built with mobile in mind. However, since the default service URLS point to the server on `localhost:3000` (which is only available on the host machine) we need to make a special build:

* First, make sure the application is residing in a directory that publicly accessible on your network
* Next, find the IP address of your host machine.
  * On OSX, you can open a new Terminal prompt and run `ifconfig`. This is will spit out a bunch of IP addresses for your machine. The one you want looks something like: `192.168.1.XXX`.
  * To verify you have the correct IP address try acessing it in a browser on another device/machine
* Once you have the proper IP address, rebuild the project with the `--serverAddress=http://{IP_ADDRESS}:3000` command
  * For example, if your host machine's public IP address is `192.168.1.136`, then you would build the project like `grunt --serverAddress=http://192.168.1.136:3000`
