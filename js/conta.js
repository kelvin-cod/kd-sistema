try {
    var user = JSON.parse(sessionStorage.user);
    $("#nome").val(user.Nome);
    $("#email").val(user.Email);
    $("#email_recuperacao").val(user.Email_recuperacao);
    $("#foto").val();
} catch (error) {
    console.log(error)
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#image').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
var result;

function encodeImgtoBase64(element) {
    readURL(element);

    var img = element.files[0];

    var reader = new FileReader();

    reader.onloadend = function () {
        result = reader.result;
        console.log(result)
    }
    reader.readAsDataURL(img);
}