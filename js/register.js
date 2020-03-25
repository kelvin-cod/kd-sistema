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

$("#fot").change(function () {

    let aux = encodeImgtoBase64(this)


    console.log(aux)

    /*
        var file = $("#foto")[0].files[0];
        var blob = $(file).imageBlob().blob();
        console.log(blob);
        */
});