define(["./collection", "underscore", "./anchor-point", "models/vec2"], function(CollectionView, _, AnchorPointView, Vec2) {
	return CollectionView.extend({
		className: "anchor-points",
		events: {
			"mousemove": "drag",
			"mouseup": "dragEnd",
			"dblclick": "newAnchor"
		},
		initialize: function() {
			this.setup(this.$el, AnchorPointView);

			this.listenTo(this, "addView", this.handleNewView);
		},
		handleNewView: function(view) {
			this.listenTo(view, "grab", this.dragStart);

			this.resize();
		},
		dragStart: function(view) {
			this.dragging = view;
			this.$el.toggleClass("dragging", true);
		},
		drag: function(e) {
			if (this.dragging) {
				this.dragging.moveTo(this.mousePoint(e));
				e.stopPropagation();
			}
		},
		dragEnd: function(e) {
			if (this.dragging) {
				this.dragging.drop();
				delete this.dragging;
				this.$el.toggleClass("dragging", false);
				e.stopPropagation();
			}
		},
		resize: function() {
			var size = this.$el.width();
			_.each(this.items, function(anchor) {
				anchor.setScale(size);
			});
		},
		mousePoint: function(e) {
			var offset = this.$el.offset();
			var height = this.$el.height();
			return new Vec2((e.pageX - offset.left) / height, (height - (e.pageY - offset.top)) / height);
		},
		newAnchor: function(e) {
			this.collection.add({
				point: this.mousePoint(e)
			});
		}
	});
});