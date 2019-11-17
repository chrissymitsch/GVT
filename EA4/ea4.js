// Get the WebGL context.
var canvas = document.getElementById('canvas');
var gl = canvas.getContext('experimental-webgl');

// Pipeline setup.
gl.clearColor(1, 1, 1, 1);

// Backface culling.
gl.frontFace(gl.CCW);
gl.enable(gl.CULL_FACE);
//gl.disable(gl.CULL_FACE);
gl.cullFace(gl.BACK);

// Depth(Z)-Buffer.
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);

// Polygon offset of rastered Fragments.
gl.enable(gl.POLYGON_OFFSET_FILL);
gl.polygonOffset(1.0, 1.0);

// Compile vertex shader. 
var vsSource = '' + 
	'attribute vec3 pos;' + 
	'attribute vec4 col;' + 
	'varying vec4 color;' + 
	'void main(){' + 'color = col;' + 
	'gl_Position = vec4(pos, 1);' +
	'}';
var vs = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vs, vsSource);
gl.compileShader(vs);

// Compile fragment shader.
fsSouce = 'precision mediump float;' + 
	'varying vec4 color;' + 
	'void main() {' + 
	'gl_FragColor = color;' + 
	'}';
var fs = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fs, fsSouce);
gl.compileShader(fs);

// Link shader together into a program.
var prog = gl.createProgram();
gl.attachShader(prog, vs);
gl.attachShader(prog, fs);
gl.bindAttribLocation(prog, 0, "pos");
gl.linkProgram(prog);
gl.useProgram(prog);

// Vertex data Antisymmetrischer Torus.
// Positions, Index data.
var vertices, indicesLines, indicesTris, colors;

// Fill the data arrays.
createVertexData();

// Setup position vertex buffer object.
var vboPos = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vboPos);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// Bind vertex buffer to attribute variable.
var posAttrib = gl.getAttribLocation(prog, 'pos');
gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(posAttrib);

// Setup constant color.
var vboCol = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vboCol);
gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

// Setup lines index buffer object.
var iboLines = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesLines, gl.STATIC_DRAW);
iboLines.numberOfElements = indicesLines.length;
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

// Setup tris index buffer object.
var iboTris = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesTris, gl.STATIC_DRAW);
iboTris.numberOfElements = indicesTris.length;
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

// Clear framebuffer and render primitives.
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

// Bind vertex buffer
var colAttrib = gl.getAttribLocation(prog, 'col');

// Setup rendering tris.
gl.vertexAttrib4f(colAttrib, 0.1, 0, 0.45, 1);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris);
gl.drawElements(gl.TRIANGLES, iboTris.numberOfElements, gl.UNSIGNED_SHORT, 0);

// Setup rendering lines.
gl.vertexAttrib4f(colAttrib, 0.95, 0.9, 0, 1);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines);
gl.drawElements(gl.LINES, iboLines.numberOfElements, gl.UNSIGNED_SHORT, 0);			

/**

**/

// Vertex data Gewellter Torus II.
// Positions, Index data.
var vertices2, indicesLines2, indicesTris2, colors2;

// Fill the data arrays.
createVertexData2();

// Setup position vertex buffer object.
var vboPos2 = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vboPos2);
gl.bufferData(gl.ARRAY_BUFFER, vertices2, gl.STATIC_DRAW);

// Bind vertex buffer to attribute variable.
var posAttrib2 = gl.getAttribLocation(prog, 'pos');
gl.vertexAttribPointer(posAttrib2, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(posAttrib2);

// Setup constant color.
var vboCol2 = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vboCol2);
gl.bufferData(gl.ARRAY_BUFFER, colors2, gl.STATIC_DRAW);

// Setup lines index buffer object.
var iboLines2 = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines2);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesLines2, gl.STATIC_DRAW);
iboLines2.numberOfElements = indicesLines2.length;
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

// Setup tris index buffer object.
var iboTris2 = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris2);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesTris2, gl.STATIC_DRAW);
iboTris2.numberOfElements = indicesTris2.length;
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

// Bind vertex buffer
var colAttrib2 = gl.getAttribLocation(prog, 'col');

// Setup rendering tris.
gl.vertexAttrib4f(colAttrib2, 0.95, 0.9, 0, 1);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris2);
gl.drawElements(gl.TRIANGLES, iboTris2.numberOfElements, gl.UNSIGNED_SHORT, 0);

