'use strict';

module.exports = {
  base_name: 'sms',
  action_name: 'sms/{id}',

  send: function() {
    return this.action.apply(this, arguments);
  }

};
