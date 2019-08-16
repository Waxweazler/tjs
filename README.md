# tjs
Lightweight JavaScript structure framework.

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
// each component needs a name for reference and optionally
// a list of dependency names of other components. these
// dependent components are then provided by the $wire argument.
T.add('Component', ['Dependency'], function ($wire) {
   
    // the constructor function is either called during initialization
    // phase (DOMContentLoaded) or on demand if the component is requested
    // manually, but never more than once.
    var $construct = function () {
        $private.method();
        return $public;
    };
    
    // the private object is secured by the closure context and
    // can not be accessed from outside the component instance.
    var $private = {
        method: function () {
            $wire['Dependency'].method();
        }
    };
    
    // the public object will be returned by the constructor function
    // and is thereby accessible if the component is requested.
    var $public = {
        method: function () {
            $private.method();
        }
    };
    
    // returns the public object as the instance.
    return $construct();
    
});

// request a component manually by its name reference. returns
// either the existing instance or builds a new one on demand.
T.get('Component').method();
```

## example
Example components can be found inside the [example](example) folder to show off the
recommended structure. If the provided HTML page is called with the special query
parameter *debug* (?debug for example), some informative log messages are printed
to the browser console.