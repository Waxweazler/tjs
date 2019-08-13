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
                expect(component.clazz).toHaveBeenCalledTimes(1);
            });
        });

        it('wires each dependency', function () {
            T.initialize();
            this.components.forEach(function (component) {
                var expectedWire = {};
                component.dependencies.forEach(function (dependency) {
                    expectedWire[dependency] = dependency;
                });
                expect(component.clazz).toHaveBeenCalledWith(expectedWire);
            });
        });

        it('fires a custom event when finished', function () {
            var spyEventHandler = jasmine.createSpy();
            T.ready(spyEventHandler);
            expect(spyEventHandler).not.toHaveBeenCalled();
            T.initialize();
            expect(spyEventHandler).toHaveBeenCalled();
        });

    });

    describe('provides components for external scripts', function () {

        beforeEach(function () {
            this.component = createComponent('COMP_4', []);
            T.add(this.component.name, this.component.dependencies, this.component.clazz);
        });

        it('constructs on demand', function () {
            expect(T.get(this.component.name)).toBe(this.component.name);
        });

        it('throws error for non-existing', function () {
            expect(function () {
                T.get("NOT_EXISTING_COMP");
            }).toThrowError(TypeError);
        });

    });

});