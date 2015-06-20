describe("default test initial config values", function() {
    jasmine.getFixtures().fixturesPath = 'spec/fixtures/';

    it("should set 'jasmine-fixtures' as the default container id", function() {
        expect(jasmine.getFixtures().containerId).toEqual('jasmine-fixtures');
    });

    it("should set spec/fixtures/ as the default fixtures path", function() {
        expect(jasmine.getFixtures().fixturesPath).toEqual('spec/fixtures/');
    });
});

describe('Email Client Modules - Init', function() {

    it('Should load emailClient', function() {
        expect(emailClient).toBeDefined();
    });
});
