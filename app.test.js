const request = require('supertest');
const app = require('./app');
let items = require('./fakeDb');

beforeEach(() => {
  items.length = 0; // Clear items before each test
  items.push({ name: 'popsicle', price: 1.45 });
  items.push({ name: 'cheerios', price: 3.40 });
});

describe('GET /items', () => {
  test('should return a list of items', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toEqual({ name: 'popsicle', price: 1.45 });
    expect(res.body[1]).toEqual({ name: 'cheerios', price: 3.40 });
  });
});

describe('POST /items', () => {
  test('should add a new item', async () => {
    const res = await request(app).post('/items').send({ name: 'banana', price: 0.75 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ added: { name: 'banana', price: 0.75 } });
    expect(items).toHaveLength(3);
  });
});

describe('GET /items/:name', () => {
  test('should return a single item by name', async () => {
    const res = await request(app).get('/items/popsicle');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ name: 'popsicle', price: 1.45 });
  });

  test('should return 404 for non-existing item', async () => {
    const res = await request(app).get('/items/nonexistent');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'Item not found' });
  });
});

describe('PATCH /items/:name', () => {
  test('should update an item', async () => {
    const res = await request(app).patch('/items/popsicle').send({ price: 2.00 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ updated: { name: 'popsicle', price: 2.00 } });
    expect(items[0]).toEqual({ name: 'popsicle', price: 2.00 });
  });

  test('should return 404 for non-existing item', async () => {
    const res = await request(app).patch('/items/nonexistent').send({ price: 2.00 });
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'Item not found' });
  });
});

describe('DELETE /items/:name', () => {
  test('should delete an item', async () => {
    const res = await request(app).delete('/items/popsicle');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Deleted' });
    expect(items).toHaveLength(1);
  });

  test('should return 404 for non-existing item', async () => {
    const res = await request(app).delete('/items/nonexistent');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'Item not found' });
  });
});
