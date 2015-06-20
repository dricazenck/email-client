var emailApi = (function(jQuery) {

    var URL_SERVER = "/email-client/assets/emails.json",
        RESULT_HTML = "<li><div class='from-name'>FROM_NAME</div><div class='time-ago'>TIME_AGO</div><div class='subject'>SUBJECT</div></li>",
        RESULT_DATE_HTML = "<li class='email-date'>F_DATE</li>",
        SEPARATOR = "-",
        EMPTY_VALUE = [];

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
                callback(EMPTY_VALUE);
            }
        });
    };

    var sortByDate = function(result, type) {
        if (result) {

            if (typeof type === 'undefined' || type === 'DESC') {
                return result.sort(function(email1, email2) {
                    return email2.dateReceived - email1.dateReceived;
                });
            } else {
                return result.sort(function(email1, email2) {
                    return email1.dateReceived - email2.dateReceived;
                });
            }

        } else {
            result = EMPTY_VALUE;
        }
    };

    var groupByDate = function(result) {
        result = sortByDate(result);

        var dateGroup;
        var index = "";

        for (index in result) {
            result[index].formattedDate = formatDate(result[index].dateReceived);

            if (dateGroup !== result[index].formattedDate) {
                dateGroup = result[index].formattedDate;
                result[index].grouped = true;
            }
        }

        return result;
    };

    var formatDate = function(time) {
        return new Date(time).toISOString().substr(0, 10).split(SEPARATOR).reverse().join(SEPARATOR);
    };

    var toEmailList = function(emails) {
        emails = groupByDate(emails);

        var result = "";
        var index = "";

        for (index in emails) {
            result += emailToHtml(emails[index]);
        }

        return result;
    };

    var emailToHtml = function(emailItem) {
        if (typeof emailItem.grouped === 'undefined') {
            return RESULT_HTML
                .replace("FROM_NAME", emailItem.fromName)
                .replace("TIME_AGO", formatDate(emailItem.dateReceived))
                .replace("SUBJECT", emailItem.subject);
        } else {
            return RESULT_HTML
                .replace("FROM_NAME", emailItem.fromName)
                .replace("TIME_AGO", formatDate(emailItem.dateReceived))
                .replace("SUBJECT", emailItem.subject)+
                RESULT_DATE_HTML.replace("F_DATE", emailItem.formattedDate);
        }
    };

    return {
        getEmails: getEmails,
        buildList: toEmailList,
        sortByDate: sortByDate,
        groupByDate: groupByDate
    };

}(jQuery));