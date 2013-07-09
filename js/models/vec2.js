define([], function() {
	var Vec2 = function(x, y) {
		this.x = x;
		this.y = y;
	};

	Vec2.prototype.add = function(other) {
		return new Vec2(this.x + other.x, this.y + other.y);
	};

	Vec2.prototype.mult = function(scalar) {
		return new Vec2(this.x * scalar, this.y * scalar);
	};

	return Vec2;
});