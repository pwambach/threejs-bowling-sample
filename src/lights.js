(function() {

    //Ambient Light
    var light = new THREE.AmbientLight(0x333333); // soft white light
    // app.scene.add(light);

    // Directional Light
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set( 200, 300, 200 );
    directionalLight.castShadow = true;
    directionalLight.shadowDarkness = 0.4;
    directionalLight.shadowCameraNear = 10;
    directionalLight.shadowCameraFar = 800;
    directionalLight.shadowCameraVisible = false;
    directionalLight.shadowCameraFov = 60;
    app.scene.add( directionalLight );

        //Light Helper
/*    var directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 10);
    app.scene.add(directionalLightHelper);*/

    // Point Light
/*    var spotLight = new THREE.SpotLight(0xcccccc);
    spotLight.position.y = 550;
    spotLight.position.x = 200;
    spotLight.position.z = 200;
    spotLight.castShadow = true;
    spotLight.shadowDarkness = 0.4;
    spotLight.shadowCameraNear = 400;
    spotLight.shadowCameraFar = 800;
    spotLight.angle = Math.PI / 2;
    spotLight.shadowCameraVisible = false;
    spotLight.shadowCameraFov = 60;
    app.scene.add(spotLight);*/

    //Light Helper
/*    var pointLightHelper = new THREE.PointLightHelper(spotLight, 10);
    app.scene.add(pointLightHelper);*/


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
    //moveLight();

})();