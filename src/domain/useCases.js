module.exports = {
  handler
};


function handler({ dataAccess, watsonDataAccess }) {
  return {
    getAllItems,
    saveTodoItem
  };

  function getAllItems() {
    return dataAccess.getAllItems();
  }

  async function saveTodoItem(todoDomainObject) {
    const savedObject = await dataAccess.saveTodoItem(todoDomainObject);

    if (todoDomainObject.title.startsWith('w.')) {
      watsonDataAccess.saveData(todoDomainObject);
    }

    return savedObject;
  }
}

