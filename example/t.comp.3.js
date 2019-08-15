T.add('Comp3', [], function () {

    var $construct = function () {
        return $public;
    };

    var $public = {

        method: function () {
            T.log('method', {component: 'Comp3'});
        }

    };

    return $construct();

}, true);