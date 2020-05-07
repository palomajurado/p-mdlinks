import axios from 'axios';
import { linkValidate } from '../lib/index';
jest.mock('axios');

// we want a fresh start after each test
afterEach(() => {
  jest.clearAllMocks();
});

it('Validates a valid link', (done) => {
  axios.mockImplementation(() =>
    Promise.resolve({ data: {}, status: 200, statusText: 'OK' })
  );
  linkValidate('123', 'https://google.com').then((result) => {
    expect(result).toEqual({ id: '123', status: 200, statusText: 'OK' });
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith('https://google.com');
    done();
  });
});

it('validates an invalid link', (done) => {
  axios.mockImplementation(() =>
    Promise.resolve({ data: {}, status: 404, statusText: 'FAIL' })
  );
  linkValidate('123', 'http://localhost:3000').then((result) => {
    expect(result).toEqual({ id: '123', status: 404, statusText: 'FAIL' });
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith('http://localhost:3000');
    done();
  });
});
