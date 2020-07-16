const adapter = require('../../../src/adapter');

describe('db', () => {
  const connectionString = 'integration-tests-db.csv';
  const dbInstance = adapter.db.init({ connectionString });
  const RealDate = Date.now;

  beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2019-04-07T10:20:30Z'));
  })

  afterAll(() => {
    global.Date.now = RealDate;
  });

  describe('saveTodoItem', () => {
    const domainTodoObject = {
      title: 'integration test item',
      ready: false
    };

    test('should save the item', async () => {
      const savedItem = await dbInstance.saveTodoItem(domainTodoObject);

      expect(savedItem).toEqual({
        title: 'integration test item',
        ready: false,
        createdAt: new Date('2019-04-07T10:20:30.000Z'),
        updatedAt: new Date('2019-04-07T10:20:30.000Z')
      });
    })
  });

  describe('getAllItems', () => {
    const domainTodoObject = {
      title: 'integration test item',
      ready: false
    };

    test('should save the item', async () => {
      const savedItem = await dbInstance.getAllItems();

      expect(savedItem).toEqual([{
        title: 'integration test item',
        ready: 'false',
        createdAt: 'Sun Apr 07 2019 05:20:30 GMT-0500 (Colombia Standard Time)',
        updatedAt: 'Sun Apr 07 2019 05:20:30 GMT-0500 (Colombia Standard Time)'
      }]);
    })
  });
});
