
(function(){

	var color = 0x2222ee,
		radius = 20,
		segments = 32,
		rings = 32;
		mass = 10;

	// Sphere
	var sphereMaterial = Physijs.createMaterial(new THREE.MeshLambertMaterial({color: color, side: THREE.FrontSide}), 0.1, 0.5);
	var sphereGeometry = new THREE.SphereGeometry(radius, segments, rings)
	
	var sphere = new Physijs.SphereMesh(sphereGeometry, sphereMaterial, mass);

	sphere.position.y = 30;
	sphere.castShadow = true;
	sphere.setDamping(0.2, 0);
	
	app.character = sphere;
	app.scene.add(sphere);



	//character move
	var preventJump = false;
	var movePlayer = function() {
	    var speed = 4000;
	    var turnSpeed = 3;

	    // var velocity = sphere.getLinearVelocity();

	    var force = new THREE.Vector3(0, 0, 0);

	    if (app.keyboard.isUP()) {
	        force.add(new THREE.Vector3(0, 0, -speed));
	    }
	    if (app.keyboard.isDOWN()) {
	        force.add(new THREE.Vector3(0, 0, speed));
	    }
	    if (app.keyboard.isLEFT()) {
	        force.add(new THREE.Vector3(-speed, 0, 0));
	    }
	    if (app.keyboard.isRIGHT()) {
	        force.add(new THREE.Vector3(speed, 0, 0));
	    }

	    if (app.keyboard.isSPACE() && !preventJump) {
	        preventJump = true;
	        setTimeout(function() {
	            preventJump = false;
	        }, 500);
	        sphere.applyCentralImpulse(new THREE.Vector3(0, speed, 0));
	    }

	    sphere.applyCentralForce(force);
	};
	//requestAnimationFrame(movePlayer);



})();