define(["./collection", "handlebars", "text!templates/layer-list.html", "./layer-list-item"], function(CollectionView, Handlebars, layerListTemplate, LayerListItemView) {
	return CollectionView.extend({
		className: "layer-list",
		template: Handlebars.compile(layerListTemplate),
		events: {
			"click .add-layer": "newLayer"
		},
		initialize: function() {
			this.$el.html(this.template(this.collection.toJSON()));
			this.setup(this.$(".layer-list-items"), LayerListItemView);
		},
		newLayer: function() {
			var name = "Layer " + (this.collection.length + 1);
			name = prompt("New Layer Name:", name);

			if (name) {
				this.collection.add({
					name: name
				});
			}
		}
	});
});