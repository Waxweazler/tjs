var T = (function ($) {

    var $construct = function () {
        return $public;
    };

    var $private = {

        components: {},

        build: function () {
            $.each($private.components, $private.construct);
        },

        construct: function (name) {
            var component = $private.get(name);
            $private.autowire(component);
            component.instance = component.instance || component.clazz(component.autowire);
            return component.instance;
        },

        autowire: function (component) {
            $.each(component.dependencies, function () {
                component.autowire[this] = $private.construct(this);
            });
        },

        get: function (name) {
            return $private.components[name];
        }

    };

    var $public = {

        initialize: function () {
            $private.build();
        },

        add: function (name, dependencies, clazz) {
            console.debug('T::add::' + name);
            $private.components[name] = {
                dependencies: dependencies, clazz: clazz, autowire: {}, instance: null
            };
        }

    };

    return $construct();

})(window.jQuery);

$(T.initialize);