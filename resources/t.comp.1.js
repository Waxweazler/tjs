T.add('Comp1', ['Comp2', 'Comp3'], function ($autowire) {

    var $construct = function () {
        console.debug('Comp1::$construct');
        $private.registerEventHandler();
        return $public;
    };

    var $private = {

        registerEventHandler: function () {
            $(document).on('click', $private.handleEvent);
        },

        handleEvent: function () {
            $autowire['Comp2'].method();
            $autowire['Comp3'].method2();
        }

    };

    var $public = {};

    return $construct();

});