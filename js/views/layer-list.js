define(["./collection", "handlebars", "text!templates/layer-list.html", "./layer-list-item"], function(CollectionView, Handlebars, layerListTemplate, LayerListItemView) {
	return CollectionView.extend({
		className: "layer-list",
		template: Handlebars.compile(layerListTemplate),
		initialize: function() {
			this.$el.html(this.template(this.collection.toJSON()));
			this.setup(this.$(".layer-list-items"), LayerListItemView);
		}
	});
});