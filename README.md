# React - Fancy App
MongoDB Express React Node Login System

## Installation & Setup
1. Install [Node.js](https://nodejs.org/) & [MongoDB](https://www.mongodb.org/).
2. Clone this repository.
3. In `/react-fancyapp` and `/react-fancyapp/client` directory
		
		> npm install
		
4. start MongoDB.

		> mongod

5. In `/react-fancyapp` directory, start the server

		> npm run dev
    
6. In `/react-fancyapp/client` directory

		> npm start
		
7. Go to [http://localhost:3000](http://localhost:3000) in your web browser.


 ### Testing
 Login can be tested using `npm test`

## Features

* Register new user and keep the data in `MongoDB`
* Password encrypted using [Bcrypt](https://www.npmjs.com/package/bcrypt)
* Login using registered email and password (Using [Passport](http://www.passportjs.org/))
* Change password for existing users
* Delete account
* Multiple languages 

