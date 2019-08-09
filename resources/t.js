var T = (function ($) {

    var $construct = function () {
        return $public;
    };

    var $private = {

        components: {},

        build: function (name) {
            T.util.log('T::build::' + name);
            var component = $private.components[name];
            if (!component.instance) {
                $private.autowire(component);
                $private.construct(component);
            }
            return component.instance;
        },

        autowire: function (component) {
            component.dependencies.forEach(function (dependency) {
                T.util.log('T::autowire::' + dependency + '->' + component.name);
                component.autowire[dependency] = $private.build(dependency);
            });
        },

        construct: function (component) {
            T.util.log('T::construct::' + component.name);
            component.instance = component.clazz(component.autowire);
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
                name: name, dependencies: dependencies, clazz: clazz, autowire: {}, instance: null
            };
        },

        util: {

            log: function () {
                /debug/.test(window.location.search) && window.console
                && window.console.log.apply(null, arguments);
            }

        }

    };

    return $construct();

})(window.jQuery);

$(T.initialize);