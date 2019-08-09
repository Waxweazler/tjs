T.add('Comp2', ['Comp3'], function ($autowire) {

    var $construct = function () {
        return $public;
    };

    var $public = {

        method: function () {
            console.debug('Comp2::$public.method');
            $autowire['Comp3'].method();
        }

    };

    return $construct();

});