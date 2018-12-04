import { getAllByType, extractIdsToRemove } from '../utils';

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

  describe('Check `extractIdsToRemove` method', () => {
    it('should work for array of objects', () => {
      const persistedItems = [
        {
          id: 1,
          __typename: 'Card'
        },
        {
          id: 1,
          __typename: 'Desk'
        }
      ];
      const prevData = {
        items: [
          ...persistedItems,
          {
            id: 2,
            __typename: 'Card'
          },
          {
            id: 3,
            __typename: 'Desk'
          }
        ]
      };
      const nextData = {
        items: [
          {
            id: 10,
            __typename: 'Card'
          },
          ...persistedItems,
          {
            id: 20,
            __typename: 'Desk'
          }
        ]
      };
      const result = extractIdsToRemove({ prevData, nextData });

      expect(result).toEqual(['Card:2', 'Desk:3']);
    });

    it('should work for nested objects and arrays', () => {
      const prevData = {
        item: {
          id: 1,
          __typename: 'Card'
        },
        data: [
          {
            id: 2,
            __typename: 'Card'
          },
          [
            {
              id: 3,
              __typename: 'Card'
            }
          ],
          'Extra data'
        ]
      };
      const nextData = {
        item: {
          id: 1,
          __typename: 'Card'
        },
        some: {
          deep: {
            nested: {
              data: [
                {
                  id: 3,
                  __typename: 'Card',

                  children: [
                    {
                      id: 4,
                      __typename: 'Card'
                    }
                  ]
                }
              ]
            }
          }
        }
      };
      const result = extractIdsToRemove({ prevData, nextData });

      expect(result).toEqual(['Card:2']);
    });
  });
});
