#include <common>

uniform vec3 iResolution;
uniform float iTime;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x * cos(iTime), position.y *  cos(iTime), position.z * sin(iTime), 1.0);
}