# Express-Boilerplate
**Jumpstart** your static user-based web project
## Description
* supports SCSS
* supports image Compression

Express-Boilerplate is an **ES6** template for designing a static web project using open-source technologies for a seamless and simple solution to get your project online now.
This template has *CORS* enabled by default. This can be disabled in server.js
## Getting Started
### Dependencies
* Node.js
* Sass
* Yarn (or npm)
* Git
* auto-changelog (NPM.js)
* Code-editor (i.e. VS_Code)
### Installing
* Clone Repo
* Create a file in the project directory named .env
* Paste the following code into .env, where *mongodb_URI* is a valid mongodb uri, and *admin_code* is a custom passcode.
```
MONGODB_URI=<mongdb_URI>
ADMIN_CODE=<admin_code>
```
### Executing program
* To start the server run
```
yarn run dev
yarn start
```
* After modifications, a new release can be made by running one of the three commands:
``` 
yarn run build-patch
yarn run build-minor
yarn run build-major
 ```
## Author
@berrytechnics
## Version History
* semantic versioning is done automatically with the build-xxx commands
[CHANGELOG.md](https://github.com/berrytechnics/Express-Boilerplate/blob/main/CHANGELOG.md)

This project is licensed under the MIT License - see the LICENSE.md file for details