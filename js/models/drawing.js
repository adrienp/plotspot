define(["./model", "./layer-list"], function(Model, LayerList) {
	return Model.extend({
		initialize: function() {
			if (!this.has("layers")) {
				this.set("layers", new LayerList());
			}
		}
	});
});