import { getAllByType } from '../utils';

describe('Check utils.js', () => {
  describe('Check `getAllByType` method', () => {
    it('should return only `Card` items', () => {
      const testData = {
        Card: 'Card-wrong-value',
        'Card:1': 'Card:1-value',
        'wrongCard:1': 'wrongCard:1-value',
        'Card:2': 'Card:2-value',
        'Card:3': 'Card:3-value',
        'Desk:1': 'Desk:1-value'
      };
      const result = getAllByType({ data: testData, type: 'Card' });

      expect(result).toEqual(['Card:1-value', 'Card:2-value', 'Card:3-value']);
    });
  });
});
