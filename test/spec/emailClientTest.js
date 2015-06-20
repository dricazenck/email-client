describe("default test initial config values", function() {
	jasmine.getFixtures().fixturesPath = 'spec/fixtures/';

    it("should set 'jasmine-fixtures' as the default container id", function() {
        expect(jasmine.getFixtures().containerId).toEqual('jasmine-fixtures');
    });

    it("should set spec/fixtures/ as the default fixtures path", function() {
        expect(jasmine.getFixtures().fixturesPath).toEqual('spec/fixtures/');
    });
});

describe('Email Client Spec Modules', function() {
	
	it('Should init emailClient', function() {
		expect(emailClient).toBeDefined();
	});

});