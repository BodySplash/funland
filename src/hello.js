const daggy = require('daggy');

const Coord = daggy.tagged('Coord', ['x', 'y', 'z']);

Coord.prototype.translate = function (x, y, z) {
  return Coord(this.x + x, this.y + y, this.z + z);
};

const Line = daggy.tagged('Line', ['from', 'to']);

const Bool = daggy.taggedSum('Bool', {
  True: [],
  False: []
});

const {True, False} = Bool;

Bool.prototype.invert = function () {
  return this.cata({
    False: () => True,
    True: () => False
  })
};

Bool.prototype.thenElse = function (then, or) {
  return this.cata({
    True: () => then,
    False: () => or
  })
};

const Shape = daggy.taggedSum('Shape', {
  Square: ['topleft', 'bottomright'],

  Circle: ['centre', 'radius']
});

Shape.prototype.translate =
  function (x, y, z) {
    return this.cata({
      Square: (topleft, bottomright) =>
        Shape.Square(
          topleft.translate(x, y, z),
          bottomright.translate(x, y, z)
        ),

      Circle: (centre, radius) =>
        Shape.Circle(
          centre.translate(x, y, z),
          radius
        )
    })
  };

module.exports = {Coord, Line, Bool, Shape};

