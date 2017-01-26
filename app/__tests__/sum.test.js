'use strict';

test('should do the addy add', () => {
  const sum = require('../sum');
  expect(sum(1,2)).toBe(3);
});
