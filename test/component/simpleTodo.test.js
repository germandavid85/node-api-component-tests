const request = require('supertest');
const testApp = require('./fakeComponents/testApp').startApp();

describe('simple todo', () => {
  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 100)); // avoid jest open handle error
  });

  test('should save new todos', async () => {
    const response = await request(testApp)
      .post('/todos')
      .send({ title: 'a new component test todo'})
      .expect(200);

    expect(response.body.title).toBe('a new component test todo');
    expect(response.body.ready).toBe(false);
  });

  test('should return all the todos', async () => {
    const response = await request(testApp)
      .get('/todos')
      .expect(200);

    expect(response.body[0].title).toBe('a new component test todo');
    expect(response.body[0].ready).toBe('false');
  });

  test('should save new watson todos', async () => {
    const response = await request(testApp)
      .post('/todos')
      .send({ title: 'w. a new component test watson todo'})
      .expect(200);

    expect(response.body.title).toBe('w. a new component test watson todo');
    expect(response.body.ready).toBe(false);
  });

  test('should return all the todos', async () => {
    const response = await request(testApp)
      .get('/todos')
      .expect(200);

    expect(response.body[0].title).toBe('a new component test todo');
    expect(response.body[0].ready).toBe('false');

    expect(response.body[1].title).toBe('w. a new component test watson todo');
    expect(response.body[1].ready).toBe('false');
  });
});
