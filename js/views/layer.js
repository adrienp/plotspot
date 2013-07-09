define(["jquery", "underscore", "backbone", "handlebars", "text!templates/layer.html", "glsl", "text!./plot.frag", "./anchor-points"], function($, _, Backbone, Handlebars, layerTemplate, Glsl, plotFragment, AnchorPointsView) {
	return Backbone.View.extend({
		className: "layer",
		template: Handlebars.compile(layerTemplate),
		events: {
			"resize": "resize"
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
			this.$el.html(this.template(this.model.attributes));

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

			this.listenTo(this.model, "change:active", this.handleActive);
			this.listenTo(this.model.get("anchors"), "all", this.render);
			this.listenTo(this.model.get("colorStops"), "all", this.render);
			
			this.resize();
		},
		handleActive: function() {
			// if (this.model.get("active")) {
			// 	this.glsl.start();
			// }
			// else {
			// 	this.glsl.stop();
			// }

			this.$el.toggleClass("active", this.model.get("active"));
		},
		resize: function() {
			var size = this.$el.width();

			if (window.devicePixelRatio) {
				size *= window.devicePixelRatio;
			}

			this.glsl.setSize(size, size);
			this.render();

			this.anchorPoints.resize();
		}
	});
});