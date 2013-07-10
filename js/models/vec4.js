define([], function() {
	function toHex(val) {
		var ret = Math.floor(val * 255).toString(16);
		if (ret.length == 1) {
			ret = "0" + ret;
		}
		return ret;
	}

	var Vec4 = function(x, y, z, w) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	};

	Vec4.prototype.copy = function() {
		return new Vec4(this.x, this.y, this.z, this.w);
	};

	Vec4.prototype.toHex = function() {
		var x = toHex(this.x);
		var y = toHex(this.y);
		var z = toHex(this.z);

		return "#" + x + y + z;
	};

	Vec4.fromHex = function(hex) {
		var x = parseInt(hex.substr(1, 2), 16) / 255;
		var y = parseInt(hex.substr(3, 2), 16) / 255;
		var z = parseInt(hex.substr(5, 2), 16) / 255;

		return new Vec4(x, y, z, 1);
	}

	return Vec4;
});