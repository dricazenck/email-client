var emailService = (function(jQuery, dateUtils) {

    var URL_SERVER = "assets/emails.json",
        RESULT_HTML = "<li id='ID_EMAIL'><div class='email-item'><div class='from-name'>FROM_NAME</div><div class='time-ago'>TIME_AGO</div><div class='subject'>SUBJECT</div></div></li>",
        RESULT_DATE_HTML = "<li class='email-date'><div>F_DATE</div></li>",
        EMPTY_VALUE = [],
        STRING_SPACE = " ";

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
            result[index].formattedDate = dateUtils.formatDate(result[index].dateReceived);
            result[index].dateReceivedLabel = dateUtils.differenceEmail(new Date(result[index].dateReceived), new Date());

            if (dateGroup !== result[index].formattedDate) {
                dateGroup = result[index].formattedDate;
                result[index].grouped = true;
            }
        }

        return result;
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
                .replace("ID_EMAIL", emailItem._id)
                .replace("FROM_NAME", emailItem.fromName)
                .replace("TIME_AGO", emailItem.dateReceivedLabel)
                .replace("SUBJECT", emailItem.subject);
        } else {
            return RESULT_HTML
                .replace("ID_EMAIL", emailItem._id)
                .replace("FROM_NAME", emailItem.fromName)
                .replace("TIME_AGO", emailItem.dateReceivedLabel)
                .replace("SUBJECT", emailItem.subject)+
                RESULT_DATE_HTML.replace("F_DATE", emailItem.formattedDate);
        }
    };

    var isRead = function (email) {
        return email.read === true;
    };

    var isUnRead = function (email) {
        return email.read === false;
    };

    var filter = function(result, attribute, term) {
        if (attribute === "read") {
            return result.filter(isRead);
        } else if (attribute === "unread"){
            return result.filter(isUnRead);
        } else if (attribute === "search"){
            return findByTerm(result, term);
        } else {
            return result;
        }
    };

    var getContentById = function(result, id) {
        var isSameId = function (email) {
            return email._id === id;
        };

        var item = result.filter(isSameId);
        if (item.length > 0){
            item[0].formattedDate = dateUtils.formatDateTime(item[0].dateReceived);
            return item[0];
        } else {
            return {};
        }
    };

    var findByTerm = function(result, term) {
        if (result) {
            var containTerm = function (email) {
                var fieldsToFind = email.fromName + STRING_SPACE +
                    email.fromEmail + STRING_SPACE +
                    email.subject + STRING_SPACE + email.content;

                return fieldsToFind.toUpperCase().indexOf(term.toUpperCase()) > -1;
            };

            return result.filter(containTerm);
        } else {
            return EMPTY_VALUE;
        }

    };

    var toEmailView = function(emailContent) {
        jQuery("#email_from").html("<label>From: </label>"+emailContent.fromName+" <span>("+emailContent.fromEmail+")</span>");
        jQuery("#email_received").html("<label>Received: </label>"+emailContent.formattedDate);
        jQuery("#email_subject").html("<label>Subject: </label>"+emailContent.subject);
        jQuery("#email_content").html(emailContent.content);
    };

    return {
        getEmails: getEmails,
        buildList: toEmailList,
        buildEmailView: toEmailView,
        sortByDate: sortByDate,
        groupByDate: groupByDate,
        filter: filter,
        contentById: getContentById,
        findByTerm: findByTerm
    };

}(jQuery, dateUtils));
