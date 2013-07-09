define(["backbone", "./layer-list"], function(Backbone, LayerList) {
	return Backbone.Model.extend({
		initialize: function() {
			if (!this.has("layers")) {
				this.set("layers", new LayerList());
			}
		}
	});
});