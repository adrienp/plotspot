define(["./model", "./anchor-point-list", "./color-stop-list"], function(Model, AnchorPointList, ColorStopList) {
	return Model.extend({
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