  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  
# Tech Talk

A CMS-style blog site that allows users to publish articles, view blog posts, and post comments to share thoughts and opinions.  

## Description
This application is a CMS-style blog site. When a user visits the site, they are able to view all posts and comments. Each post provides the user with the name of the person that created the post and the date the post was created.

A new site visitor may create an account, which will give them access to submit comments on existing posts and create their own posts. 

A user can come back at any time, log in, and access their dashboard to view all of the posts they have previously submitted. A user that has created posts may edit and/or delete previous posts, giving them complete control over their articles.

The UI is clean, polished, and will help the User navigate the site with ease.

This application was built using the following:

* Javascript
* HTML & cSS
* MySQL
* Sequalize
* Express
* Handlebars
* Bcrypt

The folder structure follows the Model-View-Controller (MVC) paradigm.

## Table of Contents

  * [Description](#description)
  * [Installation](#installation)
  * [License](#license)
  * [Usage](#usage)
  * [Road Bumps](#road-bumps)
  * [Preview](#preview)
  * [Questions](#questions)

## Installation

Clone the repository onto your local environment. 

The following dependancies, listed in `package.json` must be installed to run this application: 

* bcrypt
* connect-session-sequalize
* dotenv
* express
* express-handlebars
* express-session
* mysql2
* sequalize


Run the following code to install the dependancies: 

`npm install` 


## License

This application is covered under the MIT license.

## Usage

![Gif of the Employee Tracker in action.](/assets/images/employee-tracker-demo.gif)

This is a command-line application. Once it has been cloned to your local environment, open the application. Run the following commands:

`mysql -u root -p` followed by your password to access MySQL.

`source schema.sql` followed by `source seeds.sql` to source the files. 

Right-click the index.js file and open it in terminal. Run `npm start`. Select an option from the list to get started. After providing an answer for each of the questions, a corresponding table will be displayed. 


### Application Screenshots

Terminal View

![Screen shot of terminal displaying employees table.](/assets/images/view-employees.png)

![Screen shot of terminal displaying roles table.](/assets/images/view-roles.png)

![Screen shot of terminal displaying departments table.](/assets/images/view-departments.png)


## Road Bumps

The following two snippets of code were headache inducing. In both of these instances, both a name and a value were being passed through a variable. The program will fail if the incorrect value is being INSERTED into a table. Before my aha moment (because I had commented out my `throw err` and couldn't figure out what was wrong), the employee name (a string) was being inserted. The column, however, calls for the `manager_id` -> an integer. After adding additional lines of code to grab the ID, the new employee was successfully added to the database. 

`db.query('INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (?,?,?,?,?)', [employee.id, employee.first_name, employee.last_name, employee.role_id, managerID],`

Same issue here. `employee.id` was pulling through a string and not an integer. MySQL may throw an error if you compare a number with a string. It may look something like this: Truncated incorrect DOUBLE value. This was my first clue that I wasn't passing through the correct data, and a big learning moment. 

`db.query('UPDATE employee SET role_id = ${employee.role_id} WHERE id = ${employee.id}', `

During the building of this application, I stumbled over many road bumps, but these two ranked high on the list.  


## Preview

GitHub Repo: https://github.com/jsamborski310/Employee-Tracker


## Questions

For questions about this application or if you would like to collaborate, connect with me on <a href="https://www.linkedin.com/in/juanita-samborski/" target="_blank">Linkedin</a>.

