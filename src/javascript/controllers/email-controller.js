var emailClient = (function(jQuery, emailService) {

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

        emailService.getEmails(function(emails) {
            jQuery("#email-list").html(emailService.buildList(emails));
        });

    };

    return {
        init: init
    };

}(jQuery, emailService));
