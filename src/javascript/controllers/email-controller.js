var emailClient = (function(jQuery, emailService) {

    var PATH_PARTIALS = "assets/partials/",
        emails = [],
        emailContent = {};

    var init = function() {
        loadInitPagesComponents();
        loadEmails();
    };

    var defineHeight = function() {
        var availableHeight = jQuery(window).height() - jQuery("#menu").height();
        jQuery(".container-emails").css("height", availableHeight+"px");
        jQuery(".container-content").css("height", availableHeight+"px");
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
            loadEventEmails();
            defineHeight();
        });
    };

    var loadInitPagesComponents = function() {
        loadPage("#menu", "menu.html");
        loadPage("#emails", "emails.html");
        loadPage("#email", "view_empty.html");
    };

    var loadPage = function(content, pageName, callback) {
        jQuery(content).load(PATH_PARTIALS + pageName, function() {
            if (callback) {
                callback();
            }
        });
    };

    var loadEventEmails = function() {
        var emailsList = jQuery("#email-list li");

        emailsList.click(function() {
            if (this.id !== "") {
                emailContent = emailService.contentById(emails, this.id);

                loadPage("#email", "view_email.html", function() {
                    emailService.buildEmailView(emailContent);
                    defineHeight();
                });
            }
        });

        jQuery(window).resize(defineHeight);
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

    return {
        init: init,
        initEvents: initEventsMenu,
    };

}(jQuery, emailService));
