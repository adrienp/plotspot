define(["./model", "./vec4"], function(Model, Vec4) {
	return Model.extend({
		defaults: {
			distance: 0,
			color: new Vec4(0, 0, 0, 0)
		}
	});
});