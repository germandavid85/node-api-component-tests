const fs = require('fs');
const csvtojson = require('csvtojson');
const csvConverter = require('json-2-csv');
const dbMapper = require('./dbMapper');

module.exports = {
  init
};

function init({ connectionString }) {
  return {
    getAllItems,
    saveTodoItem
  }

  async function saveTodoItem(todoDomainObject) {
    const dbObject = dbMapper.todoToDBObject(todoDomainObject);
    const currentDB = fs.readFileSync(connectionString, 'utf-8');
    const parsedDBObject = await csvtojson().fromString(currentDB);

    parsedDBObject.push(dbObject);

    await writeFile(parsedDBObject, connectionString);

    return dbMapper.todoToDomainObject(dbObject);
  }

  async function getAllItems() {
    const currentDB = fs.readFileSync(connectionString, 'utf-8');
    const parsedDBObject = await csvtojson().fromString(currentDB)

    return parsedDBObject
      .map(dbMapper.todoToDomainObject)
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
