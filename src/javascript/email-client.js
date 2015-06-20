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
            jQuery("#email-list").html(emailApi.buildList(emails));
        });

    };

    return {
        init: init
    };

}(jQuery, emailApi));