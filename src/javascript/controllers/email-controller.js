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

    var loadEventEmails = function(){
        var emailsList = jQuery("#email-list li");

        emailsList.click(function() {
            console.log("ID.. "+this.id);
        });
    };

    var initEventsMenu = function() {
        var readButtom = jQuery("#read");
        var unreadButtom = jQuery("#unread");

        readButtom.change(function() {
            unreadButtom.prop("checked", false);
            if (this.checked) {
                loadEmails("read");
            } else {
                loadEmails();
            }
        });

        unreadButtom.change(function() {
            readButtom.prop( "checked", false);
            if(this.checked) {
                loadEmails("unread");
            } else {
                loadEmails();
            }
        });
    };

    var loadEmails = function(filter) {
        emailService.getEmails(function(data) {
            if (data) {
                emails = emailService.filter(data,filter);
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
