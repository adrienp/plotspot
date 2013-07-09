define(["backbone", "./vec4"], function(Backbone, Vec4) {
	return Backbone.Model.extend({
		defaults: {
			distance: 0,
			color: new Vec4(0, 0, 0, 0)
		}
	});
});