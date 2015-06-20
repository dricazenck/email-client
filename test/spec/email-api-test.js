var jsonValueOk = [{
    "content": "Laboris ea eiusmod consectetur .\r\n",
    "subject": "aliquip commodo ex nostrud anim ullamco",
    "fromEmail": "paulette_parker@gmail.com",
    "fromName": "Paulette Parker",
    "dateReceived": 1434813798485,
    "index": 0,
    "read": false,
    "_id": "558070eecadb84b2cd4d5ee2"
}, {
    "content": "Fugiat amet dolore enim magna.\r\n",
    "subject": "ullamco anim duis minim fugiat nostrud",
    "fromEmail": "britney_swanson@gmail.com",
    "fromName": "Britney Swanson",
    "dateReceived": 1435052070000,
    "index": 1,
    "read": false,
    "_id": "558070ee57b34805dcfeaf07"
}, ];

describe('tests for getEmails request', function() {

    beforeEach(function() {
        jasmine.Ajax.install();
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    it("should return a success request", function() {
        var doneFn = jasmine.createSpy("success");

        jasmine.Ajax.stubRequest('/email-client/assets/emails.json').andReturn({
            "responseText": jsonValueOk
        });

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(args) {
            if (this.readyState == this.DONE) {
                doneFn(this.responseText);
            }
        };

        xhr.open("GET", "/email-client/assets/emails.json");
        xhr.send();

        emailApi.getEmails();
        expect(doneFn).toHaveBeenCalledWith(jsonValueOk);

        var successArgs = doneFn.calls.mostRecent().args[0];
        expect(successArgs).toBe(jsonValueOk);

        request = jasmine.Ajax.requests.mostRecent();
        expect(request.url).toBe("/email-client/assets/emails.json");
        expect(request.method).toBe('GET');
    });

});

describe('Email Client Modules - Build Email List', function() {

    it('Should is buildEmailList correctly', function() {
        var result = emailApi.buildList(jsonValueOk);

        expect(result).toContain("<li><div class='from-name'>Paulette Parker</div>");
        expect(result).toContain("<div class='time-ago'>20-06-2015</div>");
        expect(result).toContain("<div class='subject'>aliquip commodo ex nostrud anim ullamco</div>");
        expect(result).toContain("<li><div class='from-name'>Britney Swanson</div>");
        expect(result).toContain("<div class='time-ago'>23-06-2015</div>");
        expect(result).toContain("<div class='subject'>ullamco anim duis minim fugiat nostrud</div></li>");
    });

    it('Should is buildEmailList empty', function() {
        var result = emailApi.buildList([]);
        expect(result).toContainText("");

        result = emailApi.buildList();
        expect(result).toContainText("");

        result = emailApi.buildList(undefined);
        expect(result).toContainText("");
    });

});

describe('Email Api - Sort By Date', function() {
    var list = [{
        "dateReceived": 1435052070000,
        "data": "23/06/2015"
    }, {
        "dateReceived": 1434327777,
        "data": "17/01/1970"
    }, {
        "dateReceived": 1434061147,
        "data": "17/01/1970"
    }, {
        "dateReceived": 1435138470000,
        "data": "24/06/2015"
    }];

    it('Should is order by Date desc', function() {
        var result = emailApi.sortByDate(list);

        expect(result[0].data).toContain("24/06/2015");
        expect(result[1].data).toContain("23/06/2015");
        expect(result[2].data).toContain("17/01/1970");

        result = emailApi.sortByDate(list, 'DESC');

        expect(result[0].data).toContain("24/06/2015");
        expect(result[1].data).toContain("23/06/2015");
        expect(result[2].data).toContain("17/01/1970");
    });
});