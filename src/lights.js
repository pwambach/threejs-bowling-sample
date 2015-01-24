(function() {

    //Ambient Light
    var light = new THREE.AmbientLight(0x444444); // soft white light
    app.scene.add(light);


    // Point Light
    var spotLight = new THREE.SpotLight(0xcccccc);
    // spotLight.position.set(new THREE.Vector3(50, 150, 200));
    spotLight.position.y = 200;
    spotLight.castShadow = true;
    spotLight.shadowDarkness = 0.1;
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
        requestAnimationFrame(moveLight);
    }
    //moveLight();

})();