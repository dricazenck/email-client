var emailApi = (function(jQuery) {

    var URL_SERVER = "/email-client/assets/emails.json",
        RESULT_HTML = "<li><div class='from-name'>FROM_NAME</div><div class='time-ago'>TIME_AGO</div><div class='subject'>SUBJECT</div></li>",
        SEPARATOR = "-";

    var emails = [];

    var getEmails = function(callback) {
        jQuery.ajax({
            type: 'GET',
            url: URL_SERVER,
            dataType: 'json',
            success: function(results) {
                callback(results);
            },
            fail: function() {
                callback([]);
            }
        });
    };

    var sortByDate = function(emails, type) {
        var emailSorted;

        if (typeof type === 'undefined' || type === 'DESC') {
            emailSorted = emails.sort(function(email1, email2) {
                return email2.dateReceived - email1.dateReceived;
            });
        } else {
            emailSorted =emails.sort(function(email1, email2) {
                return email1.dateReceived - email2.dateReceived;
            });
        }

        return emailSorted;
    };

    var toEmailList = function(emailRequest) {
        var templateEmails = "<li><div class='from-name'>FROM_NAME</div><div class='time-ago'>TIME_AGO</div><div class='subject'>SUBJECT</div></li>";
        var result = "";
        var index = "";

        for (index in emailRequest) {
            result += emailToHtml(emailRequest[index]);
        }

        return result;
    };

    var formatDate = function formattedDate(time) {
        return new Date(time).toISOString().substr(0, 10).split(SEPARATOR).reverse().join(SEPARATOR);
    };

    var emailToHtml = function(emailItem) {

        return RESULT_HTML
            .replace("FROM_NAME", emailItem.fromName)
            .replace("TIME_AGO", formatDate(emailItem.dateReceived))
            .replace("SUBJECT", emailItem.subject);

    };

    return {
        getEmails: getEmails,
        buildList: toEmailList,
        sortByDate: sortByDate
    };

}(jQuery));