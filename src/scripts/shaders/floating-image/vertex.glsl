#include <common>

varying vec2 vUv;
uniform float time;
float sineSpeed = 1.0;
float sineIntensity = 0.05;

void main() {
    vUv = (uv - vec2(0.5)) * (0.8 - 0.02) + vec2(0.5);
    // vUv = uv;
    // vUv.y -= sin(time * sineSpeed) * sineIntensity;
    vUv.x -= sin(time * sineSpeed) * sineIntensity;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}