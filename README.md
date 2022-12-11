# Project Blogs UI

This is a ReactJS based frontend made in conjunction with backends [Project Blogs Backendy](https://github.com/JS-CodeGamer/Project-Blogs-Backendy) and [Project Userify](https://github.com/JS-CodeGamer/Project-Userify) to create a full stack web-application.
Technologies used in the three projects are:

## [Project Blogs Backendy](https://github.com/JS-CodeGamer/Project-Blogs-Backendy)
  - Django with django-rest-framework for making REST API's
  - PyJWT for token verification
  - Used Django-Cors-Headers for allowing frontend-backend interaction.

## [Project Userify](https://github.com/JS-CodeGamer/Project-Userify)
  - Django with django-rest-framework for making REST API's
  - Django with django-rest-framework simple-jwt for token authentication and token genreation
  - Used Django-Cors-Headers for allowing frontend-backend interaction.

## [Project Blogs UI](https://github.com/JS-CodeGamer/Project-Blogs-UI)
  - ReactJS with React-Router for frontend serving
  - Bootstrap for styling

## Installation and Setup

Follow these instructions to set up this project:
  - Open your terminal / shell.
  - Clone this repo using the url https://github.com/JS-CodeGamer/Project-Blogs-UI using commang `git clone <url>`
  - Naviagte to the directory into which this reposetory is cloned using `cd ./Project-Blogs-UI`
  - Install npm and NodeJS if not already installed
  - Run `npm install` in the terminal after navigating to cloned repo
  - Run `npm start` and the server will start at default port 3000

TLDR:
  Run the following code in your terminal after installing NodeJS.
  ```
  git clone https://github.com/JS-CodeGamer/Project-Blogs-UI
  cd ./Project-Blogs-UI
  npm install
  npm start
  ```
  
For integrating backends [Project Blogs Backendy](https://github.com/JS-CodeGamer/Project-Blogs-Backendy) and [Project Userify](https://github.com/JS-CodeGamer/Project-Userify):
  - Run the backend api microservices and allow the server through CORS settings in settings.py for both backends
  - Use environment variables REACT_APP_USERS_API_URL and REACT_APP_USERS_API_URL to store the backend urls

## Future Endevours:
  - Try converting to native CSS or SCSS for styling
  - Make better error handeling for more detailed error messages
  - Try integrating animations into UI
