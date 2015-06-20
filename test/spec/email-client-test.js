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

describe('Email Client Modules - Build Email List', function() {
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

    it('Should is buildEmailList correctly', function() {
        var result = emailClient.buildList(jsonValueOk);

        expect(result).toContain("Paulette Parker</div>");
        expect(result).toContain("1433688138</div>");
        expect(result).toContain("Britney Swanson</div>");
        expect(result).toContain("1434247931</div>");
    });

    it('Should is buildEmailList empty', function() {
        var result = emailClient.buildList([]);
        expect(result).toContainText("");

        result = emailClient.buildList();
        expect(result).toContainText("");

        result = emailClient.buildList(undefined);
        expect(result).toContainText("");
    });
});