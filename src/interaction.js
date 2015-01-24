(function() {

    var impulseScalar = 4;

    var $container = app.container;
    var character = app.character;
    var raycaster = new THREE.Raycaster();

    var mouse = new THREE.Vector2();
    var powerPoint;
    var powerLineGeometry = new THREE.Geometry();
    powerLineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
    powerLineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
    var powerLineMaterial = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });
    var powerLine = new THREE.Line(powerLineGeometry, powerLineMaterial);
    powerLine.visible = false;
    app.scene.add(powerLine);

    var START_EVENT = Modernizr.touch ? 'touchstart mousedown' : 'mousedown';
    var MOVE_EVENT = Modernizr.touch ? 'touchmove mousemove' : 'mousemove';
    var END_EVENT = Modernizr.touch ? 'touchend mouseup' : 'mouseup';


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
        console.log("start");
        var intersects = getIntersectFromMouse(event, character);
        if (intersects[0]) {
            console.log("hit");
            app.orbitControls.enabled = false;
            app.container.on(MOVE_EVENT, mouseMoveHandler);
            app.container.on(END_EVENT, mouseUpHandler);
        }
    };

    var mouseMoveHandler = function(event) {
        var intersects = getIntersectFromMouse(event, app.ground);
        if (intersects[0]) {
            powerPoint = intersects[0].point;
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

    app.container.on('mousedown', mouseDownHandler);


    var drawPowerLine = function(){
        if(powerLine.visible){
            changePowerLine();
        }
        requestAnimationFrame(drawPowerLine);
    }
    drawPowerLine();

})();