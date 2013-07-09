define(["backbone", "underscore"], function(Backbone, _) {
	return Backbone.View.extend({
		setup: function($list, ItemView) {
			this.ItemView = ItemView;
			this.$list = $list;
			this.items = [];

			this.collection.each(function(item) {
				this.handleAdd(item);
			});

			this.listenTo(this.collection, "add", this.handleAdd);
			this.listenTo(this.collection, "remove", this.handleRemove);
		},
		handleAdd: function(item) {
			var view = new this.ItemView({
				model: item
			});

			this.items.push(view);

			this.$list.append(view.$el);

			this.trigger("addView", view);
		},
		handleRemove: function(item) {
			// this.anchorListItems[anchor].remove();
			// delete this.anchorListItems[anchor];

			var view = _.findWhere(this.items, {model: item});
			view.remove();
			this.items = _.without(this.items, view);

			this.trigger("removeView", view);
		}
	});
})