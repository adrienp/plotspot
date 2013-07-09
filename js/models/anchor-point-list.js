define(["backbone", "./anchor-point"], function(Backbone, AnchorPoint) {
	return Backbone.Collection.extend({
		model: AnchorPoint
	});
});