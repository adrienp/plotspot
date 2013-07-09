define(["backbone", "./layer"], function(Backbone, Layer) {
	return Backbone.Collection.extend({
		model: Layer
	});
});