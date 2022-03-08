import { swalShowError, swalShowLoading, validatePass, isEmpty, isUrlValid } from './helper.js';

jQuery(document).ready(function ($) {
    let uid = window.location.href.split("/")
    var errorClass = "swal2-validation-message";
    let new_pass = "";

    Swal.fire({
        title: 'Set New Password to activate your account',
        html:
            '<label for="swal-input2"> New Password </label>' +
            '<input id="swal-input2" class="swal2-input" type="password">' +
            '<label for="swal-input3"> Confirm Password </label>' +
            '<input id="swal-input3" class="swal2-input" type="password">',
        focusConfirm: false,
        showCancelButton: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        preConfirm: () => {
            let state1, state2 = false;
            var newy = $('#swal-input2').val();
            var confirmy = $('#swal-input3').val();


            if (isEmpty(newy) || validatePass(newy) == false) {
                swalShowError("New Password input is not valid", errorClass);
            }
            else if (isEmpty(confirmy) || validatePass(confirmy) == false) {
                swalShowError("Confirm input is not valid", errorClass);
            }
            else if (newy != confirmy) {
                swalShowError("Passwords do not match please re enter password", errorClass);
            }
            else {
                return [confirmy];
            }
        },
    }).then(function (result) {
        uid = uid[uid.length - 1]
        new_pass = result.value[0];
        let url = "/activate_account";
        let param = { url: url };
        let data = new FormData

        data.append("uid", uid);
        data.append("password", new_pass);

        param.data = data;
        param.type = "post";
        param.contentType = false;
        param.processData = false;
        // console.log(data)
        param.beforeSend = function () {
            swalShowLoading("Activating New Account", "Please wait, while your Acccount is being activated")
        };
        param.success = function (data) {
            if (data.success) {
                Swal.fire(data.success, "Click OK to proceed", "success").then(
                    function () {
                        location.replace("/");
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