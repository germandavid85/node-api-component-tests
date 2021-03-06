const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = {
  init
}

function init({ config, useCases }) {
  app.get('/todos', async (req, res) => {
    const allItems = await useCases.getAllItems();

    res.json(allItems.map(todoToHTTPObject));
  });

  app.post('/todos', async (req, res) => {
    const domainObject = todoToDomainObject(req.body);
    const newTodoDomain = await useCases.saveTodoItem(domainObject);

    res.json(todoToHTTPObject(newTodoDomain));
  });

  app.listen(config.httpPort, () => {
    console.log(`TODO app listening on port ${config.httpPort}!`);
  });

  return app;
}

function todoToDomainObject(todoHTTPObject) {
  return {
    title: todoHTTPObject.title,
    ready: todoHTTPObject.ready || false
  };
}

function todoToHTTPObject(todoDomainObject) {
  return {
    title: todoDomainObject.title,
    ready: todoDomainObject.ready,
    updatedAt: todoDomainObject.updatedAt,
    createdAt: todoDomainObject.createdAt
  };
}
