var novaURL = "login.html";
window.onload = function () {
    var user = {};
    if (sessionStorage.user == null) {
        $(window.document.location).attr('href', novaURL);
        // 

        //

    } else {

        user = JSON.parse(sessionStorage.getItem("user"));
        console.log(user)
        document.getElementById("usuario_nome").innerHTML = user.Nome;
        document.getElementsByClassName(".usuario_nome").innerHTML = user.Nome
    }


}