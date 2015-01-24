// set the scene size
var WIDTH = $(document).width(),
    HEIGHT = $(document).height();

// set some camera attributes
var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;


var raycaster = new THREE.Raycaster();


Physijs.scripts.worker = '/bower_components/physijs/physijs_worker.js';
Physijs.scripts.ammo = '/bower_components/physijs/examples/js/ammo.js';


// Keyboard
var kb = new Keyboard();



// WebGL renderer
var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true });
renderer.setClearColor(0xeeeeee, 1);
renderer.setSize(WIDTH, HEIGHT);
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;

// Scene
//var scene = new THREE.Scene();
var scene = new Physijs.Scene({fixedTimeStep: 1 / 60 });


// Camera
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
camera.position.z = 500;
camera.position.y = 250;
camera.lookAt(new THREE.Vector3(0,0,0));
scene.add(camera);

// Point Light
var spotLight = new THREE.SpotLight( 0xcccccc );
spotLight.position.x = 50;
spotLight.position.y = 150;
spotLight.position.z = 200;
spotLight.castShadow = true;
spotLight.shadowDarkness = 0.1;
spotLight.angle = 360;
scene.add(spotLight);
var pointLightHelper = new THREE.PointLightHelper( spotLight, 10 );
scene.add( pointLightHelper );

//Ambient Lihgt
var light = new THREE.AmbientLight( 0x444444 ); // soft white light
scene.add( light );

// Helper
var axisHelper = new THREE.AxisHelper(100)
var gridHelper = new THREE.GridHelper(100,10)
scene.add(axisHelper);
scene.add(gridHelper);

// Controls
var controls = new THREE.OrbitControls(camera);

// Sphere
var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x2222ee, side: THREE.FrontSide});
var radius = 10, segments = 32, rings = 32;

var sphere = new Physijs.SphereMesh(
   	new THREE.SphereGeometry(radius, segments, rings),
   	sphereMaterial,
   	10
   );

sphere.position.y = 100;
sphere.castShadow = true;
scene.add(sphere);

// Ground
var planeMaterial = new THREE.MeshBasicMaterial( {color: 0xccccdd, side: THREE.FrontSide} );
// var plane = new THREE.Mesh( new THREE.PlaneGeometry( 1000, 1000, 12 ), planeMaterial );
var plane = new Physijs.BoxMesh( new THREE.BoxGeometry( 1000, 1, 1000, 1,1,1 ), planeMaterial, 0 );
// plane.rotation.x = Math.PI / 2 + Math.PI;
plane.receiveShadow = true;
scene.add(plane);



// Boxes
var numberOfBoxes = 6;
var boxWidth = 100;
var boxHeight = 40;
var boxDepth = 100;
var boxes = [];
var spreadArea = 800;
var boxMaterial = new THREE.MeshLambertMaterial({color: 0xeeeeee, side: THREE.FrontSide});

for(var i = 0; i < numberOfBoxes; i++) {
	var box = new Physijs.BoxMesh(new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth, 1, 1, 1), boxMaterial)
	box.position.set(
		(Math.random()*spreadArea)-spreadArea/2,
		boxHeight/2,
		(Math.random()*spreadArea)-spreadArea/2);
	box.position.y = 100;
	box.castShadow = true;
	boxes.push(box);
	scene.add(box);
};






var lightMove = 0;
function moveLight(){
	lightMove += 0.01;
	if(lightMove > 360){
		lightMove = 0;
	}
	spotLight.position.x = Math.sin(lightMove) * 200;
}





	

scene.setGravity(new THREE.Vector3(0,-1000,0));
sphere.setDamping(0.2, 0);

