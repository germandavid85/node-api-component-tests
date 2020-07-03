const fetch = require('node-fetch');

describe('simple todo', () => {
  let allTheNotes;

  beforeAll(async () => {
    const response = await fetch('http://localhost:3000/todos');

    allTheNotes = await response.json();
  });

  test('should return all the todos', () => expect(allTheNotes).toMatchSnapshot());
});
