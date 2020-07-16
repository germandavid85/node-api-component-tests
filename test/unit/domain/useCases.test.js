const domain = require('../../../src/domain');

describe('useCases', () => {
  let useCases;
  let fakeDataAccess;
  let fakeWatsonDataAccess;

  beforeEach(() => {
    fakeDataAccess = {
      getAllItems: jest.fn(),
      saveTodoItem: jest.fn()
    };
    fakeWatsonDataAccess = {
      saveData: jest.fn()
    };
    useCases = domain.useCases.handler({ dataAccess: fakeDataAccess, watsonDataAccess: fakeWatsonDataAccess });
  });

  describe('getAllItems function', () => {
    test('should get all the data  from the data access', () => {
      useCases.getAllItems();

      expect(fakeDataAccess.getAllItems.mock.calls.length).toBe(1);
    });
  });

  describe('saveTodoItem function', () => {
    describe('simple todo', () => {
      const todoItem = {
        title: 'test todo'
      };

      test('should get all the data  from the data access', async () => {
        await useCases.saveTodoItem(todoItem);

        expect(fakeWatsonDataAccess.saveData.mock.calls.length).toBe(0);
        expect(fakeDataAccess.saveTodoItem.mock.calls.length).toBe(1);
        expect(fakeDataAccess.saveTodoItem.mock.calls[0][0]).toBe(todoItem);
      });
    });

    describe('watson todo', () => {
      const todoItem = {
        title: 'w. watson todo'
      };

      test('should get all the data  from the data access', async () => {
        await useCases.saveTodoItem(todoItem);

        expect(fakeWatsonDataAccess.saveData.mock.calls.length).toBe(1);
        expect(fakeWatsonDataAccess.saveData.mock.calls[0][0]).toBe(todoItem);

        expect(fakeDataAccess.saveTodoItem.mock.calls.length).toBe(1);
        expect(fakeDataAccess.saveTodoItem.mock.calls[0][0]).toBe(todoItem);
      });
    });
  });
});
