# Commenting Project

React.js application that simulates a social platform replying system.

## Table of Contents

- [Installing](#installing)
- [Run the Project](#running)
- [Potential Issues](#potential-issues)

<a name="installing"></a>

### Installing

[Install Node Version Manager](https://github.com/coreybutler/nvm-windows)

After successful installation of the NVM, open a new console and install Node v16.18

    nvm install v16.18

Last step is too use the installed version of the Node with

    nvm use 16.18

Install JSON Server

    npm install -g json-server

<a name="running"></a>

### Running the project

Open the Project in Code Editor (preferably Visual Studio Code)

Install the NPM packages

    npm install

Start Node.js application

    npm run start

The above-mentioned command will concurrently start: 1) _React.JS application_ 2) _JSON Server (database mock)_

<a name="potential-issues"></a>

### Potential 'npm run start' issues.

If you are experiencing issues while using 'npm run start', try to following steps to validate the issue:

    npm run start:database

If the issue persists, the issue is related with starting the JSON Server.

The following two steps should solve the issue.

1. Open _Windows PowerShell_
2. Run the command _'Set-ExecutionPolicy RemoteSigned -Scope CurrentUser'_ \*_Try to start the Application with 'npm run start' from Code Editor_
