(function() {

    // Axis Helper
    var axisHelper = new THREE.AxisHelper(100);
    axisHelper.position.y = 20;
    axisHelper.visible = false
    app.scene.add(axisHelper);

    // Grid Helper
    /*var gridHelper = new THREE.GridHelper(100, 10);
    app.scene.add(gridHelper);*/


    // sho/hide helpers
    $('body').on('keypress', function(e) {
        //press 'h' to hide helpers
        if (e.keyCode === 104) {
            axisHelper.visible = !axisHelper.visible;
            gridHelper.visible = !gridHelper.visible;
        }
    });


    // Stats
    var render_stats = new Stats();
    render_stats.domElement.style.position = 'absolute';
    render_stats.domElement.style.top = '0px';
    render_stats.domElement.style.zIndex = 100;
    $('body').append(render_stats.domElement);

    var updateStats = function(){
        render_stats.update();
        requestAnimationFrame(updateStats);
    };
    updateStats();

})();