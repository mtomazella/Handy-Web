//const imageNames = ["tccRender", "tccRender2", "tccRender3", "tccRender4", "tccRenderCortado3", "tccRenderCortado4"];
const galeria = document.getElementById("galleryImages");
var qGatos = 13;
var htmlIn = "";

for ( var i = 1; i <= qGatos-1; i++ ){

    htmlIn += '<img class="galleryImage rounded" id="'+i+'" src="../gatos/'+i+'.jpg">';

}

galeria.innerHTML += htmlIn;
//console.log(htmlIn);
//galeria.style.backgroundColor = "gray";