'use strict';

module.exports =
{
	base_name		: 'sms',
	action_name		: 'sms/{id}',

	send: function() {
		return this.action.apply(this, arguments);
	},

	getResponses: function(/* dynamic */) {
		var params = this.parseBaseParams(arguments);
		return this.quiubas.network.get( [ this.action_name + '/responses', { 'id': params.id } ], params.params, params.success, params.error );
	},
};

