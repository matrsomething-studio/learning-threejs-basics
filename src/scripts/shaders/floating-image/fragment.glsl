#include <common>

// uniform sampler2D texture1;
// varying vec2 vUv;
// uniform float opacity;

// /*
// This is a simple fragment shader that samples a 2D texture 
// and assigns the sampled color to the output fragment color.

// The input texture is specified as a uniform variable of type 
// sampler2D, which is a special type for referencing 2D textures. 
// The texture1 uniform is expected to be set to the appropriate 
// texture object before rendering.

// The vUv varying variable contains the texture coordinates of 
// the current fragment, which are interpolated from the vertex shader. 
// The texture2D function is used to sample the texture at the specified 
// coordinates and return the sampled color.

// Finally, the output fragment color is set to the sampled color using 
// the gl_FragColor built-in variable.
// */
// void main() {
//     vec4 texelColor = texture2D(texture1, vUv);
//     gl_FragColor = vec4(texelColor.rgb, opacity);
// }


// uniform sampler2D texture1;
// uniform float opacity;
// uniform vec2 uOffset;
// varying vec2 vUv;



// void main() {
//     vec3 color = rgbShift(texture1, vUv, uOffset);
//     gl_FragColor = vec4(color, opacity);
// }


varying vec2 vUv;
uniform vec2 scale;
uniform vec2 imageBounds;
uniform sampler2D texture1;
uniform float zoom;
uniform float opacity;
uniform vec2 uOffset;

vec3 rgbShift(sampler2D textureImage, vec2 uv, vec2 offset) {
    float r = texture2D(textureImage,uv + offset).r;
    vec2 gb = texture2D(textureImage,uv).gb;
    return vec3(r,gb);
}

vec2 aspect(vec2 size) {
	return size / min(size.x, size.y);
}

void main() {
	vec2 s = aspect(scale);
	vec2 i = aspect(imageBounds);
	vec3 color = rgbShift(texture1, vUv, uOffset);
	float rs = s.x / s.y;
	float ri = i.x / i.y;
	vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
	vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
	vec2 uv = vUv * s / new + offset;
	vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5);
	
	gl_FragColor = texture2D(texture1, zUv);
	
	// gl_FragColor = vec4(color, opacity);
}