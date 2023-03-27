# MentalHealthProject
 FYP

This is a web application designed for students at Maynooth University to find the Mental Health Services that are available to them on campus. Users can register and log in which will then allow them to create posts as well as insert services. There are 3 main compontents to a web app, the front end, the back end and the web server. The front end was developed with CSS and HTML, and the back end was implemented using Node.js and Express.js. This web app is developed with MongoDB as the database connection.

Installation:

1. Clone the repository from Github: https://github.com/karlam01/MentalHealthProject.
2. Open in preferred IDE. 
3. Ensure Node.js in installed.
4. Open a new terminal and ensure you are in the directory .../MentalHealthProject.
5. Install necessary dependencies, the first being: 'npm install -g nodemon' and the second being: 'npm install'.
6. Start the server by typing 'nodemon app.js' in the terminal.

Using the app:
1. Open your preferred browser and go to: 'localhost:3000'.
2. You will see posts on the home page, these are upcoming events regarding mental health.
3. Click the services provided tab in the navigation bar to see the services available at maynooth university.
4. Press the register button in the top navigation bar to create an account, enter a valid email and password. You will then be able to log in using those same credentials when you visit the website again.
5. To create a post you must first log in, you will then be redirected to the home page.
6. After submitting a post, you will be redirected to the login page where you can see your newly added post at the bottom of the home page.
7. To insert a service, go to 'localhost:3000/serviceInsert' and enter the details. You will then be able to view it at the bottom of the services provided page.

Technologies Used:

Node.js
Express.js
MongoDB
Dotenv
Body-Parser
Mongoose
Express Session
Passport
JavaScript
HTML
CSS
EJS

Contributors:

Karla Mihut.
