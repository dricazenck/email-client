var emailClient = (function(jQuery, emailApi) {

    var PATH_PARTIALS = "assets/partials/",
        emails = [];

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

    var loadEmails = function() {

        emailApi.getEmails(function(emails) {
            jQuery("#email-list").html(buildEmailList(emails));
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

    return {
        init: init,
        buildList: buildEmailList
    };

}(jQuery, emailApi));