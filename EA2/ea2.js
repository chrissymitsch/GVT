function Float32Concat(first, second)
{
    var firstLength = first.length;
    var result = new Float32Array(firstLength + second.length);

    result.set(first);
    result.set(second, firstLength);

    return result;
}

// Get the WebGL context
var canvas = document.getElementById('canvas');
var gl = canvas.getContext('experimental-webgl');

// Pipeline setup
gl.clearColor(0.18, 0.15, 0.23, 1);

// Compile a vertex shader
var vsSource = 'attribute vec2 pos;'+
		'void main(){ gl_Position = vec4(pos  * 0.1 - 0.05, 0, 1);'+
		'gl_PointSize = 10.0; }';
var vs = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vs, vsSource);
gl.compileShader(vs);

// Compile a fragment shader
fsSouce =  'void main() { gl_FragColor = vec4(0.97,0.75,0.51,1); }';
var fs = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fs, fsSouce);
gl.compileShader(fs);

// Link together into a program
var prog = gl.createProgram();
gl.attachShader(prog, vs);
gl.attachShader(prog, fs);
gl.linkProgram(prog);
gl.useProgram(prog);

// Load vertex data into a buffer
var kopfRechts = new Float32Array([ 
	0,0,
	1,0,
	2,2,
	// auge rechts
	2,2.5,
	1.5,2.5,
	1,2,
	2,2,
	// nase
	0.5,0.5,
	0,1,
	1,1,
	2,2,
	// nase ende
	2,3,
	2.5,3,
	3.5,4,
	2.5,4,
	2,3.5,
	1.5,4,
	-0.5,4,
	-1,3.5,
	// wieder zurueck
	-0.5,4,
	1.5,4
]);

var geweihRechts = new Float32Array([ 
	2,3.5,
	2,4.5,
	3,4.5,
	4,5,
	5,5,
	6,4.5,
	7,5.5,
	7,7,
	6,5.5,
	5.5,6,
	6,7,
	6,8,
	4,9.5,
	2.5,9,
	4,9,
	5,8,
	5,7,
	4.5,6,
	4,7,
	3,7.5,
	4,6.5,
	4,6,
	3.5,5.5,
	3,5.5,
	2.5,5,
	2,6,
	2,5,
	0.5,3.5
]);

var geweihLinks = new Float32Array(geweihRechts.length - 2);
var geweihLinksLength = geweihRechts.length - 3; //der letzte, bzw. erste Vertex soll nicht doppelt vorkommen, daher nochmal -2.
// reversed geweih rechts und spiegelung
for (var i = 0; i < geweihLinksLength; i += 2) {
	var xKoordinateIndex = geweihLinksLength - i - 1;
	var yKoordinateIndex = geweihLinksLength - i;
	geweihLinks[i] = geweihRechts[xKoordinateIndex] * (-1) + 1;
	geweihLinks[i + 1] = geweihRechts[yKoordinateIndex];
}

var kopfLinks = new Float32Array([ 
	-1.5,4,
	-2.5,4,
	-1.5,3,
	-1,3,
	-1,2,
	-1,2.5,
	-0.5,2.5,
	0,2,
	-1,2,
	0,1,
	-1,2,
	0,0
]);

var hals = new Float32Array([ 
	-0.5,1,
	-1.5,-1,
	-1,2,
	-1.5,-1,
	-1.5,-4,
	0.5,-6,
	2.5,-4,
	2.5,-1,
	2,2,
	2.5,-1,
	1.5,1,
	1.5,-1,
	0.5,-3,
	-0.5,-1,
	-0.5,1
]);

var vertices0 = Float32Concat(kopfRechts, geweihRechts);
var vertices1 = Float32Concat(vertices0, geweihLinks);
var vertices2 = Float32Concat(vertices1, kopfLinks);
var vertices = Float32Concat(vertices2, hals);

console.log(vertices);
console.log(vertices.length);

var vbo = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// Bind vertex buffer to attribute variable
var posAttrib = gl.getAttribLocation(prog, 'pos');
gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(posAttrib);

// Clear framebuffer and render primitives
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.LINE_STRIP, 0, vertices.length / 2);
