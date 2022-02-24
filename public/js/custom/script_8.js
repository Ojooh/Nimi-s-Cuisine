import { swalShowError, swalShowLoading, validateName, validateNamey, validInteger, validFloat, isImage } from './helper.js';

jQuery(document).ready(function ($) {
    var add = $("#addGalleryMdl, .add-slider");
    var errorClass = "swal2-validation-message";
    var active = $(".active");
    var edit = $(".edit");
    var remove = $(".remove");

    $(document).on('change', '#swal-input2', function (e) {
        console.log("here");
        var input = this;
        var url = $(e.target).val();
        var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
        if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg" || ext == "webp")) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#previewImg').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    });


    add.on("click", async function (e) {
        e.preventDefault();
        e.stopPropagation();

        let name, link = "";

        Swal.fire({
            title: 'Add Photo to Gallery',
            html:
                '<div class="photot-add-img"><img id="previewImg" src="/img/prds/default.png" class="img-fluid" /></div>' +
                '<label for="swal-input1"> Photo Text </label>' +
                '<input id="swal-input1" class="swal2-input" type="text">' +
                '<label for="swal-input2"> Upload Photo</label>' +
                '<input id="swal-input2" class="swal2-input" type="file">',
            focusConfirm: false,
            showCancelButton: true,
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
            preConfirm: () => {
                let state1, state2 = false;
                var namey = document.getElementById('swal-input1').value;
                var linky = document.getElementById('swal-input2').files[0];

                state1 = validateNamey(namey);
                state2 = isImage(linky)

                if (!state1 || namey == "" || namey == null) {
                    swalShowError("Photo Text Input is not valid", errorClass);
                }
                else if (!state2) {
                    swalShowError("Photo Input is not valid", errorClass);
                }
                else {
                    return [namey, linky];
                }
            },
        }).then(function (result) {
            name = result.value[0];
            link = result.value[1];

            if (name && name != "" && link && link != undefined) {
                let url = "/admin/add_photo";
                let param = { url: url };
                let data = new FormData()

                data.append("name", name);
                data.append("link", link);
                data.append("type", "add");
                param.data = data;
                param.type = "post";
                param.contentType = false;
                param.processData = false;
                // console.log(data)
                param.beforeSend = function () {
                    swalShowLoading("Creating New Photo", "Please wait, while Photo is being created")
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
            }
        });

    });

    active.on("change", function (e) {
        let url = "/admin/item/status";
        let data = { extra: "gallery", "item": "gallery", "name": $(this).attr("data-name"), "state": $(this).val(), "ID": $(this).attr("id") };

        $.ajax({
            url: url,
            data: data,
            type: "post",
            beforeSend: function () {
                swalShowLoading("Updating Photo Gallery", "Please wait, while Photo Gallery is being updated")
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

        let ID = $(this).attr("data-id");
        let name = $(this).attr("data-name");
        let link = $(this).attr("data-link");
        let change;


        Swal.fire({
            title: 'Update Photo to Gallery',
            html:
                '<div class="photot-add-img"><img id="previewImg" src="' + link + '" class="img-fluid" /></div>' +
                '<label for="swal-input1"> Photo Text </label>' +
                '<input id="swal-input1" value="' + name + '"class="swal2-input" type="text">' +
                '<label for="swal-input2"> Upload Photo</label>' +
                '<input id="swal-input2" class="swal2-input" type="file">',
            focusConfirm: false,
            showCancelButton: true,
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
            preConfirm: () => {
                let state1, state2 = false;
                var namey = document.getElementById('swal-input1').value;
                var linky = document.getElementById('swal-input2').files[0];

                state1 = validateNamey(namey);
                state2 = isImage(linky)

                if (!state1 || namey == "" || namey == null) {
                    swalShowError("Photo Text Input is not valid", errorClass);
                }
                else if (linky && linky != undefined && !state2) {
                    swalShowError("Photo Input is not valid", errorClass);
                }
                else {
                    if (namey == name && linky == link) {
                        change = false;
                    } else {
                        change = true;
                    }
                    return [namey, linky];
                }
            },
        }).then(function (result) {
            name = result.value[0];
            link = result.value[1];

            if (name && name != "") {
                let url = "/admin/edit_photo";
                let param = { url: url };
                let data = new FormData()

                data.append("name", name);
                data.append("link", link);
                data.append("ID", ID);
                data.append("type", "edit");
                param.data = data;
                param.type = "post";
                param.contentType = false;
                param.processData = false;
                // console.log(data)
                param.beforeSend = function () {
                    swalShowLoading("Updating Photo Gallery", "Please wait, while Photo is being updated")
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
                if (change) {
                    $.ajax(param);
                }

            }
        });

    });

    //Function to Delete Admin
    remove.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var ID = $(this).attr("data-id");
        let data = { extra: "gallery", "item": "gallery", "item_name": "Photo", "name": $(this).attr("data-name"), "ID": ID };

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