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
