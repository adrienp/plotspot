define(["backbone", "underscore", "./anchor-point", "models/vec2"], function(Backbone, _, AnchorPointView, Vec2) {
	return Backbone.View.extend({
		className: "anchor-points",
		events: {
			"mousemove": "drag",
			"mouseup": "dragEnd"
		},
		initialize: function() {
			this.anchorPoints = [];

			this.collection.each(function(anchor) {
				this.handleAdd(anchor);
			});

			this.listenTo(this.collection, "add", this.handleAdd);
			this.listenTo(this.collection, "remove", this.handleRemove);
		},
		handleAdd: function(anchor) {
			var view = new AnchorPointView({
				model: anchor
			});

			this.anchorPoints.push(view);

			this.$el.append(view.$el);

			this.listenTo(view, "grab", this.dragStart);

			this.resize();
		},
		handleRemove: function(anchor) {
			var view = _.findWhere(this.anchorPoints, {model: anchor});

			view.remove();
			// this.anchorPoints[anchor].remove();
			this.anchorPoints = _.without(this.anchorPoints, view);
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
			_.each(this.anchorPoints, function(anchor) {
				anchor.setScale(size);
			});
		}
	});
});