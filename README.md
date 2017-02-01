# Repo for the FrontendEngineer Curriculum

This repo implements the exercises outlined in the  Frontend Engineer Curriculum course on Github by luhmann.
This project requires NodeJS and the Node Package Manager to work.

##Getting up and running

**Setting up the environment**
* Open the command line interface (CLI) in the root of the project and run: 'npm install'

**Command line scripts:**
* 'npm run lint'  (executes ES6 javascript linting for the project)
* 'npm run autofixlint' (executes linting and automatically fixed lint errors)
* 'npm run test:unit'  (executes the unit tests using jets)
* 'npm run test:e2e'  (executes the end-to-end tests using nightwatch [requires the application to be running - see npm start below])
* 'npm run test'  (executes both unit and then e2e tests sequentially)
* 'npm run build'  (builds the project with webpack [env set to production])

**Running the app**
* 'npm start'  (runs the application on http://localhost:8080/ using webpack-dev-server and a nodemon executing Hot Module Replacement on the running server)


##Third party software used

**1.1 Module Bundler**
* Webpack@2

The project uses Webpack 2 module bundler in combination with NPM to configure
and bundle the project and manage its dependencies. This allows the application
to be housed in a generated index.html file and able to consume ES6 standards.

**References and documentation:**
* http://survivejs.com/webpack/developing-with-webpack/getting-started/


**1.2 Runtime Environment**
* Node.js (making use of the node package manager "npm")

**References and documentation:**
* https://www.npmjs.com/


**1.3 JS Linting**
* eslint

**References and documentation:**
* http://eslint.org/


**1.4 Node.js Loaders**
* style-loader
* css-loader
* url-loader
* file-loader

**References and documentation:**
* https://github.com/webpack/style-loader
* https://github.com/webpack/css-loader
* https://github.com/webpack/url-loader
* https://github.com/webpack/file-loader

**1.5 Unit Tests**
* Jest

**References and documentation:**
* https://facebook.github.io/jest/


**1.6 E2E Tests**
* NightwatchJS

**References and documentation:**
* http://nightwatchjs.org/


**1.7 Continuous Integration**
* Travis CI

Travis build steps will run linting, unit testing and build the project.
e2e testing has been removed as a build step due to the undue amount of
effort required to get this step working with nightwatch using travis.

**References and documentation:**
* https://travis-ci.org/
