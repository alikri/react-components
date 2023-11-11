// testSetup.ts
import { TextEncoder, TextDecoder } from 'util';
import { handlers } from './handlers';
import { setupServer } from 'msw/node';

global.TextEncoder = TextEncoder as typeof globalThis.TextEncoder;
global.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => {
  server.resetHandlers();
  server.close();
});
