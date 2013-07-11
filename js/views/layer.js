define(["jquery", "underscore", "backbone", "handlebars", "text!templates/layer.html", "glsl", "text!./plot.frag", "./anchor-points", "models/vec2"], function($, _, Backbone, Handlebars, layerTemplate, Glsl, plotFragment, AnchorPointsView, Vec2) {
	return Backbone.View.extend({
		className: "layer",
		template: Handlebars.compile(layerTemplate),
		events: {
			"resize": "resize",
			"mousedown": "mousedown",
			"mouseup": "mouseup",
			"mousemove": "mousemove",
			"mousewheel": "scroll"
		},
		render: function() {
			this.glsl.variables = this.makeGlslVariables();
			this.glsl.syncAll();
			this.glsl.render();
			
			return this;
		},
		makeGlslVariables: function() {
			var size = this.$el.width();

			var anchors = this.model.get("anchors").map(function(anchor) {
				var a = anchor.toJSON();
				a.point = a.point.mult(size);
				return a;
			});

			var anchorsLength = this.model.get("anchors").length;

			var colorStops = this.model.get("colorStops").map(function(colorStop) {
				var c = colorStop.toJSON();
				c.distance *= size;
				return c;
			});			

			var colorStopsLength = this.model.get("colorStops").length;

			return {
				anchors: anchors,
				anchorsLength: anchorsLength,
				colorStops: colorStops,
				colorStopsLength: colorStopsLength
			};
		},
		initialize: function() {
			this.$el.html(this.template(this.model.render()));

			this.anchorPoints = new AnchorPointsView({
				collection: this.model.get("anchors"),
				el: this.$(".anchor-points").get(0)
			});

			this.glsl = Glsl({
				canvas: this.$(".layer-canvas").get(0),
				fragment: plotFragment,
				variables: this.makeGlslVariables(),
			    update: function (time, delta) {
			    }
			});

			this.handleActive();

			this.listenTo(this.model, "change:_active", this.handleActive);
			this.listenTo(this.model.get("anchors"), "all", this.render);
			this.listenTo(this.model.get("colorStops"), "all", this.render);
			
			this.resize();
		},
		handleActive: function() {
			this.$el.toggleClass("active", this.model.get("_active") || false);
		},
		resize: function() {
			var size = this.$el.width();

			if (window.devicePixelRatio) {
				size *= window.devicePixelRatio;
			}

			this.glsl.setSize(size, size);
			this.render();

			this.anchorPoints.resize();
		},
		mousePoint: function(e) {
			var offset = this.$el.offset();
			var height = this.$el.height();
			return new Vec2((e.pageX - offset.left) / height, (height - (e.pageY - offset.top)) / height);
		},
		mousedown: function(e) {
			if (this.model.get("_active")) {
				this.dragging = true;
				this.mousemove(e);
				e.preventDefault();
			}
		},
		mousemove: function(e) {
			if (this.dragging) {
				var point = this.mousePoint(e);
				var dist = this.model.get("anchors").distance(point);
				this.model.get("colorStops").setRadius(dist);
			}
		},
		mouseup: function(e) {
			this.dragging = false;
		},
		scroll: function(e) {
			var delta = - e.originalEvent.wheelDeltaY;
			var val = (this.model.get("colorStops").radius * 1000 + delta) / 1000;
			this.model.get("colorStops").setRadius(val);
			e.preventDefault();
		}
	});
});