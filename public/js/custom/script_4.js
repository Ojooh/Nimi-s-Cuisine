import { swalShowError, swalShowLoading, validateName, isUrlValid } from './helper.js';

jQuery(document).ready(function ($) {
    var addSocLink = $("#socLinkAdd");
    var errorClass = "swal2-validation-message";
    var active = $(".active");
    var edit = $(".edit");
    var remove = $(".remove");


    addSocLink.on("click", async function (e) {
        e.preventDefault();
        e.stopPropagation();
        let name, link = ""


        Swal.fire({
            title: 'Input Social Link Name',
            input: 'text',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: (namey) => {

                var state = validateName(namey);

                if (!state) {
                    swalShowError("Social Link Name is not valid", errorClass);
                } else {
                    return namey;
                }
            },
        }).then(function (result) {
            name = result.value;

            if (name && name != "") {
                Swal.fire({
                    title: 'Input Social Link Address (e.g https://facebook/ojooh.com)',
                    input: 'text',
                    showCancelButton: true,
                    showLoaderOnConfirm: true,
                    preConfirm: (linky) => {

                        var state = isUrlValid(linky);

                        if (!state) {
                            swalShowError("Social Link Address is not valid", errorClass);
                        } else {
                            return linky;
                        }
                    },
                }).then(function (result) {
                    link = result.value;

                    if (link && link != "") {
                        let url = "/admin/social_links";
                        let data = { "name": name, 'link': link };

                        $.ajax({
                            url: url,
                            data: data,
                            type: "post",
                            beforeSend: function () {
                                swalShowLoading("Creating Social Link", "Please wait, while Social Link is being created")
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

                    }

                });

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
        let name = $(this).attr("data-name");
        let link = $(this).attr("data-link")


        Swal.fire({
            title: 'Input Social Link Name',
            input: 'text',
            inputLabel: 'New Nav Link',
            inputValue: name,
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: (namey) => {

                var state = validateName(namey);

                if (!state) {
                    swalShowError("Social Link Name is not valid", errorClass);
                } else {
                    return namey;
                }
            },
        }).then(function (result) {
            name = result.value;

            if (name && name != "") {
                Swal.fire({
                    title: 'Input Social Link Address (e.g https://facebook/ojooh.com)',
                    input: 'text',
                    inputValue: link,
                    showCancelButton: true,
                    showLoaderOnConfirm: true,
                    preConfirm: (linky) => {

                        var state = isUrlValid(linky);

                        if (!state) {
                            swalShowError("Social Link Address is not valid", errorClass);
                        } else {
                            return linky;
                        }
                    },
                }).then(function (result) {
                    if (result.value != link) {
                        link = result.value;

                        if (link && link != "") {
                            let url = "/admin/social_link/edit";
                            let data = { "name": name, 'link': link, 'ID': ID };

                            $.ajax({
                                url: url,
                                data: data,
                                type: "post",
                                beforeSend: function () {
                                    swalShowLoading("Updating Social Link", "Please wait, while Social Link is being Updated")
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

                        }
                    }

                });

            }
        });

    });

    //Function to Delete Admin
    remove.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var ID = $(this).attr("data-id");
        let data = { extra: "soc_link", "item": "social_links", "item_name": "Social Link", "name": $(this).attr("data-name"), "ID": ID };

        let url = "/admin/item/delete"

        Swal.fire({
            title: 'Are you sure want to Delete ?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
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