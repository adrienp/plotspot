define(["backbone"], function(Backbone) {
	return Backbone.Model.extend({
		render: function() {
			var ret = this.toJSON();
			ret.id = this.id || this.cid;
			return ret;
		}
	});
});