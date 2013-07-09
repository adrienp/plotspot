define(["backbone", "underscore", "handlebars", "text!templates/anchor-list.html", "./anchor-list-item", "models/vec2"], function(Backbone, _, Handlebars, anchorListTemplate, AnchorListItemView, Vec2) {
	return Backbone.View.extend({
		className: "anchor-list",
		template: Handlebars.compile(anchorListTemplate),
		events: {
			"click .add-anchor": "addAnchor"
		},
		initialize: function() {
			this.$el.html(this.template(this.collection.toJSON()))
			this.$list = this.$(".anchor-list-items");

			this.anchorListItems = [];

			this.collection.each(function(anchor) {
				this.handleAdd(anchor);
			});

			this.listenTo(this.collection, "add", this.handleAdd);
			this.listenTo(this.collection, "remove", this.handleRemove);
		},
		handleAdd: function(anchor) {
			var view = new AnchorListItemView({
				model: anchor
			});

			this.anchorListItems.push(view);

			this.$list.append(view.$el);
		},
		handleRemove: function(anchor) {
			// this.anchorListItems[anchor].remove();
			// delete this.anchorListItems[anchor];

			var view = _.findWhere(this.anchorListItems, {model: anchor});
			view.remove();
			this.anchorListItems = _.without(this.anchorListItems, view);
		},
		addAnchor: function() {
			this.collection.add({
				point: new Vec2(200, 200)
			});
		}
	});
})