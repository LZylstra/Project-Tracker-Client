<<<<<<< HEAD
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
=======
# Project Tracker

[Project Tracker](https://project-tracker.now.sh)

This is a basic collaborative project tracker. All members of a given company will see the same data. Once you have created an account you can create projects and add tasks to track progress on a given project. There are two different roles for users. Administrators and standard users. Initially the only admin user will be the one who creates the company. When more users are added to the company the admin can change additional users to the admin role.


![Landing Page](/screenshots/login.png)
![Home Screen](/screenshots/home.png)
![Create Project Screen](/screenshots/addProject.png)
![Create Task Screen](/screenshots/addTask.png)

# Project Tracker API info

### All endpoints except for '/api/users' and '/api/auth/login/' and 'api/company' are protected endpoints and thus must have an 'Authorization' header

#### Create New Company Endpoint

[https://tranquil-mountain-91418.herokuapp.com/api/company](https://tranquil-mountain-91418.herokuapp.com/api/company)

Example
```
fetch('https://tranquil-mountain-91418.herokuapp.com/api/company', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `bearer "your bearer token here"`,
    },
    body: JSON.parse({
        company_name: "Company here"
    })
})
```
#### Create New User Endpoint

[https://tranquil-mountain-91418.herokuapp.com/api/users](https://tranquil-mountain-91418.herokuapp.com/api/users)


Example
```
fetch('https://tranquil-mountain-91418.herokuapp.com/api/users', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `bearer "your bearer token here"`,
    },
    body: JSON.parse({
        email: "email@here.com",
        full_name: "name here",
        password: "password here"
        isadmin: boolean value here
    })
})
```
### Login Endpoint

[https://tranquil-mountain-91418.herokuapp.com/api/auth/login](https://tranquil-mountain-91418.herokuapp.com/api/auth/login)

```
fetch('https://tranquil-mountain-91418.herokuapp.com/api/auth/login', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `bearer "your bearer token here"`,
    },
    body: JSON.parse({
        email: "email@here.com",
        password: "password here"
    })
})
```
### Add or Get Projects Enpoint

[https://bug-trapper-server.herokuapp.com/api/projects](https://bug-trapper-server.herokuapp.com/api/projects)

Example
```
fetch('https://tranquil-mountain-91418.herokuapp.com/api/projects', {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `bearer "your bearer token here"`,
    }
})
```
### Add or Get Tasks Enpoint

[https://bug-trapper-server.herokuapp.com/api/tasks](https://bug-trapper-server.herokuapp.com/api/tasks)

Example
```
fetch('https://tranquil-mountain-91418.herokuapp.com/api/tasks', {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `bearer "your bearer token here"`,
    }
})
```
### Update Task Endpoint 

[https://bug-trapper-server.herokuapp.com/api/tasks/:id](https://bug-trapper-server.herokuapp.com/api/tasks/:id)

Example
```
fetch('https://tranquil-mountain-91418.herokuapp.com/api/tasks/1', {
    method: "Patch",
    headers: {
        "Content-Type": "application/json",
        Authorization: `bearer "your bearer token here"`,
    }
    body: JSON.parse({
        task_name: "task name",
        assignedto: user assigned id, (number)
        description: "description here",
        priority: "priority here",
        status: "status here",
        dateclosed: date closed here (date object)
    })
})
```
### Update Task Endpoint 

[https://bug-trapper-server.herokuapp.com/api/projects/:id](https://bug-trapper-server.herokuapp.com/api/projects/:id)

Example
```
fetch('https://tranquil-mountain-91418.herokuapp.com/api/projects/1', {
    method: "Patch",
    headers: {
        "Content-Type": "application/json",
        Authorization: `bearer "your bearer token here"`,
    }
    body: JSON.parse({
        project_name,: "project name",
        description: "description here",
        duedate: due date here, (date object)
        priority: "priority here",
        status: "status here",
        dateclosed: date closed here (date object)
    })
})
```
### Update Task Endpoint 

[https://bug-trapper-server.herokuapp.com/api/users/:id](https://bug-trapper-server.herokuapp.com/api/users/:id)

Example
```
fetch('https://tranquil-mountain-91418.herokuapp.com/api/users/1', {
    method: "Patch",
    headers: {
        "Content-Type": "application/json",
        Authorization: `bearer "your bearer token here"`,
    }
    body: JSON.parse({
        full_name: "full name here",
        isadmin: boolean value here,
        email: "email here"
    })
})
```
## Tech Stack Used

#### JavaScript <img src="/tech-logos/javascript.png" height="50px" width="50px" alt="javscript logo"/>

### React <img src="/tech-logos/react.png" height="50px" width="50px" alt="react logo"/>

### Css <img src="/tech-logos/css.png" height="50px" width="50px" alt="css logo"/>

### PostgreSQL <img src="/tech-logos/postgre.jpeg" height="50px" width="50px" alt="postgresql logo"/>

### Nodejs <img src="/tech-logos/node.png" height="50px" width="50px" alt="nodejs logo"/>
>>>>>>> e52eae16bcc76f7e0afc2e0c7f151a1dbeab47de
