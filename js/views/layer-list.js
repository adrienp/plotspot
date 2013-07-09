define(["backbone", "underscore", "handlebars", "text!templates/layer-list.html", "./layer-list-item"], function(Backbone, _, Handlebars, layerListTemplate, LayerListItemView) {
	return Backbone.View.extend({
		className: "layer-list",
		template: Handlebars.compile(layerListTemplate),
		initialize: function() {
			this.$el.html(this.template(this.collection.toJSON()))
			this.$list = this.$(".layer-list-items");

			this.layerListItems = [];

			this.collection.each(function(layer) {
				this.handleAdd(layer);
			});

			this.listenTo(this.collection, "add", this.handleAdd);
			this.listenTo(this.collection, "remove", this.handleRemove);
		},
		handleAdd: function(layer) {
			var view = new LayerListItemView({
				model: layer
			});

			this.layerListItems.push(view);

			this.$list.append(view.$el);
		},
		handleRemove: function(layer) {
			// this.layerListItems[layer].remove();
			// delete this.layerListItems[layer];

			var view = _.findWhere(this.layerListItems, {model: layer});
			view.remove();
			this.layerListItems = _.without(this.layerListItems, view);
		}
	});
});