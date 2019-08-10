T.add('Comp3', [], function () {

    var $construct = function () {
        return $public;
    };

    var $public = {

        method: function () {
            console.debug('Comp3::$public.method');
        },

        method2: function () {
            console.debug('Comp3::$public.method2');
        }

    };

    return $construct();

});