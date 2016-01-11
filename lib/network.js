'use strict';

var request = require('request');

function Network( quiubas ) {
	this.quiubas = quiubas;
};

Network.prototype.get = function( path, params, success, error ) {
	return this.request( path, params, 'GET', success, error );
};

Network.prototype.post = function( path, params, success, error ) {
	return this.request( path, params, 'POST', success, error );
};

Network.prototype.delete = function( path, params, success, error ) {	
	return this.request( path, params, 'DELETE', success, error );
};

Network.prototype.put = function( path, params, success, error ) {
	return this.request( path, params, 'PUT', success, error );
};

Network.prototype.request = function( path, params, method, success_callback, error_callback, curl_options ) {
	params				= params || false;
	method				= method || 'GET';
	success_callback	= success_callback || false;
	error_callback		= error_callback || false;
	curl_options		= curl_options || [];

	if ( typeof path === 'array' || typeof path === 'object' ) {
		path = this.quiubas.format( path.shift(), path.pop() );
	}

	var url = this.formatBaseURL( path );

	if ( url.split( '/' ).length === 2 ) {
		url += '/';
	}

	var	request_info = {
		method:		method
	};

	if ( params !== false ) {
		if ( method !== 'GET' ) {
			request_info.json = params;
		} else {
			var url_len = ( url.length - 1 );
			if ( url[url_len] !== '?' ) {
				url += '?';
			}

			var params_list = [];
			for ( var i in params ) {
				params_list.push( encodeURIComponent( i ) + '=' + encodeURIComponent( params[i] ) );
			}
			url += params_list.join( '&' );
		}
	}

	request_info.uri = url;

	var auth = this.quiubas.getAuth();
	request_info.auth = {
		user: auth.api_key,
		pass: auth.api_private,
		sendImmediately: true
	};

	request_info.strictSSL = false;
	request_info.timeout = 20000;
	request_info.forever = true;
	request_info.headers = {
		'User-Agent': 'Quiubas-Node/' + this.quiubas.lib_version
	};

	var request_fun = function (error, http_response, body) {
		if ( error !== null ) {
			this.resolveError( 'There was an error trying communicating with Quiubas Server: ' + error, error_callback );
		} else {
			var response;

			if ( typeof body !== 'array' && typeof body !== 'object' ) {
				try {
					response = JSON.parse( body );
				} catch (e) {
					this.resolveError( 'There was an error parsing the response: ' + e, error_callback );
					return;
				}
			} else {
				response = body;
			}

			var error_msg = false;

			if ( typeof response.error !== 'undefined' && response.error !== false ) {

				if ( typeof response.errors !== 'undefined' ) {
					error_msg = [];

					for ( var i in response.errors ) {
						error_msg.push( response.errors[i].message );
					}

					error_msg = error_msg.join( '\n' );
				} else {
					error_msg = response.error;
				}
			}

			var excluded_properties = [ 'action', 'error', '__debug' ];
			for ( var i in excluded_properties ) {
				if ( typeof response[excluded_properties[i]] !== 'undefined' ) {
					delete response[excluded_properties[i]];
				}
			}

			if ( typeof response.items !== 'undefined' ) {
				response = response.items;
			}

			if ( error_msg !== false ) {
				this.resolveError( error_msg, error_callback );
			} else {
				this.resolveSuccess( response, success_callback );
			}
		}
	}.bind(this);

	return request( request_info, request_fun );
};

Network.prototype.resolveSuccess = function(data, resolver) {
	if ( resolver !== false ) {
		resolver.bind(this);
		resolver(data);
	}
};

Network.prototype.resolveError = function(error, resolver) {
	if ( resolver === false ) {
		throw error;
	} else {
		resolver.bind(this);
		resolver(error);
	}
};

Network.prototype.getBaseURL = function( path ) {
	return ( this.quiubas.getBaseURL() + '/' + this.quiubas.version + '/' );
};

Network.prototype.formatBaseURL = function( path ) {
	return this.getBaseURL() + path;
};

module.exports = Network;

