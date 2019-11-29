[![Build Status](https://travis-ci.org/manzi-guev/Broadcaster.svg?branch=develop)](https://travis-ci.org/manzi-guev/Broadcaster)
[![Coverage Status](https://coveralls.io/repos/github/manzi-guev/Broadcaster/badge.svg?branch=develop)](https://coveralls.io/github/manzi-guev/Broadcaster?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/81daf282d170ea653954/maintainability)](https://codeclimate.com/github/manzi-guev/Broadcaster/maintainability)

# Broadcaster

> What are we building?

We are building a website that will help users all over Africa to be able to raise any form of corruption to the notice of appropriate authorities and the general public

> Who are we building it for?

Everyone in the world. Especially in Africa.

# Homepage

[Visit the Homepage](https://manzi-guev.github.io/Broadcaster/UI/index.html)

> What are the required features?

- Sign Up
- Login
- Create a red-flag/intervention
- View individuals red-flags/interventions
- Delete a red-flag/intervention
- Admin changing red-flag/intervention status
- View all red-flags/interventions

# API Endpoints

| Request Routes                 | Methods |                              Description |
| :----------------------------- | :-----: | ---------------------------------------: |
| /api/v1/auth/signup            |  Post   |                        users can sign up |
| /api/v1/auth/sigin             |  Post   |                        users can sign in |
| /api/v1/red-flags              |  Post   |            users can create new redflags |
| /api/v1/red-flags              |   Get   |              users can view all redflags |
| /api/v1/red-flags/:id          |   Get   |        users can view a specific redflag |
| /api/v1/red-flags/:id          | Delete  |                users can delete redflags |
| /api/v1/red-flags/:id/comment  |  Patch  |  users can edit the comment of a redflag |
| /api/v1/red-flags/:id/location |  Patch  | users can edit the location of a redflag |

# API Documentation
[https://documenter.getpostman.com/view/8149811/SW7f16Rr?version=latest](Documentation link)

# User Interface

- HTML
- CSS
- JAVASCRIPT

# Backend, Frameworks and other tools used

- Node js
- Express
- Mocha and Chai(for testing)
- babel

### Pivotal Tracker Stories

[Pivotal Tracker Stories](https://www.pivotaltracker.com/n/projects/2409304)

# Installation Guide

To use this project locally you must install node js, then clone the project using

```
git clone https://github.com/manzi-guev/Broadcaster.git
```

after cloning the project, you must install all the project dependencies using

```
npm i
```

after that you are good to go, now you can run the project using

```
npm start
```

to test endpoints you will use a tool called postman.
and finally to run tests you can use

```
npm test
```

### Contributor

Manzi Guevara [manziguevara@gmail.com](manziguevara@gmail.com)

### Copyright

Copyright (c) Manzi Guevara
