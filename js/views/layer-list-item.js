define(["backbone", "handlebars", "text!templates/layer-list-item.html", "./anchor-list", "models/vec4"], function(Backbone, Handlebars, layerListItemTemplate, AnchorListView, Vec4) {
	return Backbone.View.extend({
		className: "layer-list-item",
		tagName: "li",
		template: Handlebars.compile(layerListItemTemplate),
		events: {
			"click .title": "select",
			"change input": "update"
		},
		initialize: function() {
			var model = this.model.render();

			model.radius = 0.7;
			model.thickness = 0.01;

			this.$el.html(this.template(model));

			this.anchorList = new AnchorListView({
				collection: this.model.get("anchors"),
				el: this.$(".anchor-list").get(0)
			});

			this.update();

			this.listenTo(this.model.get("colorStops"), "change", this.render);
			this.listenTo(this.model, "change", this.render);
		},
		update: function() {
			var radius = Number(this.$(".radius-input").val());
			var thickness = Number(this.$(".thickness-input").val());
			var color = Vec4.fromHex(this.$(".color-input").val());

			this.model.get("colorStops").setRadius(radius, thickness, color);
		},
		render: function() {
			this.$el.toggleClass("active", this.model.get("_active") || false);
			this.$(".radius-input").val(Math.round(this.model.get("colorStops").radius * 1000) / 1000);
			this.$(".thickness-input").val(Math.round(this.model.get("colorStops").thickness * 1000) / 1000);
			this.$(".color-input").val(this.model.get("colorStops").color.toHex());
		},
		select: function() {
			if (this.model.get("_active")) {
				this.model.set("_active", false);
			}
			else {
				this.model.collection.forEach(function(layer) {
					layer.set("_active", false);
				});
				this.model.set("_active", true);
			}
			
		}
	});
});