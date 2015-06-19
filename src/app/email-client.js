var emailClient = (function(jQuery) {

    var URL_SERVER = "/email-client/assets/emails.json";
    var emails = [];
    var emailList = jQuery("#email-list");

    var init = function() {
        loadEmails();
    };

    var getEmails = function(callback) {
        jQuery.getJSON(URL_SERVER, function(emails) {
                callback(emails);
            })
            .fail(function() {
                callback([]);
            });
    };

    var loadEmails = function() {
        var templateEmails = "<li><div>FROM_NAME</div><div>TIME_AGO</div><div>SUBJECT</div></li>";
        
        getEmails(function(emails) {
            emailList.html("<div>E-mails:" + emails.length + "</div>");
        });

        return emails;
    };

    return {
        init: init
    };

}(jQuery));