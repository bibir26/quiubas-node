# Quiubas NodeJS Library

## Installation

`npm install quiubas`

## API Overview

Every resource is accessed via your `quiubas` instance:

```js
var quiubas = require('quiubas');
// quiubas.{ RESOURCE_NAME }.{ METHOD_NAME }
```

The last two arguments of every resource method is the `success` and `error` method, if no `error` is specified and an error occurs a `throw` will shown instead.

## Send an SMS
```js
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

