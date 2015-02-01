(function(){

	// Ground
	var groundColor = 0xffffff,
		sizeX = 200,
		sizeZ = 600;
		sizeY = 10;
	var planeMaterial = new THREE.MeshLambertMaterial( {color: groundColor, side: THREE.FrontSide} );
	var planeGeometry = new THREE.BoxGeometry( sizeX, sizeY, sizeZ, 1,1,1 );
	var plane = new Physijs.BoxMesh(planeGeometry, planeMaterial, 0 );
	plane.position.y = -5;
	plane.receiveShadow = true;
	app.ground = plane;
	app.scene.add(plane);


	var planeMaterial2 = new THREE.MeshBasicMaterial( {color: 0xcccccc, side: THREE.FrontSide} );
	var planeGeometry2 = new THREE.PlaneGeometry( 200, 600, 1,1 );
	var plane2 = new THREE.Mesh(planeGeometry2, planeMaterial2);
	plane2.rotation.x = Math.PI / -2;
	plane2.position.y = -20;
	plane2.receiveShadow = true;
	app.scene.add(plane2);



	// Boxes
	var boxColor = 0xeeeeee,
		numberOfBoxes = 6,
		boxWidth = 20,
		boxHeight = 40,
		boxDepth = 20;
	var boxes = [];

	var boxMaterial = new THREE.MeshLambertMaterial({color: boxColor, side: THREE.FrontSide});
	var boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth, 1, 1, 1);
	
	for(var i = 0; i < numberOfBoxes; i++) {
		var box = new Physijs.BoxMesh(boxGeometry, boxMaterial, 100)
		box.castShadow = true;
		boxes.push(box);
		
	};

	boxes[0].position.set(0,boxHeight/2,-200);
	boxes[1].position.set(-30,boxHeight/2,-200);
	boxes[2].position.set(30,boxHeight/2,-200);
	boxes[3].position.set(-15,boxHeight/2+boxHeight,-200);
	boxes[4].position.set(15,boxHeight/2+boxHeight,-200);
	boxes[5].position.set(0,boxHeight/2+(2*boxHeight),-200);

	boxes.forEach(function(box){
		app.scene.add(box);
	});

})();