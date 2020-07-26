onload = function(){
  const canvas = document.getElementById('my-canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  
  gl.clearColor(195/255, 60/255, 84/255, 1.0);
  gl.clearDepth(1.0);
  
  gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFEFER_BIT);

  var vs = createShader('vs');
  var fs = createShader('fs');
  
  var prg = createProgram(vs, fs);
  
  var attLoc = gl.getAttribLocation(prg, 'position');
  var attStride = 3;
  
  var vPos = [
     0.0, 1.0, 0.0,
     1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0
  ];
  
  var vbo = createVBO(vPos);
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.enableVertexAttribArray(attLoc);
  gl.vertexAttribPointer(attLoc, attStride, gl.FLOAT, false, 0, 0);
  
  var m = new matIV();
  var mMatrix = m.identity(m.create());
  var vMatrix = m.identity(m.create());
  var pMatrix = m.identity(m.create());
  var mvpMatrix = m.identity(m.create());
  
  m.lookAt([0.0, 1.0, 3.0], [0, 0, 0], [0, 1, 0], vMatrix);
  m.perspective(90, canvas.width / canvas.height, 0.1, 100, pMatrix);
  m.multiply(pMatrix, vMatrix, mvpMatrix);
  m.multiply(mvpMatrix, mMatrix, mvpMatrix);
  
  var uniLoc = gl.getUniformLocation(prg, 'mvpMatrix');
  gl.uniformMatrix4fv(uniLoc, false, mvpMatrix);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  gl.flush();  

  function createShader(id){
    var shader;
    var scriptElement = document.getElementById(id);

    if (!scriptElement) { return; }

    switch (scriptElement.type) {
      case 'x-shader/x-vertex':
        shader = gl.createShader(gl.VERTEX_SHADER);
        break;
      case 'x-shader/x-fragment':
        shader = gl.createShader(gl.FRAGMENT_SHADER);
        break;
      default:
        return;
    }

    gl.shaderSource(shader, scriptElement.text);
    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      return shader;
    } else {
      alert(gl.getShaderInfoLog(shader));
    }
  }

  function createProgram(vs, fs) {
    var program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.useProgram(program);
      return program;
    } else {
      alert(gl.getProgramInfoLog(program));
    }
  }

    function createVBO(data){
        var vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        return vbo;
    }
};