import {
    swalShowError, swalShowLoading, validateName,
    validateNamey, validateEmail, validateTel, isImage, isEmpty
} from './helper.js';

jQuery(document).ready(function ($) {
    var add = $("#addUsrMdl");
    var errorClass = "swal2-validation-message";
    var active = $(".active");
    var edit = $(".edit");
    var remove = $(".remove");

    $(document).on('change', '#swal-input7', function (e) {
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

        let fname, lname, email, phone, gender, user_type, address, link = "";

        Swal.fire({
            title: 'Add Admin User',
            html:
                '<div class="photot-add-img bd-r"><img id="previewImg" src="/img/prds/default.png" class="img-fluid" /></div>' +
                `<div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="swal-input1">First Name</label>
                        <input id="swal-input1" class="swal2-input form-control" type="text">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="swal-input2"> Last Name</label>
                        <input id="swal-input2" class="swal2-input form-control" type="text">
                    </div>
                    <div class="form-group col-md-12">
                        <label for="swal-input3">Email</label>
                        <input id="swal-input3" class="swal2-input form-control" type="email">
                    </div>
                    <div class="form-group col-md-12">
                        <label for="swal-input4"> Phone Number</label>
                        <input id="swal-input4" class="swal2-input form-control" type="tel">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="swal-input5">Gender</label>
                        <select id="swal-input5" class="swal2-input form-control">
                            <option value="">Select a Gender</option>
                            <option value="Male">Male</option>
                            <option value="FeMale">FeMale</option>
                        </select>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="swal-input6"> User Type</label>
                        <select id="swal-input6" class="swal2-input form-control">
                            <option value="">Select User Type</option>
                            <option value="Admin">Admin</option>
                            <option value="SuperAdmin">SuperAdmin</option>
                        </select>
                    </div>
                    <div class="form-group col-md-12">
                        <label for="swal-input7"> Profile Picture</label>
                        <input id="swal-input7" class="swal2-input form-control" type="file">
                    </div>
                    <div class="form-group col-md-12">
                        <label for="swal-input8"> Address</label>
                        <textarea id="swal-input8" class="swal2-input" style="height: 180px;"></textarea>
                    </div>
                </div>`,
            focusConfirm: false,
            showCancelButton: true,
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
            preConfirm: () => {
                var fnamey = $('#swal-input1').val();
                var lnamey = $('#swal-input2').val();
                var emaily = $('#swal-input3').val();
                var phoney = $('#swal-input4').val();
                var gendery = $('#swal-input5').val();
                var user_typey = $('#swal-input6').val();
                var linky = $('#swal-input7')[0].files[0];
                var addressy = $('#swal-input8').val();



                if (isEmpty(fnamey) || validateName(fnamey) == false) {
                    swalShowError("Fisrt Name Input is not valid", errorClass);
                }
                else if (isEmpty(lnamey) || validateName(lnamey) == false) {
                    swalShowError("Last Name Input is not valid", errorClass);
                }
                else if (isEmpty(emaily) || validateEmail(emaily) == false) {
                    swalShowError("Email Input is not valid", errorClass);
                }
                else if (!isEmpty(phoney) && validateTel(phoney) == false) {
                    swalShowError("Phone Number Input is not valid", errorClass);
                }
                else if (isEmpty(gendery)) {
                    swalShowError("Gender input not valid", errorClass);
                }
                else if (isEmpty(user_typey)) {
                    swalShowError("User Type input not valid", errorClass);
                }
                else if (linky && linky != undefined && isImage(linky) == false) {
                    swalShowError("Profile Picture input not valid", errorClass);
                }
                else {
                    return [fnamey, lnamey, emaily, phoney, gendery, user_typey, linky, addressy];
                }
            },
        }).then(function (result) {
            fname = result.value[0]
            lname = result.value[1]
            email = result.value[2]
            phone = result.value[3]
            gender = result.value[4]
            user_type = result.value[5]
            link = result.value[6]
            address = result.value[7]

            if (fname && fname != "" && lname && lname != "" && user_type && user_type != "") {
                let url = "/admin/add_user";
                let param = { url: url };
                let data = new FormData()

                data.append("fname", fname);
                data.append("lname", lname);
                data.append("email", email);
                data.append("phone", phone);
                data.append("gender", gender);
                data.append("user_type", user_type);
                data.append("link", link);
                data.append("address", address);
                data.append("type", "add");
                param.data = data;
                param.type = "post";
                param.contentType = false;
                param.processData = false;
                // console.log(data)
                param.beforeSend = function () {
                    swalShowLoading("Creating New User", "Please wait, while User is being created")
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
        let data = { extra: "admin_user", "item": "users", "name": $(this).attr("data-name"), "state": $(this).val(), "ID": $(this).attr("id") };

        $.ajax({
            url: url,
            data: data,
            type: "post",
            beforeSend: function () {
                swalShowLoading("Updating Users", "Please wait, while User is being updated")
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
        let datas = $(this).attr("data-about").split("*");
        let fname = datas[0];
        let lname = datas[1];
        let email = datas[2];
        let phone = datas[3];
        let gender = datas[4];
        let user_type = datas[5];
        let link = datas[6];
        let address = datas[7];
        let change;


        Swal.fire({
            title: 'Update ' + fname + ' User',
            html:
                '<div class="photot-add-img bd-r"><img id="previewImg" src="' + link + '" class="img-fluid" /></div>' +
                `<div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="swal-input1">First Name</label>
                        <input id="swal-input1" value="` + fname + `" class="swal2-input form-control" type="text">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="swal-input2"> Last Name</label>
                        <input id="swal-input2" value="` + lname + `" class="swal2-input form-control" type="text">
                    </div>
                    <div class="form-group col-md-12">
                        <label for="swal-input3">Email</label>
                        <input id="swal-input3" value="` + email + `" class="swal2-input form-control" type="email">
                    </div>
                    <div class="form-group col-md-12">
                        <label for="swal-input4"> Phone Number</label>
                        <input id="swal-input4" value="` + phone + `" class="swal2-input form-control" type="tel">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="swal-input5">Gender</label>
                        <select id="swal-input5" class="swal2-input form-control">
                            <option value="`+ gender + `">` + gender + `</option>
                            <option value="Male">Male</option>
                            <option value="FeMale">FeMale</option>
                        </select>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="swal-input6"> User Type</label>
                        <select id="swal-input6" class="swal2-input form-control">
                            <option value="`+ user_type + `">` + user_type + `</option>
                            <option value="Admin">Admin</option>
                            <option value="SuperAdmin">SuperAdmin</option>
                        </select>
                    </div>
                    <div class="form-group col-md-12">
                        <label for="swal-input7"> Profile Picture</label>
                        <input id="swal-input7" class="swal2-input form-control" type="file">
                    </div>
                    <div class="form-group col-md-12">
                        <label for="swal-input8"> Address</label>
                        <textarea id="swal-input8" class="swal2-input" style="height: 180px;">` + address + `</textarea>
                    </div>
                </div>`,
            focusConfirm: false,
            showCancelButton: true,
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
            preConfirm: () => {
                var fnamey = $('#swal-input1').val();
                var lnamey = $('#swal-input2').val();
                var emaily = $('#swal-input3').val();
                var phoney = $('#swal-input4').val();
                var gendery = $('#swal-input5').val();
                var user_typey = $('#swal-input6').val();
                var linky = $('#swal-input7')[0].files[0];
                var addressy = $('#swal-input8').val();



                if (isEmpty(fnamey) || validateName(fnamey) == false) {
                    swalShowError("Fisrt Name Input is not valid", errorClass);
                }
                else if (isEmpty(lnamey) || validateName(lnamey) == false) {
                    swalShowError("Last Name Input is not valid", errorClass);
                }
                else if (isEmpty(emaily) || validateEmail(emaily) == false) {
                    swalShowError("Email Input is not valid", errorClass);
                }
                else if (!isEmpty(phoney) && validateTel(phoney) == false) {
                    swalShowError("Phone Number Input is not valid", errorClass);
                }
                else if (isEmpty(gendery)) {
                    swalShowError("Gender input not valid", errorClass);
                }
                else if (isEmpty(user_typey)) {
                    swalShowError("User Type input not valid", errorClass);
                }
                else if (linky && linky != undefined && isImage(linky) == false) {
                    swalShowError("Profile Picture input not valid", errorClass);
                }
                else {
                    if (fnamey == fname && lnamey == lname && emaily == email && phoney == phone && gendery == gender && user_typey == user_type && address == addressy) {
                        change = false;
                    } else {
                        change = true;
                    }
                    return [fnamey, lnamey, emaily, phoney, gendery, user_typey, linky, addressy];
                }
            },
        }).then(function (result) {
            fname = result.value[0]
            lname = result.value[1]
            email = result.value[2]
            phone = result.value[3]
            gender = result.value[4]
            user_type = result.value[5]
            link = result.value[6]
            address = result.value[7]

            if (name && name != "") {
                let url = "/admin/edit_user";
                let param = { url: url };
                let data = new FormData()

                data.append("fname", fname);
                data.append("lname", lname);
                data.append("email", email);
                data.append("phone", phone);
                data.append("gender", gender);
                data.append("user_type", user_type);
                data.append("link", link);
                data.append("address", address);
                data.append("ID", ID);
                data.append("type", "edit");
                param.data = data;
                param.type = "post";
                param.contentType = false;
                param.processData = false;
                // console.log(data)
                param.beforeSend = function () {
                    swalShowLoading("Updating User", "Please wait, while User Profile is being updated")
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
        let data = { extra: "admin_user", "item": "users", "item_name": "User", "name": $(this).attr("data-name"), "ID": ID };

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