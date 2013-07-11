define(["backbone"], function(Backbone) {
	return Backbone.View.extend({
		className: "anchor-point",
		events: {
			"mousedown": "grab",
			"mouseover": "over",
			"mouseout": "out",
			"dblclick": "destroy",
			"mousewheel": "scroll"
		},
		scale: 1,
		render: function() {
			var model = this.model.toJSON();

			this.$el.css({
				left: model.point.x * this.scale,
				bottom: model.point.y * this.scale
			});
			this.$el.toggleClass("selected", model._selected);

			return this;
		},
		initialize: function() {
			this.listenTo(this.model, "change", this.render);
			this.render();
		},
		grab: function(e) {
			// console.log(this);
			this.trigger("grab", this);
			this.model.set("_dragging", true);
			e.stopPropagation();
			e.preventDefault();
		},
		moveTo: function(point) {
			// console.log(point);
			this.model.set("point", point);
		},
		drop: function() {
			this.model.set("_dragging", false);
		},
		over: function() {
			this.model.set("_selected", true);
		},
		out: function() {
			this.model.set("_selected", false || this.model.get("_dragging"));
		},
		setScale: function(scale) {
			this.scale = scale;
			this.render();
		},
		destroy: function(e) {
			this.model.destroy();
			e.stopPropagation();
		},
		scroll: function(e) {
			var delta = - e.originalEvent.wheelDeltaY;
			var val = (this.model.get("multiplier") * 1000 + delta) / 1000;
			this.model.set("multiplier", val);
			e.preventDefault();
			e.stopPropagation();
		}
	});
})