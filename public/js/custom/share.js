import { swalShowError, swalShowLoading, validateName, isEmpty, isUrlValid } from './helper.js';

jQuery(document).ready(function ($) {
    let product = window.location.href.split("/")
    product = window.atob(product[product.length - 1]);
    var errorClass = "swal2-validation-message";
    let name, title, msg = "";

    Swal.fire({
        title: 'Create New Testimonial',
        html:
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
            var namey = $('#swal-input2').val();
            var titley = $('#swal-input3').val();
            var msgy = $('#swal-input4').val();

            state1 = validateName(namey);
            state2 = validateName(titley)

            if (isEmpty(namey) || !state1) {
                swalShowError("Full Name input is not valid", errorClass);
            }
            else if (!isEmpty(titley) && !state2) {
                swalShowError("Profession input is not valid", errorClass);
            }
            else if (isEmpty(msgy)) {
                swalShowError("Message input is not valid", errorClass);
            }
            else {
                return [namey, titley, msgy];
            }
        },
    }).then(function (result) {
        product = product;
        name = result.value[0];
        title = result.value[1];
        msg = result.value[2];
        let url = "/add_comment";
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