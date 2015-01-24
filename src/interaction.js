(function() {

    var character = app.character;
    var raycaster = new THREE.Raycaster();

    var mouse = new THREE.Vector2();
    var powerPoint;
    var powerLine;
    var powerLineGeometry = new THREE.Geometry();
    powerLineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
    powerLineGeometry.vertices.push(new THREE.Vector3(0, 100, 0));
    var powerLineMaterial = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });
    var powerLine = new THREE.Line(powerLineGeometry, powerLineMaterial);
    powerLine.visible = false;

    app.scene.add(powerLine);

    var $container = $('#container');

    var changePowerLine = function(vector1, vector2) {
        powerLine.geometry.vertices[0] = vector1;
        powerLine.geometry.vertices[1] = vector2;
        powerLine.geometry.verticesNeedUpdate = true;
    };

    var getIntersetFromMouse = function(event, object) {
        mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, app.camera);
        return raycaster.intersectObject(object);
    };


    var mouseMoveHandler = function(event) {
        powerLine.visible = true;
        var intersects = getIntersetFromMouse(event, app.ground);
        if (intersects[0]) {
            powerPoint = intersects[0].point;
            changePowerLine(character.position, powerPoint);
        }
    };

    var mouseUpHandler = function(event) {
        $container.off('mousemove', mouseMoveHandler);
        $container.off('mouseup', mouseUpHandler);
        powerLine.visible = false;
        app.orbitControls.enabled = true;

        var vector = powerPoint.sub(character.position);
        character.applyCentralImpulse(vector.negate().multiplyScalar(10));
    };

    var mouseDownHandler = function(event) {
        var intersects = getIntersetFromMouse(event, character);
        if (intersects[0]) {
            console.log("hit");
            app.orbitControls.enabled = false;
            $container.on('mousemove', mouseMoveHandler);
            $container.on('mouseup', mouseUpHandler);
        }

    };

    $container.on('mousedown', mouseDownHandler);

})();