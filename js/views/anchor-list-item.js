define(["backbone", "handlebars", "text!templates/anchor-list-item.html"], function(Backbone, Handlebars, anchorListItemTemplate) {
	return Backbone.View.extend({
		tagName: "li",
		className: "anchor-list-item",
		template: Handlebars.compile(anchorListItemTemplate),
		events: {
			"change input": "update",
			"click .delete": "deleteAnchor",
			"mouseover": "over",
			"mouseout": "out"
		},
		initialize: function() {
			this.$el.html(this.template(this.model.render()));

			this.listenTo(this.model, "change", this.render);
		},
		render: function() {
			this.$(".multiplier-input").val(Math.round(this.model.get("multiplier") * 1000) / 1000);
			this.$el.toggleClass("selected", this.model.get("_selected"));
			return this;
		},
		update: function() {
			this.model.set("multiplier", Number(this.$(".multiplier-input").val()));
		},
		deleteAnchor: function(e) {
			this.model.destroy();
			e.preventDefault();
		},
		over: function() {
			this.model.set("_selected", true);
		},
		out: function() {
			this.model.set("_selected", false);
		}
	});
});