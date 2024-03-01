# GERY RUSLANDI - Boo Backend Assignment

This projects purpose is for my recruitment process on Boo App for backend engineer assignment. Below is a documentation for starting up this project.

## Getting started

I made this project to be able to run as simple as possible. There are two scrips that i made for botting up the project. But before running this script, there are some minimal requirement that you need to satisfy before running those two scripts.

Minified  requirements:

- Docker

But if you dont have docker, and wanted to run the project directly throught your local machine, here is the requirements

- node (tested with version 18.19.0)
  - if you have nvm, you can run nvm use on project root to install my prefered node version
- mongodb server (tested with version 7.0.5)

## Features

Below is the list of features that i made based on emails instruction:

- endpoint for create profile
- endpoint for show profile
- endpoint for register user
- endpoint for post comment on specific profile
- endpoint for fetch comments on specific profile
  - able to sort
  - able to filter by field
- endpoint for like and unlike comment

## Notes

For authentication, as per email instruction, i make the authentication as simple as possible. You only need to pas your user name on `Authorization` header.
For example:

```http

POST /:profileId/comments/:commentId/toggle-like
Authorization: Gery

```

with that, you are able to access endpoint that required to be authenticated. below is the list for endpoint that need to pass the Authorization:

- endpoint for post comment on specific profile
- endpoint for like and unlike comment

For endpoints detailed information, you can refer on my http files that i has used for testing. you can open the file with name `request.http`. If you are using vscode, you can install `REST Client` extension to run this file.

---

## Running the project

After above requirements is satisfied, you need to follow below steps to run the project.

- copy `.env.example` and paste it as `.env`
  - modify the content of .env as per your local device's setting
- For Docker user
  - run `./startDev.sh` to start the project
    - if you need to rebuild the container, you can execute `./startDev.sh --build`
  - App booted, happy testing :D
- For non Docker user
  - run your mongodb server
  - run `npm install`
  - execute `npm run dev` for hot reload mode, or `npm run start` for non hot reload mode.
  - happy testing :D

---

## Running unit testing

For unit test, i made feature(integration) test and unit test. For feature test, i am using supertest as its http agent. and for unit test, i test the service directly into this test files.

I alway make sure the code that i made to be test able, because of that, i separate the business logic and integration logic. For business logic, i put it into service. For integration logic i put it into controller.

With this pattern, my code become test able and i can test my business logic by directly use it on my unit test file. and for integration testing. i can use my choosed http test agent (supertest) to test the integration logic.


Below is the instruction to run the unit test:

For Docker:

- execute `./startTest.sh`
- done :D

For non Docker:

- run `npm install` if you havent
- execute `npm run test`
- done :D
