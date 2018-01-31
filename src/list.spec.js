const List = require('./list');
const expect = require('chai').expect;

describe('List', () => {
  it('should give an array', function () {
    const array = List.Cons(1, List.Cons(2, List.Nil)).toArray();

    expect(array).to.deep.equal([1, 2]);
  });

  it('should be created from array', function () {
    const createdList = List.from([1, 2]);

    expect(createdList.head).to.equal(1);
  });

  it('should map', function () {
    const result = List.from([1, 2, 3])
      .map(x => x + 2)
      .toArray();

    expect(result).to.deep.equal([3, 4, 5]);
  });

  it('should fold', function () {
    const folded = List.from([1, 2, 3])
      .fold((acc, e) => acc + e, 5);

    expect(folded).to.equal(11);
  });

  it('should map with a fold to', function () {
    const result = List.from([1, 2, 3])
      .fold((acc, e) => List.Cons(e + 2, acc), List.Nil)
      .fold((acc, e) => List.Cons(e, acc), List.Nil)
      .toArray();

    expect(result).to.deep.equal([3, 4, 5]);
  });

  it('should filter', function () {
    const filtered = List.from([1, 2, 3])
      .filter(x => x % 2 === 0)
      .toArray();

    expect(filtered).to.deep.equal([2]);
  });

  it('should reduce', function () {
    let reduced = List.from([1, 2, 3])
      .reduce((acc, e) => acc + e);

    expect(reduced).to.equal(6);
  });

});