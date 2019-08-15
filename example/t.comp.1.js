T.add('Comp1', ['Comp2', 'Comp3'], function ($wire) {

    var $construct = function () {
        $private.registerEventHandler();
        return $public;
    };

    var $private = {

        registerEventHandler: function () {
            $(document).on('click', $private.handleEvent);
        },

        handleEvent: function () {
            $wire['Comp2'].method();
            $wire['Comp3'].method();
        }

    };

    var $public = {};

    return $construct();

});