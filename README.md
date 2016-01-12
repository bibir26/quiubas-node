
# Quiubas NodeJS Library [![npm version](https://badge.fury.io/js/quiubas.svg)](http://badge.fury.io/js/quiubas)


## Installation

`npm install quiubas`

## API Overview

Every resource is accessed via your `quiubas` instance:

```js
var quiubas = require('quiubas');
// quiubas.{ RESOURCE_NAME }.{ METHOD_NAME }
```

The last two arguments of every resource method is the `success` and `error` callbacks, if no `error` is specified and an error occurs a `throw` will shown instead.

## Send an SMS
```js
var quiubas = require('quiubas');

quiubas.setAuth( 'api_key', 'api_private' );

quiubas.sms.send(
  {
  	to_number: '+52552123524',
  	message: 'Hello there'
  },
  function(response) {
    console.log('SUCCESS:', response);
  },
  function(error) {
	console.log('ERROR:', error);
  }
);
```

