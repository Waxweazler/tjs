var T = (function () {

    var $construct = function () {
        return $public;
    };

    var $private = {

        components: {},

        build: function (name) {
            var component = $private.components[name];
            if (!component.instance) {
                T.log('T::build::' + name);
                $private.wire(component);
                $private.construct(component);
            }
            return component.instance;
        },

        wire: function (component) {
            component.dependencies.forEach(function (dependency) {
                T.log('T::wire::' + dependency + '->' + component.name);
                component.wire[dependency] = $private.build(dependency);
            });
        },

        construct: function (component) {
            T.log('T::construct::' + component.name);
            component.instance = component.clazz(component.wire);
        }

    };

    var $public = {

        initialize: function () {
            T.log('T::initialize');
            Object.keys($private.components).forEach($private.build);
        },

        add: function (name, dependencies, clazz) {
            T.log('T::add::' + name);
            $private.components[name] = {
                name: name, dependencies: dependencies, clazz: clazz, wire: {}, instance: null
            };
        },

        get: function (name) {
            T.log('T::get::' + name);
            return $private.build(name);
        },

        log: function () {
            /debug/.test(window.location.search)
            && window.console && window.console.log.apply(null, arguments);
        }

    };

    return $construct();

})();

document.addEventListener('DOMContentLoaded', T.initialize);
