T.add('Comp2', ['Comp3'], function ($wire) {

    var $construct = function () {
        return $public;
    };

    var $public = {

        method: function () {
            console.debug('Comp2::$public.method');
            $wire['Comp3'].method();
        }

    };

    return $construct();

});