import { swalShowError, swalShowLoading, validateName, isEmpty, isUrlValid } from './helper.js';

jQuery(document).ready(function ($) {
    var add = $("#testyMdl");
    var share = $("#testyShare");
    var errorClass = "swal2-validation-message";
    var active = $(".active");
    var edit = $(".edit");
    var remove = $(".remove");

    function setPrdOptions(options, category = null) {
        console.log(category)
        let data = JSON.parse(options);

        let opt = "";

        if (category != null && parseInt(category) == 0) {
            opt += "<option value='0' selected >General</option>";
        }

        for (var o = 0; o < data.length; o++) {
            if (category != null && parseInt(data[o].id) == parseInt(category)) {
                opt += "<option value='" + data[o].id + "' selected>" + data[o].name + "</option>";
            } else {
                opt += "<option value='" + data[o].id + "'>" + data[o].name + "</option>";
            }
        }
        console.log(opt);
        return opt;
    }

    $(document).on('change', '#swal-input5', function (e) {
        let product = window.btoa($(this).val().toString());
        let url = window.location.origin + '/testimonial/share/' + product;

        $("body #swal-input6").val(url);
    });


    add.on("click", async function (e) {

        let product, name, title, msg = "";
        let prdOptions = setPrdOptions($(this).attr("data-prd"));

        Swal.fire({
            title: 'Create New Testimonial',
            html:
                '<label for="swal-input1"> Testimonial For </label>' +
                '<select id="swal-input1" class="swal2-input form-control"><option value="">Select One</option><option value="0">General</option>' + prdOptions + '</select></div>' +
                '<label for="swal-input2"> Full Name </label>' +
                '<input id="swal-input2" class="swal2-input" type="text">' +
                '<label for="swal-input3"> Profession </label>' +
                '<input id="swal-input3" class="swal2-input" type="text">' +
                '<div class="col-md-12"><label for="swal-input4"> Message </label>' +
                '<textarea id="swal-input4" row="8" style="height : 180px;" class="swal2-input"></textarea>' +
                '</div',
            focusConfirm: false,
            showCancelButton: true,
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
            preConfirm: () => {
                let state1, state2 = false;
                var producty = $('#swal-input1').val();
                var namey = $('#swal-input2').val();
                var titley = $('#swal-input3').val();
                var msgy = $('#swal-input4').val();

                state1 = validateName(namey);
                state2 = validateName(titley)

                if (isEmpty(producty)) {
                    swalShowError("Testimonial For Input is not valid", errorClass);
                }
                else if (isEmpty(namey) || !state1) {
                    swalShowError("Full Name input is not valid", errorClass);
                }
                else if (!isEmpty(titley) && !state2) {
                    swalShowError("Profession input is not valid", errorClass);
                }
                else if (isEmpty(msgy)) {
                    swalShowError("Message input is not valid", errorClass);
                }
                else {
                    return [producty, namey, titley, msgy];
                }
            },
        }).then(function (result) {
            product = result.value[0];
            name = result.value[1];
            title = result.value[2];
            msg = result.value[3];
            let url = "/admin/add_comment";
            let param = { url: url };
            let data = new FormData

            data.append("product", product);
            data.append("name", name);
            data.append("title", title);
            data.append("msg", msg);
            data.append("type", "add");

            param.data = data;
            param.type = "post";
            param.contentType = false;
            param.processData = false;
            // console.log(data)
            param.beforeSend = function () {
                swalShowLoading("Creating New Testimonial", "Please wait, while Testimonial is being created")
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

    });

    active.on("change", function (e) {
        let url = "/admin/item/status";
        let data = { extra: "testy", "item": "testys", "name": $(this).attr("data-name"), "state": $(this).val(), "ID": $(this).attr("id") };

        $.ajax({
            url: url,
            data: data,
            type: "post",
            beforeSend: function () {
                swalShowLoading("Updating Products", "Please wait, while Product is being updated")
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

        let ID = $(this).attr("data-id")
        let datas = $(this).attr("data-about").split("*");
        let product = datas[0].trim();
        let name = datas[1].trim();
        let title = datas[2].trim();
        let msg = datas[3].trim();
        let change;
        let prdOptions = setPrdOptions(add.attr("data-prd"), product);


        Swal.fire({
            title: 'Create New Testimonial',
            html:
                '<label for="swal-input1"> Testimonial For </label>' +
                '<select id="swal-input1" class="swal2-input form-control"><option value="">Select One</option>' + prdOptions + '</select></div>' +
                '<label for="swal-input2"> Full Name </label>' +
                '<input id="swal-input2" value="' + name + '" class="swal2-input" type="text">' +
                '<label for="swal-input3"> Profession </label>' +
                '<input id="swal-input3" value="' + title + '" class="swal2-input" type="text">' +
                '<div class="col-md-12"><label for="swal-input4"> Message </label>' +
                '<textarea id="swal-input4" row="8" style="height : 180px;" class="swal2-input">' + msg + '</textarea>' +
                '</div',
            focusConfirm: false,
            showCancelButton: true,
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
            preConfirm: () => {
                let state1, state2 = false;
                var producty = $('#swal-input1').val();
                var namey = $('#swal-input2').val();
                var titley = $('#swal-input3').val();
                var msgy = $('#swal-input4').val();

                state1 = validateName(namey);
                state2 = validateName(titley)

                if (isEmpty(producty)) {
                    swalShowError("Testimonial For Input is not valid", errorClass);
                }
                else if (isEmpty(namey) || !state1) {
                    swalShowError("Full Name input is not valid", errorClass);
                }
                else if (!isEmpty(titley) && !state2) {
                    swalShowError("Profession input is not valid", errorClass);
                }
                else if (isEmpty(msgy)) {
                    swalShowError("Message input is not valid", errorClass);
                }
                else {
                    if (producty == product && namey == name && titley == title && msgy == msg) {
                        change = false;
                    } else {
                        change = true
                    }
                    return [producty, namey, titley, msgy];
                }
            },
        }).then(function (result) {
            product = result.value[0];
            name = result.value[1];
            title = result.value[2];
            msg = result.value[3];
            let url = "/admin/edit_comment";
            let param = { url: url };
            let data = new FormData

            data.append("product", product);
            data.append("name", name);
            data.append("title", title);
            data.append("msg", msg);
            data.append("ID", ID);
            data.append("type", "edit");

            param.data = data;
            param.type = "post";
            param.contentType = false;
            param.processData = false;
            // console.log(data)
            param.beforeSend = function () {
                swalShowLoading("Updating Testimonial", "Please wait, while Testimonial is being updated")
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
        });


    });

    //Function to Delete Admin
    remove.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var ID = $(this).attr("data-id");
        let data = { extra: "testy", "item": "testys", "item_name": "Testimonial", "name": $(this).attr("data-name"), "ID": ID };

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

    share.on("click", async function (e) {

        let prdOptions = setPrdOptions(add.attr("data-prd"));

        Swal.fire({
            title: 'Get Testimonial Link',
            html:
                '<label for="swal-input5"> Testimonial For </label>' +
                '<select id="swal-input5" class="swal2-input form-control"><option value="">Select One</option><option value="0">General</option>' + prdOptions + '</select></div>' +
                '<label for="swal-input6"> Link to Share </label>' +
                '<input id="swal-input6" style="background: darkgrey;" readonly class="swal2-input" type="text">',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Copy',
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
            preConfirm: () => {
                var copyText = document.getElementById("swal-input6");
                if (copyText.value != "") {
                    /* Select the text field */
                    copyText.select();
                    copyText.setSelectionRange(0, 99999); /* For mobile devices */
                    /* Copy the text inside the text field */
                    navigator.clipboard.writeText(copyText.value);
                    return true;
                } else {
                    swalShowError("Select Testimonial for what first", errorClass);
                }


            }



        }).then(function (result) {

            if (result.value) {
                Swal.fire("Copied to clipboard Succesfully", "Click OK to proceed", "success").then(
                    function () {
                        location.reload();
                    }
                )
            }
        });

    });


});