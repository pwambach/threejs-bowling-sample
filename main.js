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

// Scene
var scene = new THREE.Scene();

// Camera
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
camera.position.z = 500;
camera.position.y = 250;
camera.lookAt(new THREE.Vector3(0,0,0));
scene.add(camera);

// Light
var pointLight = new THREE.PointLight( 0xFFFFFF );
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;
scene.add(pointLight);


// Helper
scene.add(new THREE.AxisHelper(100));
scene.add(new THREE.GridHelper(100,10));




// Sphere
var sphereMaterial = new THREE.MeshLambertMaterial({color: 0xEEEEEE});
var radius = 50, segments = 32, rings = 32;
var sphere = new THREE.Mesh(
   	new THREE.SphereGeometry(radius, segments, rings),
   	sphereMaterial
   );
scene.add(sphere);



/*var skyboxGeometry = new THREE.CubeGeometry(500, 500, 500, 1, 1, 1, null, true);
var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.BackSide });
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skybox);*/







function render() {
	sphere.rotation.y += 0.01;
    renderer.render(scene, camera); 
    requestAnimationFrame(render);
}




$('#container').append(renderer.domElement); 
render();
