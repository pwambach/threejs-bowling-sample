(function(){

	// Ground
	var groundColor = 0xccccdd,
		sizeX = 1000,
		sizeZ = 1000;
	var planeMaterial = new THREE.MeshBasicMaterial( {color: groundColor, side: THREE.FrontSide} );
	var planeGeometry = new THREE.BoxGeometry( sizeX, 1, sizeZ, 1,1,1 );
	var plane = new Physijs.BoxMesh(planeGeometry, planeMaterial, 0 );
	plane.receiveShadow = true;
	app.ground = plane;
	app.scene.add(plane);



	// Boxes
	var boxColor = 0xeeeeee,
		numberOfBoxes = 6,
		boxWidth = 100,
		boxHeight = 40,
		boxDepth = 100;
	var boxes = [];
	var spreadArea = 800;

	var boxMaterial = new THREE.MeshLambertMaterial({color: boxColor, side: THREE.FrontSide});
	var boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth, 1, 1, 1);
	
	for(var i = 0; i < numberOfBoxes; i++) {
		var box = new Physijs.BoxMesh(boxGeometry, boxMaterial)
		box.position.set(
			(Math.random()*spreadArea)-spreadArea/2, boxHeight/2, (Math.random()*spreadArea)-spreadArea/2);
		box.position.y = 100;
		box.castShadow = true;
		boxes.push(box);
		app.scene.add(box);
	};

})();