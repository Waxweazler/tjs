describe('T', function () {

    var createComponent = function (name, dependencies, immediate) {
        return {
            name: name,
            dependencies: dependencies,
            clazz: jasmine.createSpy().and.returnValue(name),
            immediate: immediate
        };
    };

    describe('initializes its components correctly', function () {

        beforeEach(function () {
            this.components = [
                createComponent('COMP_1', ['COMP_2', 'COMP_3']),
                createComponent('COMP_2', ['COMP_3']),
                createComponent('COMP_3', [])
            ];
            this.components.forEach(function (component) {
                T.add(component.name, component.dependencies, component.clazz, component.immediate);
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

    describe('adds components to the management', function () {

        it('without build', function () {
            var component = createComponent('COMP_10', [], false);
            T.add(component.name, component.dependencies, component.clazz, component.immediate);
            expect(component.clazz).not.toHaveBeenCalled();
        });

        it('builds immediately', function () {
            var component = createComponent('COMP_11', [], true);
            T.add(component.name, component.dependencies, component.clazz, component.immediate);
            expect(component.clazz).toHaveBeenCalled();
        });

    });

    describe('provides components for external scripts', function () {

        it('constructs on demand', function () {
            var component = createComponent('COMP_20', []),
                result;
            T.add(component.name, component.dependencies, component.clazz, component.immediate);
            result = T.get(component.name);
            expect(result).toBe(component.name);
            expect(component.clazz).toHaveBeenCalled();
        });

        it('throws error for non-existing', function () {
            expect(function () {
                T.get("NON_EXISTING_COMP");
            }).toThrowError(TypeError);
        });

    });

});