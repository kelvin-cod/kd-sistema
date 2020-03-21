var novaURL = "login.html";

window.onload = function () {
    var user = {};
    let aberto, fechado;
    if (sessionStorage.user == null) {
        $(window.document.location).attr('href', novaURL);
    } else {
        user = JSON.parse(sessionStorage.getItem("user"));

        $("#usuario_nome").append(user.Nome);
        $(".usuario_nome").append(user.Nome);

        $(".usuario_email").append(user.Email);
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