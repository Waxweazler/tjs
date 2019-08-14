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
            component.dependencies.forEach(function (dependency) {
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
            Object.keys($private.components).forEach($private.build);
            $public.ready();
        },

        ready: function (handler) {
            handler ? document.addEventListener('t.ready', handler)
                : document.dispatchEvent(new CustomEvent('t.ready'));
        },

        add: function (name, dependencies, clazz) {
            $private.components[name] = {
                name: name, dependencies: dependencies, clazz: clazz, wire: {}, instance: null
            };
        },

        get: function (name) {
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