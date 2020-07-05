const adapter = require('./adapter');
const domain = require('./domain');

module.exports = {
  startApp
}

function startApp() {
  const dataAccess = adapter.db.init({ connectionString: 'db.csv' });
  const watsonDataAccess = adapter.watson.init({ connectionString: 'watson.csv' });
  const useCases = domain.useCases.handler({ dataAccess, watsonDataAccess })
  const config = {
    httpPort: 3001
  };

  return adapter.http.init({ config, useCases });
}