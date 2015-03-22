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
    var simulate = true;


	// WebGL Renderer
	var renderer = new THREE.WebGLRenderer({antialias: true });
	renderer.setClearColor(0x6faf46, 1);
	renderer.setSize(WIDTH, HEIGHT);
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;
	renderer.shadowMapType = THREE.PCFSoftShadowMap;

	// Physijs Scene
	scene = new Physijs.Scene();
	scene.setGravity(new THREE.Vector3(0,-800,0));

	// Camera
/*	var perspectiveCamera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	perspectiveCamera.position.z = 550;
	perspectiveCamera.position.x = 300;
	perspectiveCamera.position.y = 250;
	perspectiveCamera.lookAt(new THREE.Vector3(0,0,0));
	scene.add(perspectiveCamera);*/

	//Orthographic Camera
	var aspect = window.innerWidth / window.innerHeight;
	var d = 400;
	var camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 2500 );
	//var camera = new THREE.OrthographicCamera( 1000 / -2, 1000 / 2, 800 / 2, 800 / -2, 1, 1000 );
	camera.position.set( 800, 400, 800 );
	camera.lookAt( new THREE.Vector3(0,0,0) ); // or the origin
	scene.add(camera);

/*	var cameraHelper = new THREE.CameraHelper(camera);
	scene.add(cameraHelper);*/


	// Keyboard
	var kb = new Keyboard();


	// Controls
	var controls = new THREE.OrbitControls(camera);
	controls.noKeys = true;


	/*var spotLight = new THREE.PointLight(0xcccccc);
    spotLight.position.y = 1000;
    spotLight.angle = Math.PI/2;
    spotLight.shadowDarkness = 0.1;
    scene.add(spotLight);

    var pointLightHelper = new THREE.PointLightHelper(spotLight, 100);
    scene.add(pointLightHelper);*/


	// Render loop
	function render() {
		if(simulate){
			scene.simulate(); // run physics
		}
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


	$('body').on('keydown', function(e){
		//'s' key for simulate
		if(e.keyCode === 83){
			simulate = !simulate;
			console.log("simulation: ", simulate);
		}
	});


})(this);






