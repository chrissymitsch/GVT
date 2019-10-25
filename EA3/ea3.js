// Get the WebGL context
var canvas = document.getElementById('canvas');
var gl = canvas.getContext('experimental-webgl');

// Pipeline setup
gl.clearColor(0.36, 0.43, 0.51, 1);
// Backface culling.
gl.enable(gl.CULL_FACE);
gl.cullFace(gl.BACK);
		
// Compile a vertex shader
// var vsSource = 'attribute vec2 pos;'+
		// 'void main(){ gl_Position = vec4(pos  * 0.1 - 0.05, 0, 1);'+
		// 'gl_PointSize = 10.0; }';
var vsSource = ''+
	   'attribute vec3 pos;'+
	   'attribute vec4 col;'+
	   'varying vec4 color;'+
	   'void main(){'+
		   'color = col;'+                 
		   'gl_Position = vec4(pos * 0.1, 1);'+
	   '}';
var vs = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vs, vsSource);
gl.compileShader(vs);

// Compile a fragment shader
//fsSouce =  'void main() { gl_FragColor = vec4(0.97,0.75,0.51,1); }';
fsSouce = 'precision mediump float;'+ 
		'varying vec4 color;'+
		'void main() {'+
			'gl_FragColor = color;'+
		'}';
		
var fs = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fs, fsSouce);
gl.compileShader(fs);

// Link together into a program
var prog = gl.createProgram();
gl.attachShader(prog, vs);
gl.attachShader(prog, fs);
gl.linkProgram(prog);
gl.useProgram(prog);

// Farben
var colors = new Float32Array([
	0.27,0.13,0.27,1,
	0.18,0,0.15,1,
	0.18,0,0.15,1,
	0.77,0.36,0.38,1,
	0.27,0.13,0.27,1, //5
	
	0.27,0.13,0.27,1,
	0.77,0.36,0.38,1,
	0.62,0.54,0.55,1,
	0.27,0.13,0.27,1,
	0.77,0.36,0.38,1, //10
	
	0.77,0.36,0.38,1,
	0.77,0.36,0.38,1,
	0.77,0.36,0.38,1,
	0.77,0.36,0.38,1,
	0.97,0.76,0.72,1, //15
	
	0.97,0.76,0.72,1,
	0.97,0.76,0.72,1,
	0.97,0.76,0.72,1,
	0.97,0.76,0.72,1,
	0.97,0.76,0.72,1, //20

	0.77,0.36,0.38,1,
	0.97,0.76,0.72,1,
	0.77,0.36,0.38,1,
	0.77,0.36,0.38,1,
	1,0.94,0.81,1, //25
	
	0.27,0.13,0.27,1,
	0.77,0.36,0.38,1,
	0.27,0.13,0.27,1,
	0.18,0,0.15,1,
	0.18,0,0.15,1, //30
	
	0.62,0.54,0.55,1,
	0.27,0.13,0.27,1,
	0.27,0.13,0.27,1,
	0.27,0.13,0.27,1,
	0.62,0.54,0.55,1, //35
	
	0.27,0.13,0.27,1,
	0.77,0.36,0.38,1,
	0.58,0.57,0.66,1,
	1,0.94,0.81,1,
	1,0.94,0.81,1, //40
	
	0.58,0.57,0.66,1,
	0.18,0,0.15,1,
	0.18,0,0.15,1,
	0.77,0.36,0.38,1,
	0.18,0,0.15,1, //45
	
	0.43,0.17,0.29,1,
	0.62,0.54,0.55,1,
	0.58,0.57,0.66,1,
	0.39,0.45,0.59,1,
	0.39,0.45,0.59,1, //50
	
	0.26,0.22,0.43,1,
	0.26,0.22,0.43,1,
	0.26,0.22,0.43,1,
	0.26,0.22,0.43,1,
	0.58,0.57,0.66,1, //55
	
	0.58,0.57,0.66,1,
	0.26,0.22,0.43,1,
	0.26,0.22,0.43,1,
	0.27,0.13,0.27,1,
	0.77,0.36,0.38,1, //60
	
	0.77,0.36,0.38,1,
	1,0.94,0.81,1,
	1,0.94,0.81,1,
	1,0.94,0.81,1,
	0.26,0.22,0.43,1, //65
	
	0.26,0.22,0.43,1,
	0.58,0.57,0.66,1,
	0.58,0.57,0.66,1,
	0.26,0.22,0.43,1,
	1,0.94,0.81,1, //70
	
	0.77,0.36,0.38,1,
	0.26,0.22,0.43,1,
	0.58,0.57,0.66,1,
	0.77,0.36,0.38,1

]);


