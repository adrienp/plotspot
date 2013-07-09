requirejs.config({
	paths: {
		"jquery": "libs/jquery-2.0.2",
		"handlebars": "libs/handlebars",
		"glsl": "libs/glsl",
		"ember": "libs/ember-1.0.0-rc.6",
		"data": "libs/ember-data-0.13",
		"underscore": "libs/underscore",
		"backbone": "libs/backbone"
	},
	shim: {
		"handlebars": {
			exports: "Handlebars"
		},
		"glsl": {
			exports: "Glsl"
		},
		"ember": {
			deps: ["jquery", "handlebars"],
			exports: "Ember"
		},
		"data": {
			deps: ["ember"],
			exports: "DS"
		},
		"underscore": {
			exports: "_"
		},
		"backbone": {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}
	}
});

require(["views/layer", "models/layer", "models/anchor-point", "models/color-stop", "models/vec2", "models/vec4", "views/drawing", "models/drawing"], function(LayerView, Layer, AnchorPoint, ColorStop, Vec2, Vec4, DrawingView, Drawing) {
	drawing = new Drawing();
	drawingView = new DrawingView({
		model: drawing,
		el: document.body
	});

	layer = new Layer();
	drawing.get("layers").add(layer);
	// layerView = new LayerView({
	// 	model: layer
	// });

	// $(".layer-drawing-view").append(layerView.$el);


	layer.get("anchors").add([new AnchorPoint({
		point: new Vec2(0.3, 0.5)
	}), new AnchorPoint({
		point: new Vec2(0.7, 0.5)
	})]);

	// layer.get("colorStops").add([new ColorStop({
	// 	distance: 200,
	// 	color: new Vec4(0, 0, 0, 0)
	// }), new ColorStop({
	// 	distance: 202,
	// 	color: new Vec4(0, 0, 0, 1)
	// }), new ColorStop({
	// 	distance: 204,
	// 	color: new Vec4(0, 0, 0, 0)
	// })]);
})