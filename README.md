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

- Node.js v xx.xx.
- Postgres database.
- A frontend emulator such as Postman or [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) for VSCode.

1. Clone this repo and run `npm install`
2. Rename .env.sample to .env and fill out ``DB_NAME_DEV``, ``DB_USER`` and ``DB_PASSWORD``.
3. Create the genesis company and user:
   1. `npm start` with `NODE_ENV=initial`. This creates the company Salary Hero with id: 1.
   2. Send a POST request to `api/users` with a user object in the body. For example:
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
   3. The request returns a user object. You have now created the genesis user with **shAdmin** access. You should now log in to obtain an accessToken.
4. `npm start` with `NODE_ENV=development`.
5. Send a POST request to `api/login` with a credntials in the body, for example:
   ```json
   {
     "email": "john@doe.com",
     "password": "123"
   }
   ```
6. Logging in returns a user object including an accessToken. You can use this token to send requests to `api/companies` and `api/users` by setting the request header `Authorization: Bearer <accessToken>`.
7. Create a company and a user for that company. This user will have **clientAdmin** privileges.
8. Start CRUD'ing employees for that company with the user you just created at `api/employees`. Remember to set the Authorization header in the request with the accessToken you received when creating the user.
9. Refer to routes files for additional endpoints and their usage.

NB: `NODE_ENV=production` is only relevant when/if adding a frontend.

## Routes

A user is either a Salary Hero admin (**shAdmin**) or a client admin (**clientAdmin**). Some routes are accessible by both. They are marked with access: **admin**.

- `/api/companies` - CRUD companies, access: shAdmin.
- `/api/users` - CRUD users, access: shAdmin.
- `/api/employees` - CRUD employees, access: admin. clientAdmins can only CRUD employees for their own company.
- `/api/advance_requests` - CRUD companies, access: admin. clientAdmins can only CRUD advance_requests for empoyees of their company.
- `/api/login` - login, no access needed.
- `/api/logout` - logout, no access needed.


## Features

- [x] Account creation.
- [x] Authentication & Authorization with Refresh/Access tokens.
- [x] Protected routes with user roles: clientAdmin and shAdmin.
- [x] CRUD operations for companies, users, employees.
- [x] Create advance_request.
- [x] Filter/query employees by any SQL/sequelize filters.
- [ ] Password reset.
- [ ] Email verification of user accounts.
- [ ] Develop read, update, delete route and controller for advance_request.
- [ ] Error handling.
- [ ] Add a frontend.

## Technologies

- Node.js/Express.
- PostgreSQL/Sequelize.
- (httpOnly) Cookies.
- jsonwebtoken.

## Challenges

- Implementing a role system.
- Implementing a system for creating the genesis company and user.
- What to do on startup. Should pobably migrate instead of sync.
- Postgres has been challenging as most of my database experience is on No-SQL.
  - Setting up the database.
  - Setting up the relations.
  - Joining data from different tables.
  - Creating new tables instead of nesting properties.

## Further development

The project is ready to be deployed. If setting up a frontend, remember to set `NODE_ENV=production` and fill out `FRONTEND_URL` in the .env file. This is to avoid CORS issues. See Features for ideas on what to implement next. Most important would be the password reset, as new users are not created by themselves, so therefore can not set a personal password initially. The database design and setup also has room for improvement. I would like to migrate instead of sync on startup, add more and better validation. I would also like to add indexing to be proactive with regards to scaling.

## Author

???? **AndyOooh**

- Website: [andyo.xyz](https://www.andyo.xyz/)
- LinkedIn: [@andreas-oee](https://www.linkedin.com/in/andreas-oee/)
- Resum??: [andyo.xyz/resume](https://www.andyo.xyz/static/media/Andreas%20Oee%20-%20Junior%20Full%20Stack%20-%20Resume.ab537effccc087b4a020.pdf)
