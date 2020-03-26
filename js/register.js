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

$("#submit").click(function () {
    var obj = {
        nome: '',
        email: '',
        password: '',
        email_recuperacao: '',
        foto: ''
    }
    let aux = $("#foto")[0].files[0];;


    obj.nome = $("#nome").val();
    obj.email = $("#email").val();
    obj.password = $("#password").val();
    obj.email_recuperacao = $("#email_recuperacao").val();
    obj.foto = result;
    // var post_url = "http://localhost:3000/user/create";

    // let img_url = "https://api.imgbb.com/1/upload?key=cc6802445a8fe48713fbbf176fa47179";

    var post_url = "https://kd-gerenciador.herokuapp.com/user/create";



    $.ajax({
        url: post_url,
        type: 'POST',
        data: obj
    }).done(function (response) { //

        //document.location.reload();
        window.location.href = "login.html";

    });
});