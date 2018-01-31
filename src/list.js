const daggy = require('daggy');

const List = daggy.taggedSum('List', {
  Cons: ['head', 'tail'], Nil: []
});

List.from = function (array) {
  return array.reduceRight((acc, e) => List.Cons(e, acc), List.Nil)
};

List.prototype.toArray = function () {
  return this.cata({
    Cons: (head, tail) => [head, ...tail.toArray()],
    Nil: () => []
  });
};

List.prototype.map = function (f) {
  return this.cata({
    Cons: (head, tail) => List.Cons(f(head), tail.map(f)),
    Nil: () => List.Nil
  });
};

List.prototype.fold = function (f, seed) {
  return this.cata({
    Cons: (head, tail) => tail.fold(f, (f(seed, head))),
    Nil: () => seed
  });
};

List.prototype.filter = function (p) {
  const filterRecurse = (i, that) => that.cata({
    Cons: (head, tail) => p(head, i)
      ? List.Cons(head, filterRecurse(i + 1, tail))
      : filterRecurse(i + 1, tail),
    Nil: () => List.Nil
  });
  return filterRecurse(0, this);
};

List.prototype.reduce = function (f) {
  return this.cata({
    Cons: (head, tail) => tail.fold(f, head),
    Nil: () => undefined
  });
};

List.prototype.indexOf = function (e) {

  const indexOfRecurse = (i, that) => that.cata({
    Cons: (head, tail) => head === e ? i : indexOfRecurse(i + 1, tail),
    Nil: () => -1
  });

  return indexOfRecurse(0, this);
};

List.prototype.nub = function () {
  const that = this;
  return this.filter((e, index) => that.indexOf(e) === index);
};

module.exports = List;