'use strict';

module.exports =
{
	base_name		: 'keywords',
	action_name		: 'keywords/{id}',

	create: function() {
		return this.action(...arguments);
	},
};

