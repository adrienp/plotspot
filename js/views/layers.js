define(["jquery", "./collection", "underscore", "./layer"], function($, CollectionView, _, LayerView) {
	return CollectionView.extend({
		className: "layers",
		initialize: function() {
			this.setup(this.$el, LayerView);

			this.listenTo(this, "addView", this.handleNewView);

			$(window).on("resize", _.bind(this.resize, this));

			this.resize();
		},
		handleNewView: function(view) {
			view.resize();
		},
		resize: function() {
			var $board = $(".board");

			var width = $board.width();
			var height = $board.height();

			var size = Math.min(width, height);

			var vertMargin = (height - size) / 2;
			var horizMargin = (width - size) / 2;

			this.$el.css({
				margin: vertMargin + "px " + horizMargin + "px",
				width: size,
				height: size
			});

			_.each(this.items, function(layer) {
				layer.resize();
			});
		}
	});
});