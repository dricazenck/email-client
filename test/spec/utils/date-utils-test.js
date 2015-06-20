describe('Date Utils - formatDate', function() {
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

    it('Should formatDateBrazilian correctly', function() {
        expect(dateUtils.formatDate(1435138470000)).toBe("24-06-2015");
        expect(dateUtils.formatDate(1435052070000)).toBe("23-06-2015");
        expect(dateUtils.formatDate(1434061147)).toBe("17-01-1970");
    });

    it('Should formatDateBrazilian with error', function() {
        var today = dateUtils.formatDate(new Date());

        expect(dateUtils.formatDate()).toBe(today);
        expect(dateUtils.formatDate(undefined)).toBe(today);
        expect(dateUtils.formatDate("17-01-1970")).toBe(today);
        expect(dateUtils.formatDate("")).toBe(today);
    });
});

describe('Date Utils - diff Date', function() {

    var date1 = new Date(2015, 4, 11, 09, 30, 21);

    it('Should diffInSecs is equals', function() {
        var today = new Date();
        expect(dateUtils.diffInSecs(today, today)).toBe(0);
    });

    it('Should diff in secs is 10', function() {
        var date2 = new Date(2015, 4, 11, 09, 30, 31);
        expect(dateUtils.diffInSecs(date1, date2)).toBe(10);
        expect(dateUtils.diffInSecs(date2, date1)).toBe(-10);
    });

    it('Should diff in mins is 5', function() {
        var date2 = new Date(2015, 4, 11, 09, 35, 21);
        expect(dateUtils.diffInSecs(date1, date2)).toBe(5*60);
        expect(dateUtils.diffInSecs(date2, date1)).toBe(-5*60);
    });

    it('Should diff in hors is 3', function() {
        var date2 = new Date(2015, 4, 11, 12, 30, 21);
        expect(dateUtils.diffInSecs(date1, date2)).toBe(3*60*60);
        expect(dateUtils.diffInSecs(date2, date1)).toBe(-3*60*60);
    });
});

describe('Date Utils - diff email', function() {

    var date1 = new Date(2015, 4, 11, 09, 30, 21);

    it('Should diffInSecs is equals', function() {
        var today = new Date();
        expect(dateUtils.differenceEmail(today, today)).toBe("now");
    });

    it('Should differenceEmail return label in secs', function() {
        var date2 = new Date(2015, 4, 11, 09, 30, 23);
        expect(dateUtils.differenceEmail(date1, date2)).toBe("2 seconds ago");

        date2 = new Date(2015, 4, 11, 09, 30, 22);
        expect(dateUtils.differenceEmail(date1, date2)).toBe("1 seconds ago");

        date2 = new Date(2015, 4, 11, 09, 30, 31);
        expect(dateUtils.differenceEmail(date1, date2)).toBe("10 seconds ago");
    });

    it('Should differenceEmail return label in minutes', function() {
        var date2 = new Date(2015, 4, 11, 09, 34, 21);
        expect(dateUtils.differenceEmail(date1, date2)).toBe("4 minutes ago");

        date2 = new Date(2015, 4, 11, 09, 34, 27);
        expect(dateUtils.differenceEmail(date1, date2)).toBe("4 minutes ago");
    });

    it('Should differenceEmail return label in hours', function() {
        var date2 = new Date(2015, 4, 11, 18, 30, 21);
        expect(dateUtils.differenceEmail(date1, date2)).toBe("9 hours ago");
    });

    it('Should differenceEmail return label in days', function() {
        var date2 = new Date(2015, 4, 14, 09, 30, 21);
        expect(dateUtils.differenceEmail(date1, date2)).toBe("3 days ago");

        date2 = new Date(2015, 4, 12, 09, 30, 21);
        expect(dateUtils.differenceEmail(date1, date2)).toBe("1 days ago");
    });

    it("Should differenceEmail return label in month", function() {
        var date2 = new Date(2015, 5, 11, 09, 30, 21);
        expect(dateUtils.differenceEmail(date1, date2)).toBe("1 months ago");

        date2 = new Date(2016, 3, 11, 09, 30, 21);
        expect(dateUtils.differenceEmail(date1, date2)).toBe("11 months ago");
    });

    it('Should differenceEmail return label in years', function() {
        var date2 = new Date(2017, 5, 11, 09, 30, 21);
        expect(dateUtils.differenceEmail(date1, date2)).toBe("2 years ago");

        date2 = new Date(2016, 9, 11, 09, 30, 21);
        expect(dateUtils.differenceEmail(date1, date2)).toBe("1 years ago");
    });
});
