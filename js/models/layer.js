define(["backbone", "./anchor-point-list", "./color-stop-list"], function(Backbone, AnchorPointList, ColorStopList) {
	return Backbone.Model.extend({
		initialize: function() {
			if (!this.has("anchors")) {
				this.set("anchors", new AnchorPointList());
			}
			if (!this.has("colorStops")) {
				this.set("colorStops", new ColorStopList());
			}
		}
	});
});