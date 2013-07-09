define(["ember", "data", "anchor-point", "color-stop"], function(Ember, DS, AnchorPoint, ColorStop) {
	var App = Ember.Application.create();

	App.Router.map(function() {
		this.resource("plotspot", {
			path: "/"
		});
	});

	App.AnchorPoint = AnchorPoint;
	App.ColorStop = ColorStop;

	App.Store = DS.Store.extend({});

	return App;
});