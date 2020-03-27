var novaURL = "login.html";
var preview = "../images/user-white.jpg"
window.onload = function () {
    var user = {};
    let aberto, fechado;
    if (sessionStorage.user == null) {
        $(window.document.location).attr('href', novaURL);
    } else {
        user = JSON.parse(sessionStorage.getItem("user"));

        if (user.Foto == "") {
            user.Foto = preview
        }
        let imagem = '<img src="' + user.Foto + '" alt="user Foto" />'


        $("#usuario_nome").append(user.Nome);
        $(".usuario_nome").append(user.Nome);

        $(".usuario_email").append(user.Email);
        $(".usuario_foto").append(imagem);
    }

    if (localStorage.venda == null) {
        fechado = '<div class="bg-danger"><p class="text-center text-white p-1">Balcão Fechado</p></div>';
        $("#balcaoVendas").append(fechado)

    } else {
        aberto = '<div class="bg-success"><p class="text-center text-white p-1">Balcão Aberto</p></div>';
        $("#balcaoVendas").append(aberto)
    }

}
$("#logout").click(() => {

    let url = "login.html";

    sessionStorage.removeItem('user');
    $(window.document.location).attr('href', url);
})