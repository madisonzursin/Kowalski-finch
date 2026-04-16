// this is the most basic test case you can have, just to make sure your test environment is set up correctly.
// in the frontend folder, you should be able to run 'npm run test' to verify.

import sum from '../sum'
import { expect, test } from 'vitest'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});