var dateUtils = (function(jQuery) {

    var SEPARATOR = "-",
        MINUTE = 60,
        HOURS = MINUTE * 60,
        DAY = HOURS * 24,
        MONTH = DAY * 30,
        YEAR = MONTH * 12;

    var formatDateBrazilian = function(time) {

        var date = new Date(time);
        if (date.toString() === 'Invalid Date') {
            date = new Date();
        }

        return date.toISOString().substr(0, 10).split(SEPARATOR).reverse().join(SEPARATOR);
    };

    var formatDateTime = function(time) {
        var options = {year: 'numeric', month: 'long', day: '2-digit',
                        hour: '2-digit', minute: 'numeric' };

        var date = new Date(time);
        if (date.toString() === 'Invalid Date') {
            date = new Date();
        }

        return date.toLocaleString(options);
    };

    var differenceInSecs = function(_initial, _final) {

        return (_final.getTime() - _initial.getTime())/1000;
    };

    var differenceEmail = function(_initial, _final) {
        var difference =  differenceInSecs(_initial, _final);

        if (difference < 1 ) {
            return "now";
        }else if (difference > 0 && difference < MINUTE) {
            return Math.floor(difference) + " seconds ago";
        } else if (difference >= MINUTE && difference < HOURS) {
            return Math.floor(difference / MINUTE) + " minutes ago";
        } else if (difference >= HOURS && difference < DAY) {
            return Math.floor(difference / HOURS) + " hours ago";
        } else if (difference >= DAY && difference < MONTH) {
            return Math.floor(difference / DAY) + " days ago";
        } else if (difference >= MONTH && difference < YEAR) {
            return Math.floor(difference / MONTH) + " months ago";
        } else {
            return Math.floor(difference / YEAR) + " years ago";
        }
    };

    return {
        formatDate: formatDateBrazilian,
        diffInSecs: differenceInSecs,
        differenceEmail: differenceEmail,
        formatDateTime: formatDateTime
    };

}(jQuery));
