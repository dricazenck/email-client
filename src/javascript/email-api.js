var emailApi = (function(jQuery) {

    var URL_SERVER = "/email-client/assets/emails.json";

    var emails = [];
    
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

    return {
        getEmails: getEmails
    };

}(jQuery));