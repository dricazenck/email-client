var emailClient = (function(jQuery) {

    var URL_SERVER = "/email-client/assets/emails.json";
    var emails = [];
    var emailList = jQuery("#email-list");

    var init = function() {
        loadEmails();
    };

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

    var buildEmailList = function(emails) {
        var templateEmails = "<li><div class='from-name'>FROM_NAME</div><div class='time-ago'>TIME_AGO</div><div class='subject'>SUBJECT</div></li>";
        var result = "";
        var index = "";

        for (index in emails) {
            result += templateEmails
                .replace("FROM_NAME", emails[index].fromName)
                .replace("TIME_AGO", emails[index].dateReceived)
                .replace("SUBJECT", emails[index].subject);
        }

        return result;
    };

    var loadEmails = function() {

        getEmails(function(emails) {
            emailList.html(buildEmailList(emails));
        });
    };

    return {
        init: init,
        buildList: buildEmailList
    };

}(jQuery));