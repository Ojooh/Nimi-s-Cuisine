import { swalShowError, swalShowLoading, validateName, isImage, isTransImage } from './helper.js';

jQuery(document).ready(function ($) {
    var addCategory = $("#categoryMdl");
    var errorClass = "swal2-validation-message";
    var active = $(".active");
    var edit = $(".edit");
    var remove = $(".remove");


    addCategory.on("click", async function (e) {
        e.preventDefault();
        e.stopPropagation();
        let name, link = ""


        Swal.fire({
            title: 'Enter Category Name',
            input: 'text',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: (namey) => {

                var state = validateName(namey);

                if (!state) {
                    swalShowError("Category Name is not valid", errorClass);
                } else {
                    return namey;
                }
            },
        }).then(function (result) {
            name = result.value;

            if (name && name != "") {
                Swal.fire({
                    title: 'Set Category Image',
                    input: 'file',
                    inputAttributes: {
                        'accept': 'image/*',
                        'aria-label': 'Upload the category image'
                    },
                    html: '<canvas width="100%" height="200"></canvas>',
                    showCancelButton: true,
                    showLoaderOnConfirm: true,
                    preConfirm: async (linky) => {
                        if (linky && linky != "") {
                            let state;

                            if (isImage(linky) == true && await isTransImage(linky)) {
                                state = true;
                            } else {
                                state = false;
                            }

                            if (!state) {
                                swalShowError("Image is not valid must have a transparent background", errorClass);
                            } else {
                                return linky;
                            }
                        } else {
                            return "";
                        }
                    },
                }).then(function (result) {
                    console.log(result)
                    link = result.value;
                    let data;
                    let url = "/admin/add_category";
                    let param = { url: url };

                    if (link && link != "") {
                        data = new FormData()
                        data.append("name", name);
                        data.append("link", link);
                        data.append("type", "add");
                        param.data = data;
                        param.type = "post";
                        param.contentType = false;
                        param.processData = false;
                    } else {
                        data = { "name": name, 'link': link, "type": "add" };
                        param.data = data;
                        param.type = "post";
                    }
                    // console.log(data)
                    param.beforeSend = function () {
                        swalShowLoading("Creating New Category", "Please wait, while Category is being created")
                    };
                    param.success = function (data) {
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

                    };





                    $.ajax(param);


                });

            }
        });

    });

    active.on("change", function (e) {
        let url = "/admin/item/status";
        let data = { "item": "categories", "name": $(this).attr("data-name"), "state": $(this).val(), "ID": $(this).attr("id") };

        $.ajax({
            url: url,
            data: data,
            type: "post",
            beforeSend: function () {
                swalShowLoading("Updating Categories", "Please wait, while Category is being updated")
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
            title: 'Update Category Name',
            input: 'text',
            inputValue: name,
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: (namey) => {

                var state = validateName(namey);

                if (!state) {
                    swalShowError("Category Name is not valid", errorClass);
                } else {
                    return namey;
                }
            },
        }).then(function (result) {
            name = result.value;

            if (name && name != "") {
                let img = `<img src=` + link + ` class="img-fluidy" height="200" />`
                Swal.fire({
                    title: 'Set Category Image',
                    input: 'file',
                    inputAttributes: {
                        'accept': 'image/*',
                        'aria-label': 'Upload the category image'
                    },
                    html: `<canvas class="d-none" width="100%" height="200"></canvas>` + img,
                    showCancelButton: true,
                    showLoaderOnConfirm: true,
                    preConfirm: async (linky) => {
                        if (linky && linky != "") {
                            let state;

                            if (isImage(linky) == true && await isTransImage(linky)) {
                                state = true;
                            } else {
                                state = false;
                            }

                            if (!state) {
                                swalShowError("Image is not valid must have a transparent background", errorClass);
                            } else if (linky == link) {
                                swalShowError("Category Image is not updated", errorClass);
                            } else {
                                return linky;
                            }
                        } else {
                            return "";
                        }
                    },
                }).then(function (result) {
                    console.log(result)
                    link = result.value;
                    let data;
                    let url = "/admin/edit_category";
                    let param = { url: url };

                    if (link && link != "") {
                        data = new FormData()
                        data.append("name", name);
                        data.append("link", link);
                        data.append("type", "add");
                        data.append("ID", ID);
                        param.data = data;
                        param.type = "post";
                        param.contentType = false;
                        param.processData = false;
                    } else {
                        data = { "name": name, 'link': link, "type": "add", "ID": ID };
                        param.data = data;
                        param.type = "post";
                    }
                    // console.log(data)
                    param.beforeSend = function () {
                        swalShowLoading("Updating " + name + " Category", "Please wait, while Category is being updated")
                    };
                    param.success = function (data) {
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

                    };

                    $.ajax(param);


                });

            }
        });

    });

    //Function to Delete Admin
    remove.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var ID = $(this).attr("data-id");
        let data = { extra: "category", "item": "categories", "item_name": "Category", "name": $(this).attr("data-name"), "ID": ID };

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