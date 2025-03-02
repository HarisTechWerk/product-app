import { TextEncoder, TextDecoder } from "text-encoding-polyfill";
import { server } from "./mocks/server";

// Polyfill TextEncoder and TextDecoder for Jest
Object.assign(global, { TextEncoder, TextDecoder });


// Establish API mocking before all tests
beforeAll(() => server.listen({
  onUnhandledRequest: 'bypass',
}));

// Reset any request handlers that we may add during the tests
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished
afterAll(() => server.close());