$(document).ready(function () {
    var sideBar = $("#sidebar");
    var sidebarToggleBtn = $('#sidebarCollapse');


    // sideBar.mCustomScrollbar({
    //     theme: "minimal"
    // });

    sidebarToggleBtn.on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('#topbar').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
});