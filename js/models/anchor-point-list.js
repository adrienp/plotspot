define(["backbone", "./anchor-point"], function(Backbone, AnchorPoint) {
	return Backbone.Collection.extend({
		model: AnchorPoint,
		distance: function(point) {
			var dist = 0;

			this.forEach(function(anchor) {
				dist += anchor.get("point").distance(point) * anchor.get("multiplier");
			});

			return dist;
		}
	});
});