/** Rechte Seite **/
var vertices0 = new Float32Array([
	0,-7,0,
	2,-5,0,
	0,-5,0,
	2,-2,0,
	0,-1.5,0, //5
	
	0.5,-1.5,0,
	2,-2,0,
	1.5,1,0,
	0.5,-1.5,0,
	0,-1.5,0, //10
	
	0,-1,0,
	1.5,1,0,
	0.5,-0.5,0,
	0,-0.5,0,
	0,1,0, //15

	1.5,1,0,
	0.5,1,0,
	0,1,0,
	0,1.5,0,
	0.5,1,0, //20

	1,1.5,0,
	0,1.5,0,
	0,3,0,
	1,1.5,0,
	1.5,3,0, //25

	1.5,1.5,0,
	1.5,2,0,
	1.5,2.5,0,
	2,2,0,
	1.5,2,0, //30

	2,2,0,
	3,3,0,
	2,3,0,
	1.5,2.5,0,
	2,2,0, //35

	1.5,2.5,0,
	1.5,3,0,
	0.5,3,0,
	1.5,4,0,
	1.5,3,0, //40

	1.5,5,0,
	2,4,0,
	2,3.5,0,
	1.5,3.5,0,
	2.5,4.5,0, //45

	2.5,3.5,0,
	3.5,4.5,0,
	4,4,0,
	4,5,0,
	4.5,4,0, //50

	4.5,5,0,
	4,6,0,
	4,5,0,
	4,6,0,
	4,5.5,0, //55

	3,6.5,0,
	4.5,5,0,
	4.5,4,0,
	5.5,5,0,
	6,3.5,0, //60

	6,4.5,0,
	7,5.5,0,
	6,4.5,0,
	6,4,0,
	5,6,0, //65

	4.5,5,0,
	5.5,5,0,
	6,6,0,
	4,8,0,
	6,6.5,0, //70

	4,8.5,0,
	4,8,0,
	2.5,8,0,
	4,8.5,0
]);

gl.frontFace(gl.CCW);

// Setup position vertex buffer object.
var vboPos0 = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vboPos0);
gl.bufferData(gl.ARRAY_BUFFER, vertices0, gl.STATIC_DRAW);

// Bind vertex buffer to attribute variable.
var posAttrib0 = gl.getAttribLocation(prog, 'pos');
gl.vertexAttribPointer(posAttrib0, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(posAttrib0);
			
// Setup color vertex buffer object.
var vboCol0 = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vboCol0);
gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

// Bind vertex buffer to attribute variable.
var colAttrib0 = gl.getAttribLocation(prog, 'col');
gl.vertexAttribPointer(colAttrib0, 4, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(colAttrib0);
			
// Clear framebuffer and render primitives
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices0.length / 3);


/** Linke Seite **/
var vertices = new Float32Array(vertices0.length);
// Rechte Seite wird gespiegelt
for (var i = 0; i < vertices0.length - 1; i += 3) {
	vertices[i] = vertices0[i] * (-1);
	vertices[i+1] = vertices0[i+1];
	vertices[i+2] = vertices0[i+2];
}

gl.frontFace(gl.CW);

// Setup position vertex buffer object.
var vboPos = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vboPos);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// Bind vertex buffer to attribute variable.
var posAttrib = gl.getAttribLocation(prog, 'pos');
gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(posAttrib);
			
// Setup color vertex buffer object.
var vboCol = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vboCol);
gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

// Bind vertex buffer to attribute variable.
var colAttrib = gl.getAttribLocation(prog, 'col');
gl.vertexAttribPointer(colAttrib, 4, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(colAttrib);
			
// Clear framebuffer and render primitives
//gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length / 3);
