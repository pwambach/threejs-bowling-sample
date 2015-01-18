// set the scene size
var WIDTH = $(document).width(),
    HEIGHT = $(document).height();

// set some camera attributes
var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;




// WebGL renderer
var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true });
renderer.setClearColor(0xeeeeee, 1);
renderer.setSize(WIDTH, HEIGHT);
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;

// Scene
var scene = new THREE.Scene();

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
var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x2222ee, side: THREE.DoubleSide});
var radius = 10, segments = 32, rings = 32;
var sphere = new THREE.Mesh(
   	new THREE.SphereGeometry(radius, segments, rings),
   	sphereMaterial
   );
sphere.position.y = radius;
sphere.castShadow = true;
scene.add(sphere);

// Ground
var planeMaterial = new THREE.MeshBasicMaterial( {color: 0xeeeeee, side: THREE.FrontSide} );
var plane = new THREE.Mesh( new THREE.PlaneGeometry( 1000, 1000, 12 ), planeMaterial );
plane.rotation.x = Math.PI / 2 + Math.PI;
plane.receiveShadow = true;
scene.add(plane);



// Boxes
var numberOfBoxes = 6;
var boxWidth = 20;
var boxHeight = 50;
var boxDepth = 20;
var boxes = [];
var spreadArea = 300;
var boxMaterial = new THREE.MeshLambertMaterial({color: 0xeeeeee, side: THREE.FrontSide});

for(var i = 0; i < numberOfBoxes; i++) {
	var box = new THREE.Mesh(new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth, 1, 1, 1), boxMaterial)
	box.position.set(
		(Math.random()*spreadArea)-spreadArea/2,
		boxHeight/2,
		(Math.random()*spreadArea)-spreadArea/2);
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



// render loop
function render() {
	// sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    moveLight();
}
$('#container').append(renderer.domElement); 
render();

	



var moveForward = function(){
	sphere.position.
};

var turnLeft = function(){
	
};

var turnRight = function(){
	
};

var moveBackward = function(){
	
};


// interactions
$('body').on('keydown', function(e){
	switch(e.keyCode){
		case 38: moveForward(); break;
		case 37: turnLeft(); break;
		case 39: turnRight(); break;
		case 40: moveBackward(); break;
		case 32: 
			axisHelper.visible = !axisHelper.visible;
			gridHelper.visible = !gridHelper.visible;
			break;
	}
});
