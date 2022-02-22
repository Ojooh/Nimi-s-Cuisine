import { swalShowError, swalShowLoading, validateName, validateNamey, validInteger, validFloat, isImage } from './helper.js';

jQuery(document).ready(function ($) {
    var add = $("#productMdl");
    var errorClass = "swal2-validation-message";
    var active = $(".active");
    var edit = $(".edit");
    var remove = $(".remove");
    var pry = $("body #swal-input5").val();

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

    $(document).on('keyup', '#swal-input5', function (e) {
        if (e.target.value != "" && e.target.value != undefined) {
            pry = $("body #swal-input5").val();
        }
    });

    $(document).on('keyup', '#swal-input6', function (e) {
        if (e.target.value != "" && e.target.value != undefined) {
            console.log
            var d = parseFloat(e.target.value);
            var p = parseFloat(pry);
            var new_p = ((p - (d / 100) * p));
            $("body #swal-input5").val(new_p);
        }
    });




    function setCatOptions(options, category = null) {
        console.log(category)
        let data = JSON.parse(options);

        let opt = "";

        for (var o = 0; o < data.length; o++) {
            if (category != null && parseInt(data[o].id) == parseInt(category)) {
                opt += "<option value='" + data[o].name + "' selected>" + data[o].name + "</option>";
            } else {
                opt += "<option value='" + data[o].name + "'>" + data[o].name + "</option>";
            }
        }
        console.log(opt);
        return opt;
    }


    add.on("click", async function (e) {
        e.preventDefault();
        e.stopPropagation();

        let name, link, price, discount, qty, qty_name, variation, category, desc = "";
        let catOptions = setCatOptions($(this).attr("data-cats"));


        Swal.fire({
            title: 'Create New Product',
            html:
                '<div class="prod-add-img"><img id="previewImg" src="/img/prds/default.png" class="img-fluid" /></div>' +
                '<label for="swal-input1"> Product Name </label>' +
                '<input id="swal-input1" class="swal2-input" type="text">' +
                '<label for="swal-input2"> Product Image </label>' +
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
                    swalShowError("Product Name is not valid", errorClass);
                }
                else if (!state2) {
                    swalShowError("Product Image is not valid", errorClass);
                }
                else {
                    return [namey, linky];
                }
            },
        }).then(function (result) {
            name = result.value[0];
            link = result.value[1];

            if (name && name != "" && link && link != undefined) {
                Swal.fire({
                    title: 'Create New Product',
                    html:
                        '<div class="container"><div class="form-row">' +
                        '<div class="col-md-6"><label for="swal-input3" class="mb-2"> Product Total Quantity </label>' +
                        '<input id="swal-input3" class="swal2-input form-control" type="number"></div>' +
                        '<div class="col-md-6"><label for="swal-input4" class="mb-2"> Product Quantity Name </label>' +
                        '<input id="swal-input4" class="swal2-input form-control" type="text"></div>' +
                        '</div><div class="form-row">' +
                        '<div class="col-md-6"><label for="swal-input5" class="mb-2"> Product Price </label>' +
                        '<input id="swal-input5" class="swal2-input form-control" type="number"></div>' +
                        '<div class="col-md-6"><label for="swal-input6" class="mb-2"> Product Discount</label>' +
                        '<input id="swal-input6" class="swal2-input form-control" type="number">' +
                        '<small> Enter the discount in percentage e.g 10% enter 10 </small></div>' +
                        '</div',
                    focusConfirm: false,
                    showCancelButton: true,
                    showLoaderOnConfirm: true,
                    allowOutsideClick: false,
                    preConfirm: () => {
                        let state1, state2, state3, state4 = false;
                        var qtyy = document.getElementById('swal-input3').value;
                        var qty_namey = document.getElementById('swal-input4').value;
                        var pricey = document.getElementById('swal-input5').value;
                        var discy = document.getElementById('swal-input6').value;

                        state1 = validInteger(qtyy);
                        state2 = validateName(qty_namey);
                        state3 = validFloat(pricey);
                        state4 = validFloat(discy);

                        if (!state1) {
                            swalShowError("Product Quantity Input is not valid", errorClass);
                        }
                        else if (!state2 || qty_namey == "" || qty_namey == null) {
                            swalShowError("Product Quantity Name Input is not valid", errorClass);
                        }
                        else if (!state3) {
                            swalShowError("Product Price Input is not valid", errorClass);
                        }
                        else if (discy && discy != "" && discy != undefined && !state4) {
                            swalShowError("Product Discount Input is not valid", errorClass);
                        }
                        else {
                            return [qtyy, qty_namey, pricey, discy];
                        }
                    },
                }).then(function (result) {
                    qty = result.value[0];
                    qty_name = result.value[1];
                    price = result.value[2];
                    discount = result.value[3];

                    if (qty && qty_name && price) {

                        Swal.fire({
                            title: 'Create New Product',
                            html:
                                '<div class="container"><div class="form-row">' +
                                '<div class="col-md-12"><label for="swal-input7" class="mb-2"> Product Variations </label>' +
                                '<input id="swal-input7" class="swal2-input form-control" type="text">' +
                                '<small> Seperate product variations with a comma. </small></div>' +
                                '<div class="col-md-12"><label for="swal-input8"> Product Category </label>' +
                                '<select id="swal-input8" class="swal2-input form-control"><option value="">select</option>' + catOptions + '</select></div>' +
                                '<div class="col-md-12"><label for="swal-input9"> Product Description </label>' +
                                '<textarea id="swal-input9" row="8" style="height : 180px;" class="swal2-input"></textarea>' +
                                '</div',
                            focusConfirm: false,
                            showCancelButton: true,
                            showLoaderOnConfirm: true,
                            allowOutsideClick: false,
                            preConfirm: () => {
                                var variationsy = document.getElementById('swal-input7').value;
                                var categoryy = $('#swal-input8').val();
                                var descy = $('#swal-input9').val();
                                console.log(variationsy)


                                if (variationsy.length > 0 && variationsy.split(",").length <= 0) {
                                    swalShowError("Product Variation Input is not valid, end every variation with a comma", errorClass);
                                }
                                else if (categoryy == "") {
                                    swalShowError("No Category selected", errorClass);
                                }
                                else if (descy.length <= 0) {
                                    swalShowError("Product Description Input is not valid", errorClass);
                                }
                                else {
                                    return [variationsy, categoryy, descy];
                                }
                            },
                        }).then(function (result) {
                            variation = result.value[0];
                            category = result.value[1];
                            desc = result.value[2];
                            let url = "/admin/add_product";
                            let param = { url: url };
                            let data = new FormData()



                            data.append("name", name);
                            data.append("link", link);
                            data.append("price", pry);
                            data.append("discount", discount);
                            data.append("qty", qty);
                            data.append("qty_name", qty_name);
                            data.append("variation", variation);
                            data.append("category", category);
                            data.append("desc", desc);
                            data.append("type", "add");
                            param.data = data;
                            param.type = "post";
                            param.contentType = false;
                            param.processData = false;
                            // console.log(data)
                            param.beforeSend = function () {
                                swalShowLoading("Creating New Product", "Please wait, while Product is being created")
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
                        })
                    }

                });
            }
        });

    });

    active.on("change", function (e) {
        let url = "/admin/item/status";
        let data = { "item": "products", "name": $(this).attr("data-name"), "state": $(this).val(), "ID": $(this).attr("id") };

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
        let name = datas[0].trim();
        let link = datas[1].trim();
        let price = datas[2].trim();
        pry = price;
        let discount = datas[3].trim();
        let qty = datas[4].trim();
        let qty_name = datas[5].trim();
        let variation = datas[6].trim();
        let category = datas[7].trim();
        let desc = datas[8].trim();
        let prd_id = datas[9];
        let change;
        let catOptions = setCatOptions(add.attr("data-cats"), category);


        Swal.fire({
            title: 'Edit ' + prd_id + ' Product',
            html:
                '<div class="prod-add-img"><img id="previewImg" src="' + link + '" class="img-fluid" /></div>' +
                '<label for="swal-input1"> Product Name </label>' +
                '<input id="swal-input1" value="' + name + '" class="swal2-input" type="text">' +
                '<label for="swal-input2"> Product Image </label>' +
                '<input id="swal-input2" value="' + link + '" class="swal2-input" type="file">',
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
                    swalShowError("Product Name is not valid", errorClass);
                }
                else if (linky && linky !== undefined && !state2) {
                    swalShowError("Product Image is not valid", errorClass);
                }
                else {
                    if (namey == name && !linky && linky === undefined) {
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
                Swal.fire({
                    title: 'Edit ' + prd_id + ' Product',
                    html:
                        '<div class="container"><div class="form-row">' +
                        '<div class="col-md-6"><label for="swal-input3" class="mb-2"> Product Total Quantity </label>' +
                        '<input id="swal-input3" value="' + qty + '" class="swal2-input form-control" type="number"></div>' +
                        '<div class="col-md-6"><label for="swal-input4" class="mb-2"> Product Quantity Name </label>' +
                        '<input id="swal-input4" value="' + qty_name + '" class="swal2-input form-control" type="text"></div>' +
                        '</div><div class="form-row">' +
                        '<div class="col-md-6"><label for="swal-input5" class="mb-2"> Product Price </label>' +
                        '<input id="swal-input5" value="' + price + '" class="swal2-input form-control" type="number"></div>' +
                        '<div class="col-md-6"><label for="swal-input6" class="mb-2"> Product Discount</label>' +
                        '<input id="swal-input6" value="' + discount + '" class="swal2-input form-control" type="number">' +
                        '<small> Enter the discount in percentage e.g 10% enter 10 </small></div>' +
                        '</div',
                    focusConfirm: false,
                    showCancelButton: true,
                    showLoaderOnConfirm: true,
                    allowOutsideClick: false,
                    preConfirm: () => {
                        let state1, state2, state3, state4 = false;
                        var qtyy = document.getElementById('swal-input3').value;
                        var qty_namey = document.getElementById('swal-input4').value;
                        var pricey = document.getElementById('swal-input5').value;
                        var discy = document.getElementById('swal-input6').value;

                        state1 = validInteger(qtyy);
                        state2 = validateName(qty_namey);
                        state3 = validFloat(pricey);
                        state4 = validFloat(discy);

                        if (!state1) {
                            swalShowError("Product Quantity Input is not valid", errorClass);
                        }
                        else if (!state2 || qty_namey == "" || qty_namey == null) {
                            swalShowError("Product Quantity Name Input is not valid", errorClass);
                        }
                        else if (!state3) {
                            swalShowError("Product Price Input is not valid", errorClass);
                        }
                        else if (discy && discy != "" && discy != undefined && !state4) {
                            swalShowError("Product Discount Input is not valid", errorClass);
                        }
                        else {
                            if (change == false && qtyy == qty && qty_namey == qty_name && pricey == price && discy == discount) {
                                change = false;
                            } else {
                                change = true;
                            }
                            return [qtyy, qty_namey, pricey, discy];
                        }
                    },
                }).then(function (result) {
                    qty = result.value[0];
                    qty_name = result.value[1];
                    price = result.value[2];
                    discount = result.value[3];

                    if (qty && qty_name && price) {

                        Swal.fire({
                            title: 'Edit ' + prd_id + ' Product',
                            html:
                                '<div class="container"><div class="form-row">' +
                                '<div class="col-md-12"><label for="swal-input7" class="mb-2"> Product Variations </label>' +
                                '<input id="swal-input7" value="' + variation + '" class="swal2-input form-control" type="text">' +
                                '<small> Seperate product variations with a comma. </small></div>' +
                                '<div class="col-md-12"><label for="swal-input8"> Product Category </label>' +
                                '<select id="swal-input8" class="swal2-input form-control"><option value="">select</option>' + catOptions + '</select></div>' +
                                '<div class="col-md-12"><label for="swal-input9"> Product Description </label>' +
                                '<textarea id="swal-input9" row="8" style="height : 180px;" class="swal2-input">' + desc + '</textarea>' +
                                '</div',
                            focusConfirm: false,
                            showCancelButton: true,
                            showLoaderOnConfirm: true,
                            allowOutsideClick: false,
                            preConfirm: () => {
                                var variationsy = document.getElementById('swal-input7').value;
                                var categoryy = $('#swal-input8').val();
                                var descy = $('#swal-input9').val();
                                console.log(descy)


                                if (variationsy.length > 0 && variationsy.split(",").length <= 0) {
                                    swalShowError("Product Variation Input is not valid, end every variation with a comma", errorClass);
                                }
                                else if (categoryy == "") {
                                    swalShowError("No Category selected", errorClass);
                                }
                                else if (descy.length <= 0) {
                                    swalShowError("Product Description Input is not valid", errorClass);
                                }
                                else {
                                    if (change == false && variationsy == variation && descy == desc) {
                                        change = false;
                                    } else {
                                        change = true;
                                    }
                                    return [variationsy, categoryy, descy];
                                }
                            },
                        }).then(function (result) {
                            variation = result.value[0];
                            category = result.value[1];
                            desc = result.value[2];
                            let url = "/admin/edit_product";
                            let param = { url: url };
                            let data = new FormData()



                            data.append("name", name);
                            data.append("link", link);
                            data.append("price", pry);
                            data.append("discount", discount);
                            data.append("qty", qty);
                            data.append("qty_name", qty_name);
                            data.append("variation", variation);
                            data.append("category", category);
                            data.append("desc", desc);
                            data.append("ID", ID);
                            data.append("type", "edit");
                            param.data = data;
                            param.type = "post";
                            param.contentType = false;
                            param.processData = false;
                            // console.log(data)
                            param.beforeSend = function () {
                                swalShowLoading("Creating New Product", "Please wait, while Product is being created")
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

                        })
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
        let data = { extra: "product", "item": "products", "item_name": "Product", "name": $(this).attr("data-name"), "ID": ID };

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