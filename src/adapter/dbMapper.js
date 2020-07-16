module.exports = {
  todoToDBObject,
  todoToDomainObject
};

function todoToDBObject(todoDomainObject) {
  const createdAt = todoDomainObject.createdAt || new Date(Date.now());
  const updatedAt = new Date(Date.now());

  return {
    title: todoDomainObject.title,
    ready: todoDomainObject.ready,
    createdAt,
    updatedAt
  };
}

function todoToDomainObject(todoDBObject) {
  return {
    title: todoDBObject.title,
    ready: todoDBObject.ready,
    createdAt: todoDBObject.createdAt,
    updatedAt: todoDBObject.updatedAt
  };
}
