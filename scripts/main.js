var Keyboard = function(){
	var activeKeys = [];
	var keys = {
		'UP': 79,
		'LEFT': 75,
		'RIGHT': 186,
		'DOWN': 76,
		'SPACE': 32,
	};

	$('body').on('keydown keyup', function(e){
		if(e.type === 'keydown'){
			if(!_.contains(activeKeys, e.keyCode)){
				activeKeys.push(e.keyCode);
			}
		} else {
			activeKeys = _.without(activeKeys, e.keyCode);
		}
	});
	
	_.forEach(keys, function(value, key){
		this['is'+key] = function(){
			return _.contains(activeKeys, value);
		};
	}, this);
};

// set the scene size

(function(window){

	var $container = $('#container');

	var WIDTH = $(document).width(),
	    HEIGHT = $(document).height();

	// set some camera attributes
	var VIEW_ANGLE = 45,
	    ASPECT = WIDTH / HEIGHT,
	    NEAR = 0.1,
	    FAR = 10000;

	//set up Physijs
	Physijs.scripts.worker = 'physijs_worker.js';
	Physijs.scripts.ammo = 'ammo.js';


	// WebGL Renderer
	var renderer = new THREE.WebGLRenderer({antialias: true });
	renderer.setClearColor(0xeeeeee, 1);
	renderer.setSize(WIDTH, HEIGHT);
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;
	renderer.shadowMapType = THREE.PCFSoftShadowMap;

	// Physijs Scene
	scene = new Physijs.Scene();
	scene.setGravity(new THREE.Vector3(0,-100,0));

	// Camera
	var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	camera.position.z = 550;
	camera.position.x = 300;
	camera.position.y = 250;
	camera.lookAt(new THREE.Vector3(0,0,0));
	scene.add(camera);


	// Keyboard
	var kb = new Keyboard();


	// Controls
	var controls = new THREE.OrbitControls(camera);
	controls.noKeys = true;


	var spotLight = new THREE.PointLight(0xcccccc);
    spotLight.position.y = 1000;
    spotLight.angle = Math.PI/2;
    spotLight.shadowDarkness = 0.1;
    scene.add(spotLight);

    var pointLightHelper = new THREE.PointLightHelper(spotLight, 100);
    scene.add(pointLightHelper);


	// Render loop
	function render() {
		scene.simulate(); // run physics
	    renderer.render(scene, camera);
        requestAnimationFrame(render);
	}
	$container.append(renderer.domElement); 
	render();


	// make app public available
	var app = {
		scene: scene,
		camera: camera,
		container: $container,
		orbitControls: controls,
		keyboard: kb
	};
	window.app = app;

})(this);








