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
	Physijs.scripts.worker = '/bower_components/physijs/physijs_worker.js';
	Physijs.scripts.ammo = '/bower_components/physijs/examples/js/ammo.js';


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






