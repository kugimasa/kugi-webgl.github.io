export const VERTEX_SHADER = `
attribute vec3 position;
uniform   mat4 mvpMatrix;

void main(void){
    gl_Position = mvpMatrix * vec4(position, 1.0);
}
`;

export const FRAGMENT_SHADER = `
void main(void){
  gl_FragColor = vec4(0.215, 0.443, 0.556, 1.0);
}
`;