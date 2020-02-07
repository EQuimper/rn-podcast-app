import { truncate } from '../text';

describe('Text helpers', () => {
  describe('truncate', () => {
    it('should truncate if text is longer then 7', () => {
      const expected = 'hello w...';

      expect(truncate('hello world', 7)).toBe(expected)
    })
  })
});
