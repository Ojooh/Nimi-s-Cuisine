import { validateLogin } from './validator.js';
import { showError } from './helper.js';

jQuery(document).ready(function ($) {
    var loginBtn = $(".loginBtn");
    var error = $('.error');




    loginBtn.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        error.html("");
        var url = "/auth/login";
        var username = $('#username').val();
        var password = $('#password').val();
        let data = { username: username, pass: password };

        let [n, state, msg] = validateLogin(data);

        if (!state) {
            showError("danger", msg.message, "error-l");
        }
        else {
            $.ajax({
                url: url,
                data: data,
                type: "post",
                beforeSend: function () {
                    Swal.fire({
                        title: 'Auto close alert!',
                        html: 'Please Hold on as your details are being confirmed',
                        timer: 40000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                    });
                },
                success: function (data) {
                    if (data.success) {

                        Swal.fire(data.success, "Click OK to proceed to Dashoboard", "success").then(
                            function () {
                                location.replace(data.url);
                            }
                        )
                    }
                    else {
                        swal.close();
                        msg = "<span class='alert alert-success'>" + data.error + "</span>";
                        error.html(msg);
                    }

                }
            });
        }
    });

});


