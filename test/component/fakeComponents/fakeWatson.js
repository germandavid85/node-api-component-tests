const fs = require('fs');
const csvtojson = require('csvtojson');
const csvConverter = require('json-2-csv');

module.exports = {
  init
};

const db = [];

function init() {
  return {
    saveData
  }

  async function saveData(todoDomainObject) {
    db.push(todoDomainObject);

    return todoDomainObject;
  }
}
