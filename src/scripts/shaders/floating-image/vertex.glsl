#include <common>

#define M_PI 3.1415926535897932384626433832795

// /*
//  Scales and offsets the texture coordinate uv so that it is centered 
//  around (0.5, 0.5) and has a smaller range of values (from 0.02 to 0.8). 
//  This is often used to apply textures to 3D objects in computer graphics.
// */

// void main() {
//     vec2 offset_uv = uv - center;
//     vec2 scaled_uv = offset_uv * scale;
//     vUv = scaled_uv + center;
//     vUv.y -= sin(uTime * sineSpeed) * sineIntensity;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }

varying vec2 vUv;
uniform float uTime;
uniform vec2 uOffset;
uniform float uScroll;
vec2 center = vec2(0.5);
float scale = 0.78;
float sineSpeed = 1.0;
float sineIntensity = 0.025;

vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
   position.x = position.x + (sin(uv.y * M_PI) * offset.x);
   position.y = position.y + (sin(uv.x * M_PI) * offset.y);
   return position;
}

void main() {
   vUv = uv;
   vec3 newPosition = deformationCurve(position, uv, uOffset);

   vec2 offset_uv = uv - center;
   vec2 scaled_uv = offset_uv * scale;
   vUv = scaled_uv + center;
   vUv.x -= sin(uTime * sineSpeed) * sineIntensity;

   // gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, sin(position.x) * uScroll + position.y, position.z, 1.0);
}