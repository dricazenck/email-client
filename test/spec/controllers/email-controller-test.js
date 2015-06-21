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

describe("Button Click Event Checkbox", function() {
	var spyEvent;

	beforeEach(function() {
		setFixtures("<div id='email-list'></div>"+
            "<input type='checkbox' id='read' name='read' value='read'> Read"+
            "<input type='checkbox' id='unread' name='unread' value='unread'> Unread");
	});

	it("should invoke the read click event.", function() {
        emailClient.initEvents();
        var readButton = jQuery('#read');
        var unreadButton = jQuery('#unread');

		spyEvent = spyOnEvent('#read', 'click');
        readButton.trigger("click");

		expect('click').toHaveBeenTriggeredOn('#read');
		expect(spyEvent).toHaveBeenTriggered();
        expect(readButton).toBeChecked();
        expect(unreadButton).not.toBeChecked();

        //again for uncheck button
        unreadButton.prop("checked", true);
        spyEvent = spyOnEvent('#read', 'click');
        readButton.trigger("click");

		expect('click').toHaveBeenTriggeredOn('#read');
		expect(spyEvent).toHaveBeenTriggered();
        expect(readButton).not.toBeChecked();
        expect(unreadButton).not.toBeChecked();
	});

    it("should invoke the unread click event.", function() {
        emailClient.initEvents();
        var readButton = jQuery('#read');
        var unreadButton = jQuery('#unread');

		spyEvent = spyOnEvent('#unread', 'click');
        unreadButton.trigger("click");

		expect('click').toHaveBeenTriggeredOn('#unread');
		expect(spyEvent).toHaveBeenTriggered();
        expect(unreadButton).toBeChecked();
        expect(readButton).not.toBeChecked();

        //again for uncheck buttom
        readButton.prop("checked", true);
        spyEvent = spyOnEvent('#unread', 'click');
        unreadButton.trigger("click");

		expect('click').toHaveBeenTriggeredOn('#unread');
		expect(spyEvent).toHaveBeenTriggered();
        expect(unreadButton).not.toBeChecked();
        expect(readButton).not.toBeChecked();
	});
});
