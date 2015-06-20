var emailClient = (function(jQuery) {

    var URL_SERVER = "/email-client/assets/emails.json", 
        PATH_PARTIALS = "assets/partials/";

    var emails = [];
    
    var init = function() {
        loadInitPagesComponents();
        loadEmails();
    };

    var loadInitPagesComponents = function() {
        loadPage("#menu", "menu.html");
        loadPage("#emails", "emails.html");
        loadPage("#email", "view_empty.html");
    };

    var loadPage = function(content, pageName) {
        jQuery(content).load(PATH_PARTIALS + pageName);
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
            jQuery("#email-list").html(buildEmailList(emails));
        });

    };

    return {
        init: init,
        buildList: buildEmailList
    };

}(jQuery));