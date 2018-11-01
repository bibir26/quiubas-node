'use strict';

// Include modules
var modules = {
  balance: require('./balance'),
  sms: require('./sms'),
  mnp: require('./mnp')
};

// Base module
var Base = require('./base');

function Quiubas() {
  this.lib_version = '1.3.1';
  this.api_key = null;
  this.api_private = null;
  this.base_url = 'https://api.quiubas.com';

  // Network module
  var network_object = require('./network');
  this.network = new network_object(this);

  // Propagate modules as properties
  for (var i in modules) {
    this[i] = new Base(this, modules[i]);
  }
};

Quiubas.prototype.setBaseURL = function(base_url) {
  this.base_url = base_url;
};

Quiubas.prototype.getBaseURL = function() {
  return this.base_url;
};

Quiubas.prototype.setAuth = function(api_key, api_private) {
  this.api_key = api_key;
  this.api_private = api_private;
};

Quiubas.prototype.getAuth = function(base_url) {
  return {
    'api_key': this.api_key,
    'api_private': this.api_private
  };
};

Quiubas.prototype.getLibVersion = function() {
  return this.lib_version;
};

Quiubas.prototype.format = function(path, vars) {
  vars = vars || {};

  for (var i in vars) {
    vars[i] = encodeURIComponent(vars[i]);
  }

  return path.replace(/\{(\w*)\}/g, function(m, key) {
    return (vars.hasOwnProperty(key) ? vars[key] : '');
  });
};

module.exports = new Quiubas();
