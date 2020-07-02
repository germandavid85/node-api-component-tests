const adapter = require('./adapter');
const domain = require('./domain');

const dataAccess = adapter.db.init({ connectionString: 'db.csv' });
const watsonDataAccess = adapter.watson.init({ connectionString: 'watson.csv' });
const useCases = domain.useCases.handler({ dataAccess, watsonDataAccess })

adapter.http.init({ useCases });