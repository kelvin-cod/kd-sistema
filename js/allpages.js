var novaURL = "login.html";
var preview = "../images/user-white.jpg"


async function isloggedIn() {
    var user = {};
    let aberto, fechado;

    try {
        user = await JSON.parse(sessionStorage.getItem("user"));
    } catch (error) {
        console.log(error)
    }

    if (user == null) {
        $(window.document.location).attr('href', novaURL);
    } else {

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
window.onload = isloggedIn();

setTimeout(function () {
    isloggedIn();
}, 500);

$("#logout").click(() => {

    let url = "login.html";

    sessionStorage.removeItem('user');
    $(window.document.location).attr('href', url);
})