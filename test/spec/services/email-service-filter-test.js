describe('Email Service Filter validations', function() {
    var jsonEmail = [{
        "index": 0,
        "read": false,
        "_id": "558070eecadb84b2cd4d5ee2"
    }, {
        "index": 1,
        "read": false,
        "_id": "558070ee57b34805dcfeaf07"
    }, {
        "index": 2,
        "read": true,
        "_id": "558070ee"
    }];

    it('Should not filter whithout attributes to filter', function() {
        expect(emailService.filter(jsonEmail)).toBe(jsonEmail);
    });

    it('Should filter by read emails', function() {
        var result = emailService.filter(jsonEmail, "read");
        expect(result.length).toBe(1);
        expect(result[0].read).toBe(true);
        expect(result[0].index).toBe(2);
        expect(result[0]._id).toBe("558070ee");
    });

    it('Should filter by unread emails', function() {
        var result = emailService.filter(jsonEmail, "unread");
        expect(result.length).toBe(2);
        expect(result[0].read).toBe(false);
        expect(result[0]._id).toBe("558070eecadb84b2cd4d5ee2");
        expect(result[1].read).toBe(false);
        expect(result[1]._id).toBe("558070ee57b34805dcfeaf07");
    });
});

describe('Email Service contentById validations', function() {
    var jsonEmail = [{
        "index": 0,
        "read": false,
        "_id": "558070eecadb84b2cd4d5ee2"
    }, {
        "index": 1,
        "read": false,
        "_id": "558070ee57b34805dcfeaf07"
    }, {
        "index": 2,
        "read": true,
        "_id": "558070ee"
    }];

    it('Should filter by read emails', function() {
        var result = emailService.contentById(jsonEmail, "558070ee");
        expect(result).toBeDefined();
        expect(result._id).toBe("558070ee");
        expect(result.read).toBe(true);
        expect(result.index).toBe(2);
    });

    it('Should filter by unread emails', function() {
        var result = emailService.contentById(jsonEmail, "558070eecadb84b2cd4d5ee2");
        expect(result).toBeDefined();
        expect(result._id).toBe("558070eecadb84b2cd4d5ee2");
        expect(result.read).toBe(false);
        expect(result.index).toBe(0);
    });
});

describe('Email Service findByTerm validations', function() {
    var jsonEmail = [{
        "content": "Laboris content ea eiusmod consectetur",
        "subject": "Sub1",
        "fromEmail": "paulette_parker@gmail.com",
        "fromName": "Paulette Parker",
        "dateReceived": 1434813798485,
        "_id": "558070eecadb84b2cd4d5ee2"
    }, {
        "content": "Fugiat amet dolore Content enim magna",
        "subject": "Sub2",
        "fromEmail": "britney_swanson@gmail.com",
        "fromName": "Britney Swanson",
        "dateReceived": 1435052070000,
        "_id": "558070ee57b34805dcfeaf07"
    }, {
        "content": "Content 3",
        "subject": "Subject3",
        "fromEmail": "fromEmail3@gmail.com",
        "fromName": "fromName3",
        "dateReceived": dateNow,
        "_id": "558070ee"
    }];

    it('Should find by term by name', function() {
        var result = emailService.findByTerm(jsonEmail, "Britney");
        expect(result).toBeDefined();
        expect(result.length).toBe(1);
        expect(result[0]._id).toBe("558070ee57b34805dcfeaf07");
        expect(result[0].fromName).toBe("Britney Swanson");
    });

    it('Should find by term by email', function() {
        var result = emailService.findByTerm(jsonEmail, "@gmail.com");
        expect(result).toBeDefined();
        expect(result.length).toBe(3);
        expect(result[0].fromEmail).toBe("paulette_parker@gmail.com");
        expect(result[1].fromEmail).toBe("britney_swanson@gmail.com");
        expect(result[2].fromEmail).toBe("fromEmail3@gmail.com");
    });

    it('Should find by term camelcase in content', function() {
        var result = emailService.findByTerm(jsonEmail, "content");
        expect(result).toBeDefined();
        expect(result.length).toBe(3);
        expect(result[0].content).toBe("Laboris content ea eiusmod consectetur");
        expect(result[1].content).toBe("Fugiat amet dolore Content enim magna");
        expect(result[2].content).toBe("Content 3");
    });
});
