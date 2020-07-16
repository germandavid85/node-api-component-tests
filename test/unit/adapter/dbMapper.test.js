const dbMapper = require('../../../src/adapter/dbMapper');

describe('dbMapper', () => {
  const RealDate = Date.now;

  beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2019-04-07T10:20:30Z'));
  })

  afterAll(() => {
    global.Date.now = RealDate;
  });

  describe('todoToDBObject with new todo item', () => {
    const todoDomainObject = {
      title: 'test todo item',
      ready: false
    };

    test('should map the object correctly', () => {
      expect(dbMapper.todoToDBObject(todoDomainObject)).toEqual({
        title: 'test todo item',
        ready: false,
        createdAt: new Date('2019-04-07T10:20:30.000Z'),
        updatedAt: new Date('2019-04-07T10:20:30.000Z')
      });
    });
  });

  describe('todoToDBObject with existing todo item', () => {
    const todoDomainObject = {
      title: 'test todo item',
      ready: false,
      createdAt: new Date('2018-04-07T10:20:30.000Z'),
    };

    test('should map the object correctly', () => {
      expect(dbMapper.todoToDBObject(todoDomainObject)).toEqual({
        title: 'test todo item',
        ready: false,
        createdAt: new Date('2018-04-07T10:20:30.000Z'),
        updatedAt: new Date('2019-04-07T10:20:30.000Z')
      });
    });
  });

  describe('todoToDomainObject with existing todo item', () => {
    const todoDBObject = {
      title: 'test todo item',
      ready: false,
      createdAt: new Date('2018-04-07T10:20:30.000Z'),
      updatedAt: new Date('2019-04-07T10:20:30.000Z'),
    };

    test('should map the object correctly', () => {
      expect(dbMapper.todoToDomainObject(todoDBObject)).toEqual({
        title: 'test todo item',
        ready: false,
        createdAt: new Date('2018-04-07T10:20:30.000Z'),
        updatedAt: new Date('2019-04-07T10:20:30.000Z')
      });
    });
  });
});
