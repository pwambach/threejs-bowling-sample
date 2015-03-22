(function(){

	// Ground
	var groundColor = 0xf5ffaf,
		sizeX = 200,
		sizeZ = 600;
		sizeY = 10;
	var planeMaterial = Physijs.createMaterial(new THREE.MeshLambertMaterial( {color: groundColor, side: THREE.FrontSide} ), 1,0.5);
	
	var planeGeometry = new THREE.BoxGeometry( sizeX, sizeY, sizeZ, 1,1,1 );
	var planeGeometry2 = new THREE.BoxGeometry( sizeX, sizeY, 200, 1,1,1 );
	var planeGeometry3 = new THREE.BoxGeometry( sizeX, sizeY, sizeZ, 1,1,1 );
	
	var plane = new Physijs.BoxMesh(planeGeometry, planeMaterial, 0 );
	var plane2 = new Physijs.BoxMesh(planeGeometry2, planeMaterial, 0 );
	var plane3 = new Physijs.BoxMesh(planeGeometry3, planeMaterial, 0 );
	plane.position.y = -5;
	plane.position.x = sizeX;

	plane2.position.y = -5;
	plane2.position.x = 0;
	plane2.position.z = 200;

	plane3.position.y = -5;
	plane3.position.x = -200;

	plane.receiveShadow = true;
	plane2.receiveShadow = true;
	plane3.receiveShadow = true;
	app.ground = plane;
	app.scene.add(plane);
	app.scene.add(plane2);
	app.scene.add(plane3);



	var makeBorder = function(x, z, w, h)  {
	    var border = new Physijs.BoxMesh(
	      new THREE.CubeGeometry(w, 100, h),
	      Physijs.createMaterial(
	        new THREE.MeshBasicMaterial({color: 0x000000}), 0.2, 1.0    
	      ),
	      0 
	    );
	    border.position.set(x, 50, z);
	    border.visible = false;
	    return border;
  	};

  	app.scene.add(makeBorder(-305, 0, 10, 600));
  	app.scene.add(makeBorder(305, 0, 10, 600));
  	app.scene.add(makeBorder(95, -100, 10, 400));
  	app.scene.add(makeBorder(-95, -100, 10, 400));
  	app.scene.add(makeBorder(0, 305, 600, 10));
  	app.scene.add(makeBorder(0, 95, 200, 10));
  	app.scene.add(makeBorder(0, -305, 600, 10));



	// Boxes
	var boxColor = 0xe6f2e5,
		numberOfBoxes = 6,
		boxWidth = 20,
		boxHeight = 40,
		boxDepth = 20;
		offsetX = -200;
		offsetZ = -200;
	var boxes = [];

	var boxMaterial = new THREE.MeshLambertMaterial({color: boxColor, side: THREE.FrontSide});
	var boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth, 1, 1, 1);
	
	for(var i = 0; i < numberOfBoxes; i++) {
		var box = new Physijs.BoxMesh(boxGeometry, boxMaterial, 25)
		box.castShadow = true;
		box.receiveShadow = true;
		box.position.set(0,boxHeight*i+(boxHeight/2), 0);
		boxes.push(box);

		
	};

	boxes[0].position.set(0 + offsetX,boxHeight/2,offsetZ);
	boxes[1].position.set(-30 + offsetX,boxHeight/2,offsetZ);
	boxes[2].position.set(30 + offsetX,boxHeight/2,offsetZ);
	boxes[3].position.set(-15 + offsetX,boxHeight/2+boxHeight,offsetZ);
	boxes[4].position.set(15 + offsetX,boxHeight/2+boxHeight,offsetZ);
	boxes[5].position.set(0 + offsetX,boxHeight/2+(2*boxHeight),offsetZ);

	boxes.forEach(function(box){
		app.scene.add(box);
	});

})();