// Setup rendering lines.
gl.vertexAttrib4f(colAttrib2, 0.1, 0, 0.45, 1);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines2);
gl.drawElements(gl.LINES, iboLines2.numberOfElements, gl.UNSIGNED_SHORT, 0);			


// Funktion fuer Antisymmetrischer Torus.
function createVertexData() {
	var n = 32;
	var m = 16;
	var R = 0.5;
	var r = 0.1;
	var a = 1;
	var du = 2 * Math.PI / n;
	var dv = 2 * Math.PI / m;

	// Counter for entries in index array.
	let iLines = 0;
	let iTris = 0;

	// Positions.
	vertices = new Float32Array(3 * (n + 1) * (m + 1));

	// Index data.
	indicesLines = new Uint16Array(2 * 2 * n * m);
	indicesTris = new Uint16Array(3 * 2 * n * m);

	// Colors.
	colors = new Float32Array(3 * (n + 1) * (m + 1));

	for (let i = 0, u = -1; i <= n; i++, u += du) {
		for (let j = 0, v = -1; j <= m; j++, v += dv) {
			const iVertex = i * (m + 1) + j;
			
			var x = (R + r * Math.cos(v) * (a + Math.sin(u))) * Math.cos(u);
			var y = (R + r * Math.cos(v) * (a + Math.sin(u))) * Math.sin(u);
			var z = r * Math.sin(v) * (a + Math.sin(u));

			vertices[iVertex * 3] = x;
			vertices[iVertex * 3 + 1] = y;
			vertices[iVertex * 3 + 2] = z;
			
			if (j && i) {
				indicesLines[iLines++] = iVertex - 1;
				indicesLines[iLines++] = iVertex;
				indicesLines[iLines++] = iVertex - (m + 1);
				indicesLines[iLines++] = iVertex;
				
				indicesTris[iTris++] = iVertex;
				indicesTris[iTris++] = iVertex - 1;
				indicesTris[iTris++] = iVertex - (m + 1);
				indicesTris[iTris++] = iVertex - 1;
				indicesTris[iTris++] = iVertex - (m + 1) - 1;
				indicesTris[iTris++] = iVertex - (m + 1);
			}
		}
	}
}

// Funktion fuer Gewellter Torus II.
function createVertexData2() {
	var n = 64;
	var m = 18;
	var a = 0.5;
	var b = 0.3;
	var c = 0.1;
	var d = 6;
	var du = 2 * Math.PI / n;
	var dv = 2 * Math.PI / m;

	// Counter for entries in index array.
	let iLines = 0;
	let iTris = 0;

	// Positions.
	vertices2 = new Float32Array(3 * (n + 1) * (m + 1));

	// Index data.
	indicesLines2 = new Uint16Array(2 * 2 * n * m);
	indicesTris2 = new Uint16Array(3 * 2 * n * m);

	// Colors.
	colors2 = new Float32Array(3 * (n + 1) * (m + 1));

	for (let i = 0, u = -1; i <= n; i++, u += du) {
		for (let j = 0, v = -1; j <= m; j++, v += dv) {
			const iVertex = i * (m + 1) + j;
 
			var x = (a + b * Math.cos(d * u) + c * Math.cos(v)) * Math.cos(u);
			var z = a * c * Math.sin(v);
			var y = (a + b * Math.cos(d * u) + c * Math.cos(v)) * Math.sin(u);
 
			vertices2[iVertex * 3] = x;
			vertices2[iVertex * 3 + 1] = y;
			vertices2[iVertex * 3 + 2] = z;
			
			if (j && i) {
				indicesLines2[iLines++] = iVertex - 1;
				indicesLines2[iLines++] = iVertex;
				indicesLines2[iLines++] = iVertex - (m + 1);
				indicesLines2[iLines++] = iVertex;
				
				indicesTris2[iTris++] = iVertex;
				indicesTris2[iTris++] = iVertex - 1;
				indicesTris2[iTris++] = iVertex - (m + 1);
				indicesTris2[iTris++] = iVertex - 1;
				indicesTris2[iTris++] = iVertex - (m + 1) - 1;
				indicesTris2[iTris++] = iVertex - (m + 1);
			}
		}
	}
}
