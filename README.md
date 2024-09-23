# 📢 CRUD Campaigns

This campaign management system aims primarily to perform a complete maintenance review of pre-established business rules for creating campaigns across various segments.

## 🧑🏻‍💻 Project Technologies

- ### 🐱 NestJS (^10.4)
  - NestJS is a progressive Node.js framework for building efficient and scalable server-side applications. It is built with TypeScript and leverages the power of modern JavaScript, providing a modular architecture and dependency injection.
- ### 🌈⃤  Prisma (^5.19)
  - Prisma is an open-source next-generation ORM (Object-Relational Mapping) for Node.js and TypeScript. It simplifies database access and provides a type-safe API for working with databases.
- ### 🤡 Jest (^29.7)
  - Jest is a delightful JavaScript testing framework maintained by Facebook, designed to ensure correctness in any JavaScript codebase. It is particularly popular for testing React applications but is versatile enough for any JavaScript project.
- ### 🐋 Docker
  - Docker is an open-source platform that automates the deployment, scaling, and management of applications using containerization. It allows developers to package applications and their dependencies into containers, ensuring consistency across different environments.

## ⚙️ API routes created in the project

#### Route to create a campaign

```http
  POST /campaign
```

| Parameters       | Type     | Example Value                                  |
| :--------------- | :------- | :--------------------------------------------- |
| `name`           | `string` | Example Campaign                                      |
| `startDate`       | `Date` | 10/10/2024                                        |
| `endDate` | `Date` | 11/10/2024 |
| `category`   | `CategoryType` | MARKETING                 |

#### Route to get all capaign by its status

```http
  GET /campaign?status={{status}}
```

| Query Parameter | Type     | Example Value |
| :-------- | :------- | :------------ |
| `status`    | `StatusType` | ACTIVE      |

#### Route to get a campaign by id

```http
  GET /campaign/{{id}}
```

| Query Parameter | Type     | Example Value |
| :-------- | :------- | :------------ |
| `id`    | `string` | 7d512388-108f-48ff-9982-4ac774678f75      |

#### Route to update a campaign

```http
  UPDATE /campaign/{{id}}
```

| Query Parameter | Type     | Example Value |
| :-------- | :------- | :------------ |
| `id`    | `string` | 7d512388-108f-48ff-9982-4ac774678f75      |

##### body

| Parameter | Type     | Example Value |
| :-------- | :------- | :------------ |
| `campaign DTO`    | `CampaignTypeDTO` | DTO value     |

#### Route to soft delete a campaign

```http
  DELETE /campaign/{{id}}
```

| Query Parameter | Type     | Example Value |
| :-------- | :------- | :------------ |
| `id`    | `string` | 7d512388-108f-48ff-9982-4ac774678f75      |

#### Note
This route turn the status type to PAUSED, he stays in database

#### Route to get all capaign

```http
  GET /campaign
```

#### Note

- Every route and testing can be checked on [Postman Collection](https://www.postman.com/flight-engineer-94720812/workspace/crud-campaign/collection/22348918-d9f9e2cd-5cd5-495c-bc74-0815d0337cd0?action=share&creator=22348918)
- When running the project, a /docs route will be available to access the documentation. This route provides an easy way for developers and users to view the API documentation, including endpoints, request/response formats, and any other relevant information about the application's functionality.

## 🚀 Improvements

The system currently presents an MVP of a scalable project for the maintenance and management of an online and/or offline campaign platform. The MVP includes functional routes and precise error handling following the proposed business model. Suggested improvements for the next sprints include:

- A more robust business model for linking campaigns to users.
- A JWT login system with necessary information to ensure that data is stored securely in the database, with encrypted passwords.
- A user-friendly interface following good usability standards, considering Nielsen's heuristics and best UI practices.

## 🏋️ API routes used aiming for a second sprint

##### Note: Consider that /auth will function as middleware to validate user information.

#### Route used to login an user and validating his JWT token

```http
  POST /auth/login
```

| Parâmetro | Type     | Default Value |
| :-------- | :------- | :------------ |
| `email`    | `string` | example@example.com       |

#### Route to signup a new user

```http
  GET /auth/signup
```

| Parâmetro | Type     | Default Value |
| :-------- | :------- | :------------ |
| `email`    | `string` | example@example.com       |
| `username`    | `string` | Example Test       |
| `password`    | `string` | Ex@m!ple3      |

## ⚙️ Infrastructure

A folder structure following Clean Architecture was used, which can be better understood below:
  
                         -----------------------------           ----------------------------
                        |        Presentation        |          |        Application         |
                        |----------------------------|          |----------------------------|
                        |                            |          |                            |
                        | Controllers, Decorators    |          | DTOs, Services             |
                        | responses                  |          | Regras de negócio          |
                         ----------------------------            ----------------------------
                         
                         ----------------------------           ----------------------------
                        |           Domain           |         |        Infrastructure      |
                        |----------------------------|         |----------------------------|
                        |                            |         |                            |
                        | Entities, Modules          |         | Database config, Models    |
                        | Providers                  |         | Repositories,              |
                         ----------------------------           ----------------------------

## ✏️ Project Initialization

To initiate the project, open your bash within the project folder and start with:

```bash
  npm install
  or
  yarn
```

Start Prisma

```bash
  npx prisma generate
```

To run the tests:

```bash
  npm run test
  or
  yarn run test
```

To start the project:

```bash
  npm run start:dev
  or
  yarn run start:dev
```

## 🧑🏻‍🎨 Author

- [Pedro Lucas Lopes Paraguai](https://www.github.com/PedroLucasLopes)
  I have always been determined about what I want as a developer, curious to learn new technologies, and deepen my knowledge in those I work with. Five years ago, I entered the market aiming to showcase my potential by bringing innovations to both Front-end and Back-end realms within the web.

## 🏷️ Tags

![Typescript](https://img.shields.io/badge/-Typescript-blue?logo=typescript)
![NestJS](https://img.shields.io/badge/-NestJS-red?logo=nestjs)
![Jest](https://img.shields.io/badge/-Jest-orange?logo=jest)
![Docker](https://img.shields.io/badge/-Docker-blue?logo=docker)
![NodeJS](https://img.shields.io/badge/-NodeJS-green?logo=nodeJS)
