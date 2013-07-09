define(["backbone", "./vec2"], function(Backbone, Vec2) {
	return Backbone.Model.extend({
		defaults: {
			multiplier: 1,
			point: new Vec2(0, 0),

			_selected: false,
			_dragging: false
		}
	});
});