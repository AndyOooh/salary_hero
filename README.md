<h1 align="center">Salary Hero</h1>
<h4 align="center">A Node.js project with PostgreSQL</h4>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

- [Description](#description) - [Business logic](#business-logic) - [Technical Requirements](#technical-requirements)
- [Usage](#usage) - [Prerequisites](#prerequisites)
- [Features](#features)
- [Technologies](#technologies)
- [Author](#author)

## Description

This is a job application project. These are the requirements given:

##### Business logic

- Salary Hero can create/read/update/delete (CRUD) a company.
- Salary Hero can add a client admin for a company.
- A client admin can CRUD an employee for that company.

##### Technical Requirements

- Node.js (any framework of your choice).
- PostgreSQL (bonus if you are using ORM).

## Assumptions

- Employees do not need to access the system. Instead they will request a salary advance analogously or in an external system.
- Client admins and Salary Hero admins should both be able to CRUD employees.

## Usage

##### Prerequisites

- Node.js v 15.xx.
- Postgres database.
- A frontend emulator such as Postman or [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) for VSCode.

1. Clone this repo and run `npm install`
2. Rename .env.sample to .env and fill out DB_NAME, DB_USER and DB_PASSWORD.
3. Create the genesis company and user:
   1. `npm start` with `NODE_ENV=initial`. This creates the company Salary Hero with id: 1.
   2. Send a POST request to `api/user` with a user object in the body. For example:
      ```json
      {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@doe.com",
        "password": "123",
        "companyId": 1
      }
      ```
      - first_name and last_name are optional.
      - email can be any email conforming to Sequelize's isEmail validator.
      - password can be any with `NODE_ENV=initial`. Otherwise it must be between 8-48 characters, both included.
      - companyId must match the id of the company you want to add the user to. In this case, 1.
   3. The request returns a user object, including an accessToken. The token can be used in subsequent requests to the API by setting `Authrization: Bearer <accessToken>` in the request header.
4. `npm start` with `NODE_ENV=development`. This starts the server. You can now send requests to `api/company` and `api/user`.
5. Create a company and a user for that company. This user will have clientAdmin privileges.
6. Start CRUD'ing employees for that company with the user you just created at `api/employee`. Remember to set the Authorization header in the request with the accessToken you received when creating the user.
7. Refer to routes files for additional endpoints and their usage.
8. ``NODE_ENV=production`` is only relevant when/if adding a frontend.

## Features

- [x] Account creation.
- [x] Login & authentication with Refresh/Access tokens.
- [x] Protected routes with User roles: clientAdmin and shAdmin.
- [x] CRUD operations for companies, users, employees.
- [x] Filter/query employees by any sequelize filters.

## Technologies

- Node.js/Express.
- PostgreSQL/Sequelize.
- (httpOnly) Cookies.
- jsonwebtoken.

## Challenges

## Further development

The project is ready to be deployed. If setting up a frontend, remember set ``NODE_ENV=production`` and fill out ``FRONTEND_URL`` in the .env file. This is to avoid CORS issues.

##### Potential features

- [ ] Add a frontend.
- [ ] Email verification of user accounts.
- [ ] Password reset with code sent to email.
- [ ] Improved error handling.

## Author

👤 **AndyOooh**

- Website: <a href='https://www.andyo.xyz/'>andyo.xyz</a>
- LinkedIn: <a href='https://linkedin.com/in/andyooh/'>@andyooh</a>
- Resumé: <a href='https://www.andyo.xyz/static/media/Andreas%20Oee%20-%20Junior%20Full%20Stack%20-%20Resume.ab537effccc087b4a020.pdf'>andyo.xyz/resume</a>