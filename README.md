# t.comp
Simple JS structure framework.

## build
Building is done with the help of [UglifyJS](https://github.com/mishoo/UglifyJS2).
A ready-to-use "production ready" version can be found inside the [dist](dist) folder.
```
npm run build
```

## test
Tests are realized with the help of [Jasmine](https://github.com/jasmine/jasmine)
and [Karma](https://github.com/karma-runner/karma) and can be executed via CLI.
```
npm run test
```

## component
The structure of a component is not completely fixed, but there are some restrictions
and a recommended structure definitely exists, so here is a documentation of it.
```js
T.add('Component', ['Dependency'], function ($wire) {
    
    var $construct = function () {
        $private.method();
        return $public;
    };
    
    var $private = {
        method: function () {
            $wire['Dependency'].method();
        }
    };
    
    var $public = {
        method: function () {
            $private.method();
        }
    };
    
    return $construct();
    
});

T.get('Component').method();
```

## example
Example components can be found inside the [example](example) folder to show off the
recommended structure. If the provided HTML page is called with the special query
parameter *debug* (?debug for example), some informative log messages are printed
to the browser console.