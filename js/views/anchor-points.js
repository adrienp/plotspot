define(["./collection", "underscore", "./anchor-point", "models/vec2"], function(CollectionView, _, AnchorPointView, Vec2) {
	return CollectionView.extend({
		className: "anchor-points",
		events: {
			"mousemove": "drag",
			"mouseup": "dragEnd"
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
			console.log(arguments);
			this.dragging = view;
		},
		drag: function(e) {
			if (this.dragging) {
				var offset = this.$el.offset();
				var height = this.$el.height();
				var point = new Vec2((e.pageX - offset.left) / height, (height - (e.pageY - offset.top)) / height);
				this.dragging.moveTo(point);
			}
		},
		dragEnd: function(e) {
			if (this.dragging) {
				this.dragging.drop();
				delete this.dragging;
			}
		},
		resize: function() {
			var size = this.$el.width();
			_.each(this.items, function(anchor) {
				anchor.setScale(size);
			});
		}
	});
});