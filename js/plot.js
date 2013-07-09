if (!Glsl.supported()) alert("WebGL is not supported.");

function Vec2 (x, y) {
	this.x = x;
	this.y = y;
}

function Vec4 (x, y, z, w) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
}

function AnchorPoint (multiplier, point) {
	this.multiplier = multiplier;
	this.point = point;
}

function ColorStop (distance, color) {
	this.distance = distance;
	this.color = color;
}

var frames = 0;

var glsl = Glsl({
    canvas: document.getElementById("plot"),
    fragment: document.getElementById("plot-frag").textContent,
    variables: {
    	anchors: [],
    	anchorsLength: 0,
    	colorStops: [],
    	colorStopsLength: 0
    },
    update: function (time, delta) {
    	frames ++;
    }
});

glsl.start();

setInterval(function() {
	console.log(frames, "fps");
	frames = 0;
}, 1000);

glsl.variables.colorStops.push(new ColorStop(200, new Vec4(0, 0, 0, 1)));
glsl.variables.colorStops.push(new ColorStop(300, new Vec4(0, 0, 0, 0)));
glsl.set("colorStopsLength", 2);
glsl.sync("colorStops");