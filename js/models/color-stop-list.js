define(["backbone", "./color-stop"], function(Backbone, ColorStop) {
	return Backbone.Collection.extend({
		model: ColorStop
	});
});