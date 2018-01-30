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

List.prototype.reduce = function (f, seed) {
  return this.cata({
    Cons: (head, tail) => tail.reduce(f, (f(seed, head))),
    Nil: () => seed
  });
};

List.prototype.filter = function (p) {
  return this.cata({
    Cons: (head, tail) => p(head)
      ? List.Cons(head, tail.filter(p))
      : tail.filter(p),
    Nil: () => List.Nil
  });
};

module.exports = List;