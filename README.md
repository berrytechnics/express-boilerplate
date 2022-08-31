# Express-Boilerplate
**Jumpstart** your static user-based web project
## Description
Express-Boilerplate is an **ES6** template for designing a static web project using open-source technologies for a seamless and simple solution to get your project online now.
## Getting Started
### Dependencies
* Node.js
* Yarn (or npm)
* Code-editor (i.e. VS_Code)
### Installing
* Clone Repo
* Create a file in the project directory named .env
* Paste the following code into .env, where *mongodb_URI* is a valid mongodb uri, and *admin_code* is a custom passcode.
```
MONGODB_URI=<mongdb_URI>
ADMIN_CODE=<admin_code>
```
* in a terminal, navigate to the project folder
* execute each line of code.
```
npm run sass
npm run imgCompress
```
* "sass" will compile css
* "imgCompress" will compress the source images
* These only need to be run on changes to scss or images
### Executing program
* to start the server :
```
npm start
```
## Author
@berrytechnics
## Version History
* 0.1
* Initial Release
## License
This project is licensed under the MIT License - see the LICENSE.md file for details