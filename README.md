# node-api-component-tests

Extremely simple TODO API implemented using a pseudo Uncle Bob's clean architecture, just to exemplify the difference between an API E2E automated test vs a component test.

This simple app follows two basic principles to achieve a cleaner component testing

1. dependency inversion: to allow the core domain to define interfaces that will later be implemented to specific external services such as DB operations or external APIs
1. dependency injection: to avoid pass any implementation of the exposed interface defined in the previous point, this will simplify the creation of production and testing apps

## API details

* POST `/todos` { title: "todo title" } creates a todo
* GET `/todos` gets all the todos

## rules

* any new node will be created with a `ready: false, updatedAt and createdAt` fields
* notes starting with `w.` wil be saved into an additional external system that is used as an example of an external system that is hard to replace with something like a docker image or another test instance
