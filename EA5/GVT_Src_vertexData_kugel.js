var kugel = ( function() {

	// Formeln / Rechnung siehe:
	// http://blog.andreaskahler.com/2009/06/creating-icosphere-mesh-in-code.html
	
	function createVertexData() {

		// Positions.
		var vertices = [];
		var index = 0;
		
		// Normals.
		var normals = [];

		// Index data.
		var indicesLines = [];
		var indicesTris = [];
		
		// Recursion level.
		var recursionLevel = GLOBAL_RECURSION_LEVEL;
		console.log("Recursion level:", recursionLevel);
		
		// add vertex to mesh, fix position to be on unit sphere, return index
		function addVertex(vertex)
		{
			var length = Math.sqrt(vertex.x * vertex.x + vertex.y * vertex.y + vertex.z * vertex.z);
			
			vertices.push(vertex.x / length);
			vertices.push(vertex.y / length);
			vertices.push(vertex.z / length);
			
			normals.push(vertex.x / length);
			normals.push(vertex.y / length);
			normals.push(vertex.z / length);
			
			return index++;
		}

		// add tris
		function addTris(tris, lines, vertex) {
			tris.push(vertex.a);
			tris.push(vertex.b);
			tris.push(vertex.c);
			
			lines.push(vertex.a);
			lines.push(vertex.b);
			lines.push(vertex.b);
			lines.push(vertex.c);
			lines.push(vertex.c);
			lines.push(vertex.a);
		}

		// return index of point in the middle of p1 and p2
		function getMiddlePoint(p1, p2)
		{
			// calculate it
			var a = 0.5 * (vertices[3 * p1] + vertices[3 * p2]);
			var b = 0.5 * (vertices[3 * p1 + 1] + vertices[3 * p2 + 1]);
			var c = 0.5 * (vertices[3 * p1 + 2] + vertices[3 * p2 + 2]);
			
			var middle = {x: a, y: b, z: c};

			// add vertex makes sure point is on unit sphere
			var i = addVertex(middle); 

			// return index
			return i;
		}
//
//		// create 12 vertices of a icosahedron
//		var t = (1.0 + Math.sqrt(5.0)) / 2.0;
//
//		addVertex({x: -1, y:  t, z: 0});
//		addVertex({x:  1, y:  t, z: 0});
//		addVertex({x: -1, y: -t, z: 0});
//		addVertex({x:  1, y: -t, z: 0});
//
//		addVertex({x: 0, y: -1, z:  t});
//		addVertex({x: 0, y:  1, z:  t});
//		addVertex({x: 0, y: -1, z: -t});
//		addVertex({x: 0, y:  1, z: -t});
//
//		addVertex({x:  t, y: 0, z: -1});
//		addVertex({x:  t, y: 0, z:  1});
//		addVertex({x: -t, y: 0, z: -1});
//		addVertex({x: -t, y: 0, z:  1});

		// custom changes
		addVertex({x: -1, y: 0, z: 0});
		addVertex({x:  1, y: 0, z: 0});
		addVertex({x: -1, y: 0, z: 0});
		addVertex({x:  1, y: 0, z: 0});

		addVertex({x: 0, y: -1, z: 0});
		addVertex({x: 0, y:  1, z: 0});
		addVertex({x: 0, y: -1, z: 0});
		addVertex({x: 0, y:  1, z: 0});

		addVertex({x: 0, y: 0, z: -1});
		addVertex({x: 0, y: 0, z:  1});
		addVertex({x: 0, y: 0, z: -1});
		addVertex({x: 0, y: 0, z:  1});

		// create 20 triangles of the icosahedron

		// 5 faces around point 0
		addTris(indicesTris, indicesLines, {a: 0, b: 11, c: 5});
		addTris(indicesTris, indicesLines, {a: 0, b: 5, c: 1});
		addTris(indicesTris, indicesLines, {a: 0, b: 1, c: 7});
		addTris(indicesTris, indicesLines, {a: 0, b: 7, c: 10});
		addTris(indicesTris, indicesLines, {a: 0, b: 10, c: 11});

		// 5 adjacent faces
		addTris(indicesTris, indicesLines, {a: 1, b: 5, c: 9});
		addTris(indicesTris, indicesLines, {a: 5, b: 11, c: 4});
		addTris(indicesTris, indicesLines, {a: 11, b: 10, c: 2});
		addTris(indicesTris, indicesLines, {a: 10, b: 7, c: 6});
		addTris(indicesTris, indicesLines, {a: 7, b: 1, c: 8});

		// 5 faces around point 3
		addTris(indicesTris, indicesLines, {a: 3, b: 9, c: 4});
		addTris(indicesTris, indicesLines, {a: 3, b: 4, c: 2});
		addTris(indicesTris, indicesLines, {a: 3, b: 2, c: 6});
		addTris(indicesTris, indicesLines, {a: 3, b: 6, c: 8});
		addTris(indicesTris, indicesLines, {a: 3, b: 8, c: 9});

		// 5 adjacent faces
		addTris(indicesTris, indicesLines, {a: 4, b: 9, c: 5});
		addTris(indicesTris, indicesLines, {a: 2, b: 4, c: 11});
		addTris(indicesTris, indicesLines, {a: 6, b: 2, c: 10});
		addTris(indicesTris, indicesLines, {a: 8, b: 6, c: 7});
		addTris(indicesTris, indicesLines, {a: 9, b: 8, c: 1});		
		
		// refine triangles
		for (var i = 0; i < recursionLevel; i++)
		{
			var iTris = [];
			var iLines = [];

			for (var j = 0; j < indicesTris.length; j += 3)
			{
				// replace triangle by 4 triangles
				var a = getMiddlePoint(indicesTris[j], indicesTris[j + 1]);
				var b = getMiddlePoint(indicesTris[j + 1], indicesTris[j + 2]);
				var c = getMiddlePoint(indicesTris[j + 2], indicesTris[j]);

				addTris(iTris, iLines, {a: indicesTris[j], b: a, c: c});
				addTris(iTris, iLines, {a: indicesTris[j + 1], b: b, c: a});
				addTris(iTris, iLines, {a: indicesTris[j + 2], b: c, c: b});
				addTris(iTris, iLines, {a: a, b: b, c: c});
			}
			indicesTris = iTris;
			indicesLines = iLines;
		}
		
		// done, now add triangles to mesh
		this.vertices = Float32Array.from(vertices);
		this.normals = Float32Array.from(normals);
		this.indicesTris = Uint16Array.from(indicesTris);
		this.indicesLines = Uint16Array.from(indicesLines);
	}

	return {
		createVertexData : createVertexData
	}

}());
