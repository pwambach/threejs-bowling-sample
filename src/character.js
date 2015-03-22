
(function(){

	var color = 0x61cbe3,
		radius = 15,
		segments = 24,
		rings = 24;
		mass = 10;

	// Sphere
	var sphereMaterial = Physijs.createMaterial(new THREE.MeshBasicMaterial({color: color, side: THREE.FrontSide}), 1, 1);
	var sphereGeometry = new THREE.SphereGeometry(radius, segments, rings)
	
	var sphere = new Physijs.SphereMesh(sphereGeometry, sphereMaterial, mass);
	sphere.setLinearFactor(new THREE.Vector3( 0, 0, 0 )); // only move on X and Z axis

	sphere.position.y = 30;
	sphere.position.z = -200;
	sphere.position.x = 200;
	sphere.castShadow = true;
	//sphere.setDamping(1, 1);
	
	app.character = sphere;
	app.scene.add(sphere);



	//character move
	var preventJump = false;
	var movePlayer = function() {
		/*var forceScalar = 200;

		var vector = sphere.position.clone();
		var length = vector.length() * 1.5;
		if(length > 500){
			length = 500;
		}
		length = length / 500;
		length = 1-length;

		vector.negate();
		vector.normalize();
		vector.multiplyScalar(forceScalar * length);

		sphere.applyCentralImpulse(vector);

		*/


/*	    var speed = 4000;
	    var force = new THREE.Vector3(0, 0, 0);

	    if (app.keyboard.isUP()) {
	    	console.log("UP");
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
	    }*/

	    if(sphere.position.y < -50){
	    	sphere.position.y = 20;
	    	sphere.position.x = 0;
	    	sphere.position.z = 200;
	    	sphere.setLinearVelocity(new THREE.Vector3(0,0,0));
	    	sphere.setAngularVelocity(new THREE.Vector3(0,0,0));
	    	sphere.__dirtyPosition = true;
	    }

	    //sphere.applyCentralForce(force);
	    //requestAnimationFrame(movePlayer);
	};
	movePlayer();



})();