/*! @name@ v@version@ | @homepage@ */
var T = (function () {

    var $construct = function () {
        return $public;
    };

    var $private = {

        components: {},

        build: function (name) {
            var component = $private.components[name];
            if (!component.instance) {
                $public.log('build', {component: component.name});
                $private.wire(component);
                $private.construct(component);
            }
            return component.instance;
        },

        wire: function (component) {
            $.each(component.dependencies, function (index, dependency) {
                $public.log('wire', {dependency: dependency, to: component.name});
                component.wire[dependency] = $private.build(dependency);
            });
        },

        construct: function (component) {
            $public.log('construct', {component: component.name});
            component.instance = component.clazz(component.wire);
        }

    };

    var $public = {

        initialize: function () {
            $.each($private.components, $private.build);
            $public.ready();
        },

        ready: function (handler) {
            handler ? $(document).on('t.ready', handler) : $(document).trigger('t.ready');
        },

        add: function (name, dependencies, clazz, immediate) {
            $private.components[name] = {
                name: name, dependencies: dependencies, clazz: clazz, immediate: immediate, wire: {}, instance: null
            };
            immediate && $private.build(name);
        },

        get: function (name) {
            return $private.build(name);
        },

        log: function () {
            /debug/.test(window.location.search)
            && window.console && window.console.log.apply(window.console, arguments);
        }

    };

    return $construct();

})();

$(T.initialize);