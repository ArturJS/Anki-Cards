import { getChildren } from '../utils';

describe('Check utils.js', () => {
  describe('"getChildren" method', () => {
    it("should return children if it's Array", () => {
      const children = [1, 2, 3];
      const result = getChildren(children);

      expect(result).toEqual(children);
    });

    it("should wrap children in Array if it's NOT Array", () => {
      const children = 'Single children';
      const result = getChildren(children);

      expect(result).toEqual([children]);
    });
  });
});
