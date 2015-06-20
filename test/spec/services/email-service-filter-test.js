
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
        expect(emailService.filterBy(jsonEmail)).toBe(jsonEmail);
    });

    it('Should filter by read emails', function() {
        var result = emailService.filterBy(jsonEmail, "read");
        expect(result.length).toBe(1);
        expect(result[0].read).toBe(true);
        expect(result[0].index).toBe(2);
        expect(result[0]._id).toBe("558070ee");
    });

    it('Should filter by unread emails', function() {
        var result = emailService.filterBy(jsonEmail, "unread");
        expect(result.length).toBe(2);
        expect(result[0].read).toBe(false);
        expect(result[0]._id).toBe("558070eecadb84b2cd4d5ee2");
        expect(result[1].read).toBe(false);
        expect(result[1]._id).toBe("558070ee57b34805dcfeaf07");
    });
});
