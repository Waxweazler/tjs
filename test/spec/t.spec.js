describe('T', function () {

    var createComponent = function (name, dependencies) {
        return {name: name, dependencies: dependencies, clazz: jasmine.createSpy().and.returnValue(name)};
    };

    describe('initializes its components correctly', function () {

        beforeEach(function () {
            this.components = [
                createComponent('COMP_1', ['COMP_2', 'COMP_3']),
                createComponent('COMP_2', ['COMP_3']),
                createComponent('COMP_3', [])
            ];
            this.components.forEach(function (component) {
                T.add(component.name, component.dependencies, component.clazz);
            });
        });

        it('constructs each only once', function () {
            T.initialize();
            this.components.forEach(function (component) {
                expect(component.clazz.calls.count()).toBe(1);
            });
        });

        it('wires each dependency', function () {
            T.initialize();
            this.components.forEach(function (component) {
                component.dependencies.forEach(function (dependency) {
                    expect(component.clazz.calls.mostRecent().args[0][dependency]).toBe(dependency);
                });
            });
        });

    });

    describe('provides components for external scripts', function () {

        beforeEach(function () {
            this.component = createComponent('COMP_4', []);
            T.add(this.component.name, this.component.dependencies, this.component.clazz);
        });

        it('constructs components on demand', function () {
            expect(T.get(this.component.name)).toBe(this.component.name);
        });

        it('throws error for non-existing components', function () {
            expect(function () {
                T.get("NOT_EXISTING_COMP");
            }).toThrowError(TypeError);
        });

    });

});