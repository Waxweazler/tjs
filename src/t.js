var T = (function () {

    var $construct = function () {
        return $public;
    };

    var $private = {

        components: {},

        build: function (name) {
            var component = $private.components[name];
            if (!component.instance) {
                T.util.log('T::build::' + name);
                $private.wire(component);
                $private.construct(component);
            }
            return component.instance;
        },

        wire: function (component) {
            component.dependencies.forEach(function (dependency) {
                T.util.log('T::wire::' + dependency + '->' + component.name);
                component.wire[dependency] = $private.build(dependency);
            });
        },

        construct: function (component) {
            T.util.log('T::construct::' + component.name);
            component.instance = component.clazz(component.wire);
        }

    };

    var $public = {

        initialize: function () {
            T.util.log('T::initialize');
            $.each($private.components, $private.build);
        },

        add: function (name, dependencies, clazz) {
            T.util.log('T::add::' + name);
            $private.components[name] = {
                name: name, dependencies: dependencies, clazz: clazz, wire: {}, instance: null
            };
        },

        get: function (name) {
            T.util.log('T::get::' + name);
            return $private.build(name);
        },

        util: {

            log: function () {
                /debug/.test(window.location.search) && window.console
                && window.console.log.apply(null, arguments);
            }

        }

    };

    return $construct();

})();

$(T.initialize);