var preventJump = false;
var movePlayer = function(){
	var speed = 4000;
	var turnSpeed = 3;

	// var velocity = sphere.getLinearVelocity();

	var force = new THREE.Vector3(0,0,0);

	if(kb.isUP()){
		/*var rotation_matrix = new THREE.Matrix4().extractRotation(sphere.matrix);
		var force_vector = new THREE.Vector3(0, 0, -speed).applyMatrix4(rotation_matrix);
		sphere.setLinearVelocity(force_vector);*/
		// sphere.setLinearVelocity(new THREE.Vector3(0,0,-100));
		force.add(new THREE.Vector3(0,0,-speed));
	}
	if(kb.isDOWN()){
		/*var rotation_matrix = new THREE.Matrix4().extractRotation(sphere.matrix);
		var force_vector = new THREE.Vector3(0, 0, speed).applyMatrix4(rotation_matrix);
		sphere.setLinearVelocity(force_vector);*/
		// sphere.setLinearVelocity(new THREE.Vector3(0,0,100));
		force.add(new THREE.Vector3(0,0,speed));
	}
	if(kb.isLEFT()){
		// sphere.setAngularVelocity(new THREE.Vector3(0,turnSpeed,0));
		// sphere.setLinearVelocity(new THREE.Vector3(-100,0,0));
		force.add(new THREE.Vector3(-speed,0,0));
	}
	if(kb.isRIGHT()){
		// sphere.setAngularVelocity(new THREE.Vector3(0,-turnSpeed,0));
		// sphere.setLinearVelocity(new THREE.Vector3(100,0,0));
		force.add(new THREE.Vector3(speed,0,0));
	}

	if(kb.isSPACE() && !preventJump){
		preventJump = true;
		setTimeout(function(){
			preventJump = false;
		}, 500);
		sphere.applyCentralImpulse(new THREE.Vector3(0,4000,0));
	}

	sphere.applyCentralForce(force);
}


// render loop
function render() {
	movePlayer();
	scene.simulate(); // run physics
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    moveLight();
}
$('#container').append(renderer.domElement); 
render();



// helper
$('body').on('keypress', function(e){
	switch(e.keyCode){
		case 49: 
			axisHelper.visible = !axisHelper.visible;
			gridHelper.visible = !gridHelper.visible;
			break;
	}
});


var mouse = new THREE.Vector2();
var powerPoint;
var powerLine;
var powerLineGeometry = new THREE.Geometry();
	powerLineGeometry.vertices.push(new THREE.Vector3(0,0,0));
    powerLineGeometry.vertices.push(new THREE.Vector3(0,100,0));
var powerLineMaterial = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });
var powerLine = new THREE.Line(powerLineGeometry, powerLineMaterial);
powerLine.visible = false;
var debugSphere = new THREE.Mesh(
   	new THREE.SphereGeometry(5, 4, 4),
   	sphereMaterial);
debugSphere.position.x = 100;
scene.add(powerLine);
scene.add(debugSphere);

var $container = $('#container');

var changePowerLine = function(vector1, vector2){
	powerLine.geometry.vertices[0] = vector1;
	powerLine.geometry.vertices[1] = vector2;
	powerLine.geometry.verticesNeedUpdate = true;
};

var getIntersetFromMouse = function(event, object){
	mouse = new THREE.Vector2();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);	
	return raycaster.intersectObject(object);
};


var mouseMoveHandler = function(event){
	powerLine.visible = true;
	var intersects = getIntersetFromMouse(event, plane);
	if(intersects[0]){
		powerPoint = intersects[0].point;
		changePowerLine(sphere.position, powerPoint);
	}
};

var mouseUpHandler = function(event){
	$container.off('mousemove', mouseMoveHandler);
	$container.off('mouseup', mouseUpHandler);
	powerLine.visible = false;
	controls.enabled = true;

	
	debugSphere.position.copy(powerPoint.sub(sphere.position));
	var vector = powerPoint.sub(sphere.position);
	console.log(vector.length());

	sphere.applyCentralImpulse(vector.negate().multiplyScalar(10));
	// console.log(debugSphere);
};

var mouseDownHandler = function(event){
	var intersects = getIntersetFromMouse(event, sphere);
	if(intersects[0]){
		console.log("hit");
		controls.enabled = false;
		$container.on('mousemove', mouseMoveHandler);
		$container.on('mouseup', mouseUpHandler);
	}

};

$container.on('mousedown', mouseDownHandler);




