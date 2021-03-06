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
		setFixtures("div id=\"filters\"></div>"+
            "<div id=\"filters-menu\"><input type='checkbox' id='read' name='read' value='read'> Read"+
            "<input type='checkbox' id='unread' name='unread' value='unread'> Unread </div>");
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

describe("Button Click Event Checkbox", function() {
	var spyEvent;

	beforeEach(function() {
		setFixtures("<input id='search-input' type='text' value='value to search'>"+
					"<button type='button' id='search-button'></button>");
	});

	it("should invoke the read click event.", function() {
        emailClient.initEvents();
        var button = jQuery('#search-button');
        var input = jQuery('#search-input');

		spyEvent = spyOnEvent('#search-button', 'click');
		button.trigger("click");

		expect('click').toHaveBeenTriggeredOn('#search-button');
		expect(spyEvent).toHaveBeenTriggered();
		expect(input.val()).toBe('value to search');

		//do nothing
		input.val("");
		spyEvent = spyOnEvent('#search-button', 'click');
		button.trigger("click");

		expect('click').toHaveBeenTriggeredOn('#search-button');
		expect(spyEvent).toHaveBeenTriggered();
		expect(input.val()).toBe('');
	});
});

describe("Button Click Event to select one email to show", function() {
	var spyEvent;

	beforeEach(function() {
		setFixtures("<div id='email-list'><ul><li id='1234' class='email-sected'></li><ul></div");
	});

	it("should invoke the read click event.", function() {
        emailClient.loadEventEmails();
        var button = jQuery('#email-list li');
		var itemSelected = jQuery("#1234");
		expect(itemSelected.hasClass("email-sected")).toBe(true);

		spyEvent = spyOnEvent('#email-list li', 'click');
		button.trigger("click");

		expect(itemSelected.hasClass("email-sected")).toBe(false);
	});
});
