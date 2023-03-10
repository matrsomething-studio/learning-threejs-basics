#include <common>

varying vec2 vUv;
uniform float time;
vec2 center = vec2(0.5);
float scale = 0.78;
float sineSpeed = 1.0;
float sineIntensity = 0.025;

/*
 Scales and offsets the texture coordinate uv so that it is centered 
 around (0.5, 0.5) and has a smaller range of values (from 0.02 to 0.8). 
 This is often used to apply textures to 3D objects in computer graphics.
*/
void main() {
    vec2 offset_uv = uv - center;
    vec2 scaled_uv = offset_uv * scale;
    vUv = scaled_uv + center;
    vUv.y -= sin(time * sineSpeed) * sineIntensity;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}