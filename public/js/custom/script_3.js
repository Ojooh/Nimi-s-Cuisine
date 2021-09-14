import { validateNavName } from './validator.js';
import { swalShowError, swalShowLoading, validateNamey, isImage } from './helper.js';

jQuery(document).ready(function ($) {
    var addSlider = $(".add-slider");

    var errorClass = "swal2-validation-message";
    var edit = $(".edit");
    var remove = $(".remove");

    //Function To Preview Image
    $(document).on('change', '.swal2-file', function (e) {
        console.log("here");
        $('.swal2-image').attr('src', URL.createObjectURL(e.target.files[0]));
    });


    addSlider.on("click", async function (e) {
        e.preventDefault();
        e.stopPropagation();

        var rank = $(this).attr("id");
        var name = "";
        var s_file = "";


        Swal.fire({
            title: 'Enter Slider Name',
            input: 'text',
            showLoaderOnConfirm: true,
            preConfirm: (link) => {

                var state = validateNamey(link);
                if (!state || link == "") {
                    swalShowError("Name is Not valid", errorClass);
                } else {
                    return link;
                }
            },
        }).then(function (result) {
            name = result.value;

            if (name && name != "") {
                Swal.fire({
                    title: 'SELECT SLIDER IMAGE',
                    input: 'file',
                    inputAttributes: {
                        'accept': 'image/*',
                        'aria-label': 'Upload your slider picture'
                    },
                    imageUrl: 'https://unsplash.it/400/200',
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'slider image',
                    showLoaderOnConfirm: true,
                    preConfirm: (file) => {

                        var state = isImage(file);
                        if (!state || file == "") {
                            swalShowError("File is Not valid", errorClass);
                        } else {
                            return file;
                        }
                    },
                }).then(function (result) {
                    let fd = new FormData()
                    s_file = result.value;

                    fd.append('rank', rank);
                    fd.append('name', name);
                    fd.append('img', s_file);
                    fd.append('type', "add");
                    let url = "/admin/slider";

                    $.ajax({
                        url: url,
                        data: fd,
                        type: "post",
                        contentType: false,
                        processData: false,
                        beforeSend: function () {
                            swalShowLoading("Creating Slider", "Please wait, while Slider Profile is being created")
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
            }

        });





    });

    edit.on("click", async function (e) {
        e.preventDefault();
        e.stopPropagation();

        var ID = $(this).attr("data-id");
        var name = $(this).attr("data-name");
        var s_file = $(this).attr("data-img");


        Swal.fire({
            title: 'Enter Slider Name',
            input: 'text',
            inputValue: name,
            showLoaderOnConfirm: true,
            preConfirm: (link) => {

                var state = validateNamey(link);
                if (!state || link == "") {
                    swalShowError("Name is Not valid", errorClass);
                } else {
                    return link;
                }
            },
        }).then(function (result) {
            name = result.value;
            if (name && name != "") {
                Swal.fire({
                    title: 'SELECT SLIDER IMAGE',
                    input: 'file',
                    inputAttributes: {
                        'accept': 'image/*',
                        'aria-label': 'Upload your slider picture'
                    },
                    imageUrl: s_file,
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'slider image',
                    showLoaderOnConfirm: true,
                    preConfirm: (file) => {

                        if (file && file != "" && file != null) {
                            var state = isImage(file);
                            if (!state || file == "") {
                                swalShowError("File is Not valid", errorClass);
                            } else {
                                return file;
                            }
                        } else {
                            return "";
                        }
                    },
                }).then(function (result) {
                    let fd = new FormData()
                    s_file = result.value;

                    fd.append('ID', ID);
                    fd.append('name', name);
                    fd.append('img', s_file);
                    fd.append('type', "edit");
                    let url = "/admin/slider/edit";

                    $.ajax({
                        url: url,
                        data: fd,
                        type: "post",
                        contentType: false,
                        processData: false,
                        beforeSend: function () {
                            swalShowLoading("Updating Slider", "Please wait, while Slider Profile is being updated")
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
            }
        });





    });

    //Function to Delete Admin
    remove.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var ID = $(this).attr("data-id");
        let data = { "name": $(this).attr("data-name"), "ID": ID };

        let url = "/admin/slider/delete"

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
                        swalShowLoading("Deleting Slider", "Please wait, while Slider Profile is being Destroyed")
                    },
                    success: function (data) {
                        console.log(data);
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