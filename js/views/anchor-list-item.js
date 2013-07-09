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
			this.$el.html(this.template(this.model.attributes));

			this.listenTo(this.model, "change", this.render);
		},
		render: function() {
			this.$(".multiplier-input").val(this.model.get("multiplier"));
			this.$el.toggleClass("selected", this.model.get("_selected"));
			return this;
		},
		update: function() {
			this.model.set("multiplier", this.$(".multiplier-input").val());
		},
		deleteAnchor: function() {
			this.model.destroy();
		},
		over: function() {
			this.model.set("_selected", true);
		},
		out: function() {
			this.model.set("_selected", false);
		}
	});
});