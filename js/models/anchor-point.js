define(["./model", "./vec2"], function(Model, Vec2) {
	return Model.extend({
		defaults: {
			multiplier: 1,
			point: new Vec2(0, 0),

			_selected: false,
			_dragging: false
		}
	});
});