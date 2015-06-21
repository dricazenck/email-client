var emailClient = (function(jQuery, emailService) {

    var PATH_PARTIALS = "assets/partials/",
        ENTER_KEY = 13,
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

    var loadEmails = function(filter, term) {
        emailService.getEmails(function(data) {
            if (data) {
                emails = emailService.filter(data,filter, term);
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
        loadPage("#menu", "menu.html", initEventsMenu);
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


                jQuery(".email-sected").removeClass("email-sected");
                jQuery("#"+this.id).find(".email-item").addClass("email-sected");

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
        var inputSearch = jQuery("#search-input");
        var searchButtom = jQuery("#search-button");

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

        searchButtom.click(function() {
            runSearch(inputSearch.val());
        });

        inputSearch.keypress(function (e) {
            if (e.which === ENTER_KEY) {
                runSearch(inputSearch.val());
            }
        });
    };

    var runSearch = function(term) {
        if (term.trim().length > 0) {
            loadEmails("search", term.trim());
        }
    };

    return {
        init: init,
        initEvents: initEventsMenu,
    };

}(jQuery, emailService));
