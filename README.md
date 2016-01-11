# Quiubas NodeJS Library

## Installation

`npm install quiubas`

## API Overview

Every resource is accessed via your `quiubas` instance:

```js
var quiubas = require('quiubas');
// quiubas.{ RESOURCE_NAME }.{ METHOD_NAME }
```

Every resource method accepts an optional callback as the last argument:

```js
quiubas.sms.send(
  {
  	to_number: '+52552123524',
  	message: 'Hello there'
  },
  function(err, sms) {
    err; // null if no error occurred
    sms; // the created sms object
  }
);
```

