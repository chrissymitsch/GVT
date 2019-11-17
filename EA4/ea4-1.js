/** CANVAS 1 **/

// Get the WebGL context.
var canvas = document.getElementById('canvas2');
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

// Vertex data Eigener Torus.
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


function createVertexData() {
	var n = 64;
	var m = 16;
	var R = 0.1;
	var r = 0.2;
	var a = 0.6;
	var b = 6;
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
			
			// Formeln fuer Antisymmetrischer Torus.
			var x0 = (R + r * Math.cos(v) * (a + Math.sin(u))) * Math.cos(u);
			var y0 = (R + r * Math.cos(v) * (a + Math.sin(u))) * Math.sin(u);
			var z0 = r * Math.sin(v) * (a + Math.sin(u));
			
			// Formeln fuer Gewellter Torus II.
			var x1 = (a + r * Math.cos(b * u) + r * Math.cos(v)) * Math.cos(u);
			var y1 = (a + r * Math.cos(b * u) + r * Math.cos(v)) * Math.sin(u);
			var z1 = a * r * Math.sin(v);
			
			var x = x0 - x1;
			var y = y0 - y1;
			var z = z0 - z1;

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