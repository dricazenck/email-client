var jsonValueOk = [{
    "content": "Laboris ea eiusmod consectetur .\r\n",
    "subject": "aliquip commodo ex nostrud anim ullamco",
    "fromEmail": "paulette_parker@gmail.com",
    "fromName": "Paulette Parker",
    "dateReceived": 1433688138,
    "index": 0,
    "read": false,
    "_id": "558070eecadb84b2cd4d5ee2"
}, {
    "content": "Fugiat amet dolore enim magna.\r\n",
    "subject": "ullamco anim duis minim fugiat nostrud",
    "fromEmail": "britney_swanson@gmail.com",
    "fromName": "Britney Swanson",
    "dateReceived": 1434247931,
    "index": 1,
    "read": false,
    "_id": "558070ee57b34805dcfeaf07"
}];

describe('Email Client Modules - Build Email List', function() {

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