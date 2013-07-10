define(["backbone", "handlebars", "text!templates/layer-list-item.html", "./anchor-list", "models/vec4"], function(Backbone, Handlebars, layerListItemTemplate, AnchorListView, Vec4) {
	return Backbone.View.extend({
		className: "layer-list-item",
		tagName: "li",
		template: Handlebars.compile(layerListItemTemplate),
		events: {
			"change input": "update"
		},
		initialize: function() {
			var model = this.model.toJSON();

			model.radius = 0.7;
			model.thickness = 0.01;

			this.$el.html(this.template(model));

			this.anchorList = new AnchorListView({
				collection: this.model.get("anchors"),
				el: this.$(".anchor-list").get(0)
			});

			this.update();

			this.listenTo(this.model.get("colorStops"), "change", this.render);
		},
		update: function() {
			var radius = Number(this.$(".radius-input").val());
			var thickness = Number(this.$(".thickness-input").val());
			var color = Vec4.fromHex(this.$(".color-input").val());

			this.model.get("colorStops").setRadius(radius, thickness, color);
		},
		render: function() {
			this.$(".radius-input").val(this.model.get("colorStops").radius);
			this.$(".thickness-input").val(this.model.get("colorStops").thickness);
			this.$(".color-input").val(this.model.get("colorStops").color.toHex());
		}
	});
});