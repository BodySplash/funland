const expect = require('chai').expect;

const {Coord, Line, Shape, Bool} = require('./hello');

describe('hello', () => {

  it('should have a coord', function () {
    const coord = Coord(0, 0, 0);

    expect(coord).to.include({x: 0, y: 0, z: 0});
  });

  it('should create a line', function () {
    const start = Coord(0, 0, 0);

    const line = Line(start, start.translate(1, 2, 3));

    expect(line.from).to.include({x: 0, y: 0, z: 0});
    expect(line.to).to.include({x: 1, y: 2, z: 3});
  });

  it('should deal with shapes', function () {
    const square = Shape.Square(Coord(2, 2, 0), Coord(3, 3, 0));

    const translated = square.translate(3, 3, 3);

    expect(translated).to.deep.equal(Shape.Square(Coord(5, 5, 3), Coord(6, 6, 3)));
  });

  it('should have fun with bool', function () {
    expect(Bool.True.invert()).to.be.equal(Bool.False);

    expect(Bool.True.thenElse(1, 2)).to.equal(1);
    expect(Bool.False.thenElse(1, 2)).to.equal(2);
  });
});