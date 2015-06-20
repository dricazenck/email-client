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

    var initEventsMenu = function() {
        var readButtom = jQuery("#read");
        var unreadButtom = jQuery("#unread");

        readButtom.change(function() {
            if (this.checked) {
                loadEmails("read");
                unreadButtom.prop("checked", false);
            } else {
                loadEmails();
            }
        });

        unreadButtom.change(function() {
            if(this.checked) {
                loadEmails("unread");
                readButtom.prop( "checked", false);
            } else {
                loadEmails();
            }
        });
    };

    var loadEmails = function(filter) {

        emailService.getEmails(function(data) {
            if (data) {
                emails = emailService.filterBy(data,filter);
            } else {
                emails = data;
            }

            jQuery("#email-list").html(emailService.buildList(emails));
            jQuery("#result").html(emails.length+" conversations");
        });

    };

    return {
        init: init,
        initEvents: initEventsMenu,
    };

}(jQuery, emailService));
