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
    "dateReceived": 1435052070000,
    "_id": "558070ee"
}];

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

        emailService.getEmails();
        expect(doneFn).toHaveBeenCalledWith(jsonValueOk);

        var successArgs = doneFn.calls.mostRecent().args[0];
        expect(successArgs).toBe(jsonValueOk);

        request = jasmine.Ajax.requests.mostRecent();
        expect(request.url).toBe("/email-client/assets/emails.json");
        expect(request.method).toBe('GET');
    });

});

describe('Sort and Group By Date validations', function() {
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

    it('Should sort by Date desc', function() {
        var result = emailService.sortByDate(list);
        expect(result[0].data).toBe("24/06/2015");
        expect(result[1].data).toBe("23/06/2015");
        expect(result[2].data).toBe("17/01/1970");
        expect(result[3].data).toBe("17/01/1970");

        result = emailService.sortByDate(list, 'DESC');
        expect(result[0].data).toBe("24/06/2015");
        expect(result[1].data).toBe("23/06/2015");
        expect(result[2].data).toBe("17/01/1970");
        expect(result[3].data).toBe("17/01/1970");
    });

    it('Should sort by Date ASC', function() {
        var result = emailService.sortByDate(list, 'ASC');
        expect(result[0].data).toBe("17/01/1970");
        expect(result[1].data).toBe("17/01/1970");
        expect(result[2].data).toBe("23/06/2015");
        expect(result[3].data).toBe("24/06/2015");
    });

    it('Should sort by Date desc', function() {
        var result2 = emailService.groupByDate(list);

        expect(result2[0].formattedDate).toBe("24-06-2015");
        expect(result2[0].grouped).toBe(true);
        expect(result2[1].formattedDate).toBe("23-06-2015");
        expect(result2[1].grouped).toBe(true);
        expect(result2[2].formattedDate).toBe("17-01-1970");
        expect(result2[2].grouped).toBe(true);
        expect(result2[3].formattedDate).toBe("17-01-1970");
        expect(result2[3].grouped).toBeUndefined();
    });
});
