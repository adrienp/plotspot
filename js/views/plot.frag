precision mediump float;
uniform vec2 resolution;

#define MAX_ANCHORS     10
#define MAX_COLOR_STOPS 10

struct AnchorPoint {
    float multiplier;
    vec2 point;
};

struct ColorStop {
    float distance;
    vec4 color;
};

uniform AnchorPoint anchors[MAX_ANCHORS];
uniform ColorStop colorStops[MAX_COLOR_STOPS];

uniform int anchorsLength;
uniform int colorStopsLength;

float anchorDistance() {
    float dist = 0.0;

    for (int i = 0; i < MAX_ANCHORS; i ++) {
        if (i >= anchorsLength) {
            break;
        }
        dist += anchors[i].multiplier * distance(gl_FragCoord.xy, anchors[i].point);
    }

    return dist;
}

vec4 computeColor(float dist) {
    if (colorStopsLength == 0) {
        return vec4(0.0, 0.0, 0.0, 0.0);
    }

    if (dist <= colorStops[0].distance) {
        return colorStops[0].color;
    }

    for (int i = 1; i < MAX_COLOR_STOPS; i ++) {
        if (i >= colorStopsLength) {
            break;
        }

        if (dist <= colorStops[i].distance) {
            float interp = smoothstep(colorStops[i - 1].distance, colorStops[i].distance, dist);
            return mix(colorStops[i - 1].color, colorStops[i].color, interp);
        }
        else if (i == colorStopsLength - 1) {
            return colorStops[i].color;
        }
    }
}

void main() {
    float dist = anchorDistance();
    gl_FragColor = computeColor(dist);
}