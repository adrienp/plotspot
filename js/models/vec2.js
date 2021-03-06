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

	Vec2.prototype.distance = function(other) {
		return Math.sqrt((this.x - other.x) * (this.x - other.x) + (this.y - other.y) * (this.y - other.y));
	};

	return Vec2;
});