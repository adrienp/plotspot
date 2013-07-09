define(["backbone", "./layers", "./layer-list"], function(Backbone, LayersView, LayerListView) {
	return Backbone.View.extend({
		initialize: function() {
			this.layers = new LayersView({
				collection: this.model.get("layers"),
				el: this.$(".layers").get(0)
			});
			this.layerList = new LayerListView({
				collection: this.model.get("layers"),
				el: this.$(".layer-list").get(0)
			});
		}
	});
});