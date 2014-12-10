# JSONKey [![Build Status](https://travis-ci.org/georgeOsdDev/jsonkey.svg?branch=master)](https://travis-ci.org/georgeOsdDev/jsonkey)[![npm version](https://badge.fury.io/js/jsonkey.svg)](http://badge.fury.io/js/jsonkey)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/georgeosddev_jsonkey.svg)](https://saucelabs.com/u/georgeosddev_jsonkey)

Promised json key search.

## Usage

### In Browser
```html
<script src="path/to/jsonkey/dist/jsonkey_bundle.js"></script>
```
`JSONKey` will be installed to global.


### In Node.js
```javascript
var JSONKey = require("jsonkey");
```


## API

### Constructor

```javascript
var parser = new JSONKey(/*timeout: Number*/);
```
Create a json parser.

#### params

 * `timeout` :Number :Optional(Default 100)
   All promise created by `key` method will be rejected when specified milliseconds was past before key was found.

### key

```javascript
var findingName = parser.key(/*key: String*/);
```

Create promise for value corresponding to specified key.

#### params

 * `key` :String :Required
   You can use dot notation for nested object and brackets for array index.

#### example

```javascript

parser.key("name.last")
      .then(function(value){
         console.log("LastName is " + value);
      });

parser.key("favorites[0]")
      .then(function(value){
         console.log("Fist favorite is " + value);
      })
parser.key("address")
      .then(function(value){
         console.log(value);
      },function(){
         console.log("address is not found");
      })

var jsonString = JSON.stringify({
   name:{
      last:"aaa",
      first:"bbb"
   },
   age:50,
   favorites:["book","beer"]
});
parser.parse(jsonString);
// "LastName is aaa"
// "Fist favorite is book"
// "address is not found"
```

### as

```javascript
var findingName = parser.key(/*key: String*/).as(/*predicate*/);
```

Create promise for value corresponding to specified key then chain it to predicate.

#### params

* `predicate` :Function :Required
   If this parameter is not `function`, `===` operator is applyed.

#### example

```javascript

  var parser = new JSONKey();
  var agePromise = parser.key("age")

  agePromise
  .as(function(age){
     return age <= 10;
  })
  .then(function(value){
     console.log("He is younger than 10");
  });

  agePromise
  .as(function(age){
     return age > 10;
  })
  .then(function(value){
     console.log("He is older than 10");
  });

  var jsonString = JSON.stringify({
    name:{
       last:"aaa",
       first:"bbb"
    },
    age:50,
    favorites:["book","beer"]
  });
  parser.parse(jsonString);
  // "He is older than 10"
```

### on, once, addListener, etc

`JSONKey` inherits Node.js's build in `EventEmitter`.
So parser works as `EventEmitter` itself.
Each key in jsonString will be emitted as event.

#### example

```javascript
var parser = new JSONKey();
var parser.on("age", function(age){
  console.log("He is " + age + "years old");
});

var jsonString = JSON.stringify({
  name:{
    last:"aaa",
    first:"bbb"
  },
  age:50,
  favorites:["book","beer"]
});
parser.parse(jsonString);
```


## Development

Install Node.js and NPM.

```bash
git clone git://github.com/georegeosddev/jsonkey.git
cd jsonkey
npm install
npm run-script build
```


## Licence
MIT
