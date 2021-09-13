import { validateNavName } from './validator.js';
import { swalShowError, swalShowLoading } from './helper.js';

jQuery(document).ready(function ($) {
    var addNavLink = $("#navLinkAdd");
    var errorClass = "swal2-validation-message";
    var active = $(".active");
    var edit = $(".edit");
    var plus = $(".plus");
    var remove = $(".remove");


    addNavLink.on("click", async function (e) {
        e.preventDefault();
        e.stopPropagation();


        Swal.fire({
            title: 'Input Nav Link Name',
            input: 'text',
            inputLabel: 'New Nav Link',
            showLoaderOnConfirm: true,
            preConfirm: (link) => {

                var [blah, state, msg] = validateNavName(link);
                if (!state) {
                    swalShowError(msg.message, errorClass);
                } else {
                    return link;
                }
            },
        }).then(function (result) {
            console.log(result);
            var [blah, state, msg] = validateNavName(result.value);
            console.log(blah);

            if (state) {
                let url = "/admin/navbar-links";
                let data = { "name": result.value };

                $.ajax({
                    url: url,
                    data: data,
                    type: "post",
                    beforeSend: function () {
                        swalShowLoading("Creating Nav Link", "Please wait, while Nav Link is being created")
                    },
                    success: function (data) {
                        if (data.success) {

                            Swal.fire(data.success, "Click OK to proceed", "success").then(
                                function () {
                                    location.reload();
                                }
                            )
                        }
                        else {
                            swal.close();
                            Swal.fire(data.error, "Click OK to proceed", "error").then(
                                function () {
                                    location.reload();
                                }
                            )
                        }

                    }
                });
            } else {
                swalShowError(msg.message, errorClass)
            }
        });





    });

    active.on("change", function (e) {
        let url = "/admin/navbar-link/status";
        let data = { "name": $(this).attr("data-name"), "state": $(this).val(), "ID": $(this).attr("id") };

        $.ajax({
            url: url,
            data: data,
            type: "post",
            beforeSend: function () {
                swalShowLoading("Updating Nav Link", "Please wait, while Nav Link is being updated")
            },
            success: function (data) {
                if (data.success) {

                    Swal.fire(data.success, "Click OK to proceed", "success").then(
                        function () {
                            location.reload();
                        }
                    )
                }
                else {
                    swal.close();
                    Swal.fire(data.error, "Click OK to proceed", "error").then(
                        function () {
                            location.reload();
                        }
                    )
                }

            }
        });
    });

    edit.on("click", async function (e) {
        e.preventDefault();
        e.stopPropagation();

        var ID = $(this).attr("data-id");


        Swal.fire({
            title: 'Input Nav Link Name',
            input: 'text',
            inputLabel: 'New Nav Link',
            inputValue: $(this).attr("data-name"),
            showLoaderOnConfirm: true,
            preConfirm: (link) => {

                var [blah, state, msg] = validateNavName(link);
                if (!state) {
                    swalShowError(msg.message, errorClass);
                } else {
                    return link;
                }
            },
        }).then(function (result) {
            console.log(result);
            var [blah, state, msg] = validateNavName(result.value);
            console.log(blah);

            if (state) {
                let url = "/admin/navbar-link/edit";
                let data = { "name": result.value, "ID": ID };
                console.log(data)

                $.ajax({
                    url: url,
                    data: data,
                    type: "post",
                    beforeSend: function () {
                        swalShowLoading("Creating Nav Link", "Please wait, while Nav Link is being created")
                    },
                    success: function (data) {
                        if (data.success) {

                            Swal.fire(data.success, "Click OK to proceed", "success").then(
                                function () {
                                    location.reload();
                                }
                            )
                        }
                        else {
                            swal.close();
                            Swal.fire(data.error, "Click OK to proceed", "error").then(
                                function () {
                                    location.reload();
                                }
                            )
                        }

                    }
                });
            } else {
                swalShowError(msg.message, errorClass)
            }
        });





    });

    plus.on("click", async function (e) {
        e.preventDefault();
        e.stopPropagation();

        var ID = $(this).attr("data-id");


        Swal.fire({
            title: 'Enter sub Nav Link Name Under ' + $(this).attr("data-name"),
            input: 'text',
            inputLabel: 'New Nav Link',
            showLoaderOnConfirm: true,
            preConfirm: (link) => {

                var [blah, state, msg] = validateNavName(link);
                if (!state) {
                    swalShowError(msg.message, errorClass);
                } else {
                    return link;
                }
            },
        }).then(function (result) {
            console.log(result);
            var [blah, state, msg] = validateNavName(result.value);
            console.log(blah);

            if (state) {
                let url = "/admin/navbar-link/sub";
                let data = { "name": result.value, "ID": ID };

                $.ajax({
                    url: url,
                    data: data,
                    type: "post",
                    beforeSend: function () {
                        swalShowLoading("Creating Nav Link", "Please wait, while Nav Link is being created")
                    },
                    success: function (data) {
                        if (data.success) {

                            Swal.fire(data.success, "Click OK to proceed", "success").then(
                                function () {
                                    location.reload();
                                }
                            )
                        }
                        else {
                            swal.close();
                            Swal.fire(data.error, "Click OK to proceed", "error").then(
                                function () {
                                    location.reload();
                                }
                            )
                        }

                    }
                });
            } else {
                swalShowError(msg.message, errorClass)
            }
        });





    });

    //Function to Delete Admin
    remove.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var ID = $(this).attr("data-id");
        let data = { "name": $(this).attr("data-name"), "ID": ID };

        let url = "/admin/navbar-link/delete"

        Swal.fire({
            icon: 'question',
            title: 'Are you Sure you want to Delete ?',
            text: 'This will permanently delete this profile, click yes to confirm',
            showCancelButton: true,
            confirmButtonText: `Yes`,
            cancelButtonText: `No`,
            allowOutsideClick: false,
        }).then(async (result) => {
            if (result.value) {

                $.ajax({
                    url: url,
                    type: 'POST',
                    data: data,
                    beforeSend: function () {
                        Swal.fire({
                            title: 'Auto close alert!',
                            html: 'Please Hold on as Details are being Fetched.',
                            timer: 40000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            allowOutsideClick: false,
                        });
                    },
                    success: function (data) {
                        swal.close();
                        if (data.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Delete Operation Successful',
                                text: data.success,
                            }).then(
                                function () {
                                    location.reload();
                                }
                            );
                        } else if (data.url) {
                            location.replace(data.url);
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Delete Operation Un-successful',
                                text: data.error,
                            });
                        }
                    }
                });
            }
        });

    });


});