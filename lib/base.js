'use strict';

function Base( quiubas, extend ) {
	extend = extend || {};

	for ( var i in extend ) {
		this[i] = extend[i];
	}

	this.quiubas = quiubas;

	this.action = function(/* dynamic */) {
		var params = this.parseBaseParams(arguments);
		return this.quiubas.network.post( this.base_name, params.params, params.success, params.error );
	};

	this.get = function(/* dynamic */) {
		var params = this.parseBaseParams(arguments);
		return this.quiubas.network.get( [ this.action_name, { 'id': params.id } ], params.params, params.success, params.error );
	};

	this.delete = function(/* dynamic */) {
		var params = this.parseBaseParams(arguments);
		return this.quiubas.network.delete( [ this.action_name, { 'id': params.id } ], params.params, params.success, params.error );
	};

	this.update = function(/* dynamic */) {
		var params = this.parseBaseParams(arguments);
		return this.quiubas.network.put( [ this.action_name, { 'id': params.id } ], params.params, params.success, params.error );
	};

	this.getAll = function(/* dynamic */) {
		var params = this.parseBaseParams(arguments);
		return this.quiubas.network.get( this.base_name, params.params, params.success, params.error );
	};

	this.parseBaseParams = function(args) {
		var vars = {
			id: false,
			params: false
		};

		if ( typeof args[0] === 'function' ) {
			vars.success	= args[0];
			vars.error		= args[1];
		} else if ( typeof args[1] === 'function' ) {
			if ( typeof args[0] !== 'array' && typeof args[0] !== 'object' ) {
				vars.id			= args[0];
			} else {
				vars.params		= args[0];
			}
			vars.success	= args[1];
			vars.error		= args[2];
		} else {
			vars.id			= args[0];
			vars.params		= args[1];
			vars.success	= args[2];
			vars.error		= args[3];
		}

		return vars;
	};
};


module.exports = Base;
