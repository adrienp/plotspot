define(["backbone", "./color-stop", "models/vec4"], function(Backbone, ColorStop, Vec4) {
	return Backbone.Collection.extend({
		model: ColorStop,
		initialize: function() {
			this.radius = 0;
			this.thickness = 0;
			this.color = new Vec4(0, 0, 0, 1);
		},
		setRadius: function(radius, thickness, color) {
			this.radius = radius;

			if (thickness) {
				this.thickness = thickness;
			}

			if (color) {
				this.color = color;
			}

			var edgeColor = this.color.copy();
			edgeColor.w = 0;

			this.reset();

			this.add([{
				distance: this.radius - this.thickness/2,
				color: edgeColor
			}, {
				distance: this.radius,
				color: this.color
			}, {
				distance: this.radius + this.thickness/2,
				color: edgeColor
			}]);

			this.trigger("change");
		}
	});
});