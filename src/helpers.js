(function() {

    // Axis Helper
    var axisHelper = new THREE.AxisHelper(100)
    app.scene.add(axisHelper);

    // Grid Helper
    var gridHelper = new THREE.GridHelper(100, 10)
    app.scene.add(gridHelper);


    // sho/hide helpers
    $('body').on('keypress', function(e) {
        //press 'h' to hide helpers
        if (e.keyCode === 104) {
            axisHelper.visible = !axisHelper.visible;
            gridHelper.visible = !gridHelper.visible;
        }
    });

})();