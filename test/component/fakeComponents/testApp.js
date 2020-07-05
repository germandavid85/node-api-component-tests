const adapter = require('../../../src/adapter');
const domain = require('../../../src/domain');
const testWatson = require('./fakeWatson')

module.exports = {
  startApp
};

function startApp() {
  const dataAccess = adapter.db.init({ connectionString: 'component-tests-db.csv' });
  const watsonDataAccess = testWatson.init();
  const useCases = domain.useCases.handler({ dataAccess, watsonDataAccess });
  const config = {};

  return adapter.http.init({ config, useCases });
}
