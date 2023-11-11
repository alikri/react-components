import { setupServer } from 'msw/node';
import { handlers } from '../__mocks__/handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => {
  server.resetHandlers();
  server.close();
});
