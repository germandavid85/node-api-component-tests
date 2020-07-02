const fs = require('fs');
const csvtojson = require('csvtojson');
const csvConverter = require('json-2-csv');

module.exports = {
  init
};

function init({ connectionString }) {
  return {
    saveData
  }

  async function saveData(todoDomainObject) {
    const dbObject = todoToWatsonObject(todoDomainObject);
    const currentDB = fs.readFileSync(connectionString, 'utf-8');
    const parsedDBObject = await csvtojson().fromString(currentDB);

    parsedDBObject.push(dbObject);

    await writeFile(parsedDBObject, connectionString);

    return todoToDomainObject(dbObject);
  }

  function todoToWatsonObject(todoDomainObject) {
    const createdAt = todoDomainObject.createdAt || new Date();
    const updatedAt = new Date();

    return {
      title: todoDomainObject.title,
      ready: todoDomainObject.ready,
      createdAt,
      updatedAt
    };
  }

  function todoToDomainObject(todoWatsonObject) {
    return {
      title: todoWatsonObject.title,
      ready: todoWatsonObject.ready,
      createdAt: todoWatsonObject.createdAt,
      updatedAt: todoWatsonObject.updatedAt
    };
  }

  function writeFile(object, filePath) {
    return new Promise((resolve) => {
      csvConverter.json2csv(object, (csvError, csv) => {
        if (csvError) {
          logger.warn(`error while converting to csv: ${csvError.message}`);

          return resolve();
        }

        return fs.writeFile(filePath, csv, (fileError) => {
          if (fileError) {
            logger.warn(`error while writing file: ${fileError.message}`);

            return resolve();
          }

          return resolve(`The file was saved to ${filePath}`);
        });
      });
    });
  }
}
