$(document).ready(function () {
    var sideBar = $("#sidebar");
    var sidebarToggleBtn = $('#sidebarCollapse');
    var prettyTimer = $('.pretty-timers');
    var caret = $('.caret');
    var nav = $('.site-nav');

    function timeSince(d) {
        var now = moment(new Date())
        var d = moment(new Date(d)).format("YYYY-MM-DD HH:mm:ss");
        var duration = moment.duration(now.diff(d));
        var since = ""

        if (parseFloat(duration._data.days) != 0) {
            since = Math.floor(duration.asDays()).toString() + " Days Ago";
            console.log(since);
            return since;
        }

        if (parseFloat(duration._data.days) == 0 && parseFloat(duration._data.hours) != 0) {
            since = Math.floor(duration.asHours()).toString() + " Hours Ago";;
            return since
        }

        if (parseFloat(duration._data.days) == 0 && parseFloat(duration._data.hours) == 0 && parseFloat(duration._data.minutes) != 0) {
            since = Math.floor(duration.asMinutes()).toString() + " Minutes Ago";
            console.log(since);
            return since;
        }

        if (parseFloat(duration._data.days) == 0 && parseFloat(duration._data.hours) == 0 && parseFloat(duration._data.minutes) == 0 && parseFloat(duration._data.seconds) != 0) {
            since = Math.floor(duration.asSeconds()).toString() + " Seconds Ago";
            console.log(since);
            return since;
        }
        else {
            console.log(since);
            return since = "Recently"
        }
    }

    for (var n = 0; n < prettyTimer.length; n++) {
        var r = timeSince($(prettyTimer[n]).html());
        $(prettyTimer[n]).html(r);
    }

    if ($(document).scrollTop() > 35) {
        nav.addClass('over');
    } else if ($(document).scrollTop() == 0) {
        nav.removeClass('over');
    } else {
        nav.removeClass('over');
    }

    //Function to handle document on scroll event
    $(document).scroll(function (event) {
        var st = $(this).scrollTop();
        if (st > 35) {
            nav.addClass('over');
        } else if (st == 0) {
            nav.removeClass('over');
        } else {
            nav.removeClass('over');
        }
    });


    // sideBar.mCustomScrollbar({
    //     theme: "minimal"
    // });

    sidebarToggleBtn.on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('#topbar').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    caret.on("click", function (e) {
        var key = "#par-" + $(this).attr("data-id");
        console.log(key)
        $(key).toggleClass("deactivated");
        console.log($(key));

        if ($(key).hasClass("deactivated")) {
            $(this).removeClass("fa-angle-up");
            caret.addClass("fa-angle-down");
        } else {
            $(this).removeClass("fa-angle-down");
            $(this).addClass("fa-angle-up");
        }
    });


});