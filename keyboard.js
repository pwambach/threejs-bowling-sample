var Keyboard = function(){
	var activeKeys = [];
	var keys = {
		'UP': 79,
		'LEFT': 75,
		'RIGHT': 186,
		'DOWN': 76,
		'SPACE': 32,
	};

	$('body').on('keydown keyup', function(e){
		if(e.type === 'keydown'){
			if(!_.contains(activeKeys, e.keyCode)){
				activeKeys.push(e.keyCode);
			}
		} else {
			activeKeys = _.without(activeKeys, e.keyCode);
		}
	});
	
	_.forEach(keys, function(value, key){
		this['is'+key] = function(){
			return _.contains(activeKeys, value);
		};
	}, this);
};
