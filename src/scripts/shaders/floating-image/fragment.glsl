#include <common>

uniform sampler2D texture1;
varying vec2 vUv;

/*
This is a simple fragment shader that samples a 2D texture 
and assigns the sampled color to the output fragment color.

The input texture is specified as a uniform variable of type 
sampler2D, which is a special type for referencing 2D textures. 
The texture1 uniform is expected to be set to the appropriate 
texture object before rendering.

The vUv varying variable contains the texture coordinates of 
the current fragment, which are interpolated from the vertex shader. 
The texture2D function is used to sample the texture at the specified 
coordinates and return the sampled color.

Finally, the output fragment color is set to the sampled color using 
the gl_FragColor built-in variable.
*/
void main() {
    gl_FragColor = texture2D(texture1, vUv);
}