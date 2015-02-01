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
    spotLight.shadowCameraVisible = true;
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