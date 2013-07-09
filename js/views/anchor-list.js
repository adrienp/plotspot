define(["./collection", "handlebars", "text!templates/anchor-list.html", "./anchor-list-item", "models/vec2"], function(CollectionView, Handlebars, anchorListTemplate, AnchorListItemView, Vec2) {
	return CollectionView.extend({
		className: "anchor-list",
		template: Handlebars.compile(anchorListTemplate),
		events: {
			"click .add-anchor": "addAnchor"
		},
		initialize: function() {
			this.$el.html(this.template(this.collection.toJSON()));
			this.setup(this.$(".anchor-list-items"), AnchorListItemView);
		},
		addAnchor: function() {
			this.collection.add({
				point: new Vec2(200, 200)
			});
		}
	});
})