(function(){

	var color = 0x2222ee,
		radius = 10,
		segments = 32,
		rings = 32;
		mass = 10;

	// Sphere
	var sphereMaterial = Physijs.createMaterial(new THREE.MeshLambertMaterial({color: color, side: THREE.FrontSide}), 1, 1);
	var sphereGeometry = new THREE.SphereGeometry(radius, segments, rings)
	
	var sphere = new Physijs.SphereMesh(sphereGeometry, sphereMaterial, mass);

	sphere.position.y = 30;
	sphere.position.z = 200;
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


	    var speed = 4000;
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
	    }

	    if(sphere.position.y < -50){
	    	sphere.position.y = 20;
	    	sphere.position.x = 0;
	    	sphere.position.z = 200;
	    	sphere.setLinearVelocity(new THREE.Vector3(0,0,0));
	    	sphere.setAngularVelocity(new THREE.Vector3(0,0,0));
	    	sphere.__dirtyPosition = true;
	    }

	    sphere.applyCentralForce(force);
	    requestAnimationFrame(movePlayer);
	};
	movePlayer();



})();
(function() {

    // Axis Helper
    var axisHelper = new THREE.AxisHelper(100);
    axisHelper.position.y = 20;
    app.scene.add(axisHelper);

    // Grid Helper
    var gridHelper = new THREE.GridHelper(100, 10);
    // app.scene.add(gridHelper);


    // sho/hide helpers
    $('body').on('keypress', function(e) {
        //press 'h' to hide helpers
        if (e.keyCode === 104) {
            axisHelper.visible = !axisHelper.visible;
            gridHelper.visible = !gridHelper.visible;
        }
    });


    // Stats
    var render_stats = new Stats();
    render_stats.domElement.style.position = 'absolute';
    render_stats.domElement.style.top = '0px';
    render_stats.domElement.style.zIndex = 100;
    $('body').append(render_stats.domElement);

    var updateStats = function(){
        render_stats.update();
        requestAnimationFrame(updateStats);
    };
    updateStats();

})();
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
(function() {

    var impulseScalar = 80;

    var $container = app.container;
    var character = app.character;
    var raycaster = new THREE.Raycaster();

    var mouse = new THREE.Vector2();
    var powerPoint;
    var powerLineGeometry = new THREE.Geometry();
    powerLineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
    powerLineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
    var powerLineMaterial = new THREE.LineBasicMaterial({
        color: 0x5555ff,
        linewidth: 3
    });
    var powerLine = new THREE.Line(powerLineGeometry, powerLineMaterial);
    powerLine.visible = false;
    app.scene.add(powerLine);

    var START_EVENT = Modernizr.touch ? 'touchstart' : 'mousedown';
    var MOVE_EVENT = Modernizr.touch ? 'touchmove' : 'mousemove';
    var END_EVENT = Modernizr.touch ? 'touchend' : 'mouseup';


    var material = new THREE.MeshBasicMaterial( {color: 0xcccccc, side: THREE.FrontSide} );
    var geometry = new THREE.PlaneGeometry( 1000, 1000, 1,1 );
    var plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / -2;
    plane.position.y = 5;
    plane.visible = false;
    app.scene.add(plane);


    var changePowerLine = function() {
        if(character.position && powerPoint){
            powerLine.geometry.vertices[0] = character.position;
            powerLine.geometry.vertices[1] = powerPoint;
            powerLine.geometry.verticesNeedUpdate = true;
        }
    };

    var getIntersectFromMouse = function(event, object) {
        var x = event.clientX || event.originalEvent.targetTouches[0].clientX;
        var y = event.clientY || event.originalEvent.targetTouches[0].clientY;
        mouse = new THREE.Vector2();
        mouse.x = (x / window.innerWidth) * 2 - 1;
        mouse.y = -(y / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, app.camera);
        return raycaster.intersectObject(object);
    };

    var mouseDownHandler = function(event) {
        var intersects = getIntersectFromMouse(event, character);
        if (intersects[0]) {
            app.orbitControls.enabled = false;
            app.container.on(MOVE_EVENT, mouseMoveHandler);
            app.container.on(END_EVENT, mouseUpHandler);
        }
    };

    var mouseMoveHandler = function(event) {
        var intersects = getIntersectFromMouse(event, plane);
        if (intersects[0]) {
            powerPoint = intersects[0].point;
            powerPoint.y = powerPoint.y + app.character.geometry.parameters.radius;
            changePowerLine();
            powerLine.visible = true;
        }
    };

    var mouseUpHandler = function(event) {
        app.container.off(MOVE_EVENT, mouseMoveHandler);
        app.container.off(END_EVENT, mouseUpHandler);
        powerLine.visible = false;
        app.orbitControls.enabled = true;

        var vector = powerPoint.sub(character.position);
        character.applyCentralImpulse(vector.negate().multiplyScalar(impulseScalar));
    };

    app.container.on(START_EVENT, mouseDownHandler);


    var drawPowerLine = function(){
        if(powerLine.visible){
            changePowerLine();
        }
        requestAnimationFrame(drawPowerLine);
    }
    drawPowerLine();

})();
(function() {

    //Ambient Light
    var light = new THREE.AmbientLight(0x555555); // soft white light
    app.scene.add(light);


    // Point Light
    var spotLight = new THREE.SpotLight(0xcccccc);
    spotLight.position.y = 550;
    spotLight.position.z = 200;
    spotLight.castShadow = true;
    spotLight.shadowDarkness = 0.4;
    spotLight.shadowCameraNear = 400;
    spotLight.shadowCameraFar = 800;
    spotLight.angle = Math.PI / 2;
    spotLight.shadowCameraVisible = false;
    spotLight.shadowCameraFov = 60;
    app.scene.add(spotLight);

    //Light Helper
    var pointLightHelper = new THREE.PointLightHelper(spotLight, 10);
    app.scene.add(pointLightHelper);


    // Light Move
    var lightMove = 0;
    function moveLight() {
        lightMove += 0.01;
        if (lightMove > 360) {
            lightMove = 0;
        }
        spotLight.position.x = Math.sin(lightMove) * 200;
        //requestAnimationFrame(moveLight);
    }
    moveLight();

})();