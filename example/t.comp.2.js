T.add('Comp2', ['Comp3'], function ($wire) {

    var $construct = function () {
        return $public;
    };

    var $public = {

        method: function () {
            T.log('method', {component: 'Comp2'});
            $wire['Comp3'].method();
        }

    };

    return $construct.call(this);

});