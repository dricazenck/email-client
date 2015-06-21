var dateNow = new Date().getTime();

var jsonValueOk = [{
    "content": "Laboris ea eiusmod consectetur .\r\n",
    "subject": "Sub1",
    "fromEmail": "paulette_parker@gmail.com",
    "fromName": "Paulette Parker",
    "dateReceived": 1434813798485,
    "_id": "558070eecadb84b2cd4d5ee2"
}, {
    "content": "Fugiat amet dolore enim magna.\r\n",
    "subject": "Sub2",
    "fromEmail": "britney_swanson@gmail.com",
    "fromName": "Britney Swanson",
    "dateReceived": 1435052070000,
    "_id": "558070ee57b34805dcfeaf07"
}, {
    "content": "Content3",
    "subject": "Subject3",
    "fromEmail": "fromEmail3@gmail.com",
    "fromName": "fromName3",
    "dateReceived": dateNow,
    "_id": "558070ee"
}];

describe('Email Client Modules - Build Email List', function() {

    it('Should is buildEmailList correctly', function() {
        var result = emailService.buildList(jsonValueOk);

        expect(result).toContain("<li id='558070eecadb84b2cd4d5ee2'>");
        expect(result).toContain("<div class='from-name'>Paulette Parker</div>");
        expect(result).toContain("<div class='subject'>Sub1</div>");
        expect(result).toContain("<li class='email-date'><div>23-06-2015</div></li>");

        expect(result).toContain("<li id='558070ee57b34805dcfeaf07'>");
        expect(result).toContain("<div class='from-name'>Britney Swanson</div>");
        expect(result).toContain("<div class='subject'>Sub2</div>");
        expect(result).toContain("<li class='email-date'><div>20-06-2015</div></li>");

        expect(result).toContain("<li id='558070ee'><div class='email-item'>");
        expect(result).toContain("<div class='from-name'>fromName3</div>");
        expect(result).toContain("<div class='subject'>Subject3</div>");
        expect(result).toContain("<li class='email-date'><div>20-06-2015</div></li>");

        expect(result).toContain("ago</div>");
        expect(result).toContain("<div class='time-ago'>now</div>");
        expect(result).not.toContain("<div class='time-ago'>0 seconds ago</div>");
    });

    it('Should is buildEmailList empty', function() {
        var result = emailService.buildList([]);
        expect(result).toContainText("");

        result = emailService.buildList();
        expect(result).toContainText("");

        result = emailService.buildList(undefined);
        expect(result).toContainText("");
    });
});

describe("Build View HTML to single email", function() {
	var spyEvent;

	beforeEach(function() {
		setFixtures("<p id='email_from'>EMPTY_VALUE1</p>"+
                "<div id='email_received'>EMPTY_VALUE2</div>"+
                "<div id='email_subject'>EMPTY_VALUE3</div>"+
                "<div id='email_content'>EMPTY_VALUE4</div>");
	});

	it("should replace html with email content", function() {
        var content = jQuery('#jasmine-fixtures');
        expect(content).toContainText("EMPTY_VALUE1");
        expect(content).toContainText("EMPTY_VALUE2");
        expect(content).toContainText("EMPTY_VALUE3");
        expect(content).toContainText("EMPTY_VALUE4");

        emailService.buildEmailView(jsonValueOk[0]);

        content = jQuery('#jasmine-fixtures');
        expect(content).toContainText("Britney Swanson");
        expect(content).toContainText("(britney_swanson@gmail.com)");
        expect(content).toContainText("Sub2");
        expect(content).toContainText("Fugiat amet dolore enim magna");

        expect(content).not.toContainText("EMPTY_VALUE1");
        expect(content).not.toContainText("EMPTY_VALUE2");
        expect(content).not.toContainText("EMPTY_VALUE3");
        expect(content).not.toContainText("EMPTY_VALUE4");
	});
});
