define(["jquery", "backbone", "underscore", "./layer"], function($, Backbone, _, LayerView) {
	return Backbone.View.extend({
		className: "layers",
		initialize: function() {
			this.layers = [];

			this.collection.each(function(layer) {
				this.handleAdd(layer);
			});

			this.listenTo(this.collection, "add", this.handleAdd);
			this.listenTo(this.collection, "remove", this.handleRemove);

			$(window).on("resize", _.bind(this.resize, this));

			this.resize();
		},
		handleAdd: function(layer) {
			var view = new LayerView({
				model: layer
			});

			this.layers.push(view);

			this.$el.append(view.$el);

			view.resize();
		},
		handleRemove: function(layer) {
			// this.layers[layer].remove();
			// delete this.layers[layer];

			var view = _.findWhere(this.layers, {model: layer});
			view.remove();
			this.layers = _.without(this.layers, view);
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

			_.each(this.layers, function(layer) {
				layer.resize();
			});
		}
	});
});