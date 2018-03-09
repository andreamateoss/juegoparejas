const arrayPersonajes = [
    { 
        nombre:"abra",
        rutaImagen: "img/abra.png",},
    { 
        nombre:"bullbasaur",
        rutaImagen: "img/bullbasaur.png",},
    { 
        nombre:"charmander",
        rutaImagen: "img/charmander.png",},
    { 
        nombre:"dratini",
        rutaImagen: "img/dratini.png",},
    { 
        nombre:"eevee",
        rutaImagen: "img/eevee.png",},
    { 
        nombre:"jigglypuff",
        rutaImagen: "img/jigglypuff.png",},
    { 
        nombre:"mankey",
        rutaImagen: "img/mankey.png",},
    { 
        nombre:"meowth",
        rutaImagen: "img/meowth.png",},
    { 
        nombre:"pidgey",
        rutaImagen: "img/pidgey.png",},
    { 
        nombre:"pikachu",
        rutaImagen: "img/pikachu-2.png",},
    { 
        nombre:"psyduck",
        rutaImagen: "img/psyduck.png",},
    { 
        nombre:"squirtle",
        rutaImagen: "img/squirtle.png",},
    
]

// CONSTANTES
const game = document.getElementById("game");/*donde estan metidas las bolas*/
/* esto significa que vamos a crear un elemento con clase rejilla como en css*/
const rejilla = document.createElement("section");/*las rejillas son las bolas*/
const ganador = document.getElementById("ganador");//imagen final pokemon cuando ganas

// VARIABLES:
var contador = 0;
var primerSeleccionado = "";
var segundoSeleccionado = "";
var selPrevio = null;
var segundos = 10;
var song = document.getElementById("song");
var winner = document.getElementById("winner");
var fail = document.getElementById("fail");
var boton = document.getElementById("boton");

//CREACIÓN DE CLASE REJILLA Y DIVS PARA CADA POKEMON
rejilla.setAttribute("class", "rejilla");
game.appendChild(rejilla);
const doblePersonajes = arrayPersonajes.concat(arrayPersonajes).sort(() => 0.5 - Math.random());//para tener el doble de pokemon para crear las parejas, porque solo tenemos 12



doblePersonajes.forEach(personaje => {
    const { nombre, rutaImagen } = personaje;
    tarjeta = document.createElement("div");
    tarjeta.classList.add ("tarjeta");
    tarjeta.dataset.name = nombre;
    /*Para que se den la vuelta los muñecos*/
    anverso = document.createElement("div");
    anverso.classList.add("anverso");
    reverso = document.createElement("div");
    reverso.classList.add("reverso");
    reverso.style.backgroundImage = `url(${rutaImagen})`;

    rejilla.appendChild(tarjeta);
    tarjeta.appendChild(anverso);
    tarjeta.appendChild(reverso);});

// LOGICA PARA EL EVENTO DE CLIC DE SELECCION DE CADA PERSONAJE
rejilla.addEventListener("click", function(evento){
    var seleccionado = evento.target;
    if(seleccionado.nodeName === "SECTION" || 
        seleccionado.parentNode === selPrevio ||
        seleccionado.parentNode.classList.contains("eliminado")){
        contEliminados();    
        return;}
    if (contador < 2){
        contador++;
    if(contador === 1){
        primerSeleccionado = seleccionado.parentNode.dataset.name;
        seleccionado.parentNode.classList.add("seleccionado");
    } else{
            segundoSeleccionado = seleccionado.parentNode.dataset.name;
            seleccionado.parentNode.classList.add("seleccionado");}

    if (primerSeleccionado !== "" && segundoSeleccionado !== ""){
        if(primerSeleccionado === segundoSeleccionado){
            setTimeout(eliminar,1200);
            setTimeout(resetSelec,1200);
            contadorEliminados();
        } else {
           setTimeout(resetSelec,1200);}}
        selPrevio = seleccionado.parentNode;
        selPrevio = null;}});// esto es para que le pueda volver a dar a la misma pokebal que le acabo de dar

// FUNCIÓN PARA ASIGNAR LA CLASE ELIMINADO CUANDO EXISTAN 2 COINCIDENCIAS
var eliminar = function(){
    var eliminados = document.querySelectorAll(".seleccionado");
    eliminados.forEach(eliminado => {
        eliminado.classList.add("eliminado");});}

// FUNCIÓN PARA RESETEAR LOS SELECCIONADOS PARA CUANDO NO COINCIDAN
var resetSelec = function(){
    primerSeleccionado = "";
    segundoSeleccionado= "";
    contador = 0;
    /*con esto si fallo ya no me deja seleccionar mas*/
    var seleccionado = document.querySelectorAll(".seleccionado");
    seleccionado.forEach(seleccionado => {
        seleccionado.classList.remove("seleccionado");});}

// FUNCIÓN PARA CONTAR LOS ELIMINADOS Y DETERMINAR CUANDO ACABA EL JUEGO CON ÉXITO
var contadorEliminados = function(){
    var eliminados = document.querySelectorAll(".eliminado").length + 2;
    if (eliminados === 2){ //24  son los 24 aciertos puedo poner que se gane con los aciertos que ponga hay
        ganador.classList.add("open");
    song.pause();
    winner.play();
    document.getElementById("reloj").style.display ="none";
    over.style.visibility = "hidden"; //hidden = oculto
    fail.stop();
}}

//FUNCIÓN DE RELOJ CUENTA ATRÁS
function reloj(){
    var s = parseInt(segundos % 60);
    var ss = ("0" + s).slice(-2);
    var m =parseInt(segundos/60);
    var mm = ("0" + m).slice(-2);
    document.getElementById("reloj").innerHTML = mm + ":" + ss;
    rejilla.style.visibility = "visible";
    if(segundos > 0){
        var t = setTimeout(function(){
            reloj();},
        1000);}
        else{ 
            document.getElementById("game-over").innerHTML = "Game Over";
            document.getElementById("boton").disabled = false;
            segundos = 11;
            reiniciar();
            song.pause();
            song.currenTime = 0; /*para que empiece desde 0 al darle a volver a empezar*/
            fail.play();
            rejilla.style.visibility = "hidden";}//desaparecen las bolas cuando pierdo
        segundos--;}

//Función reiniciar
function reiniciar(){
    while (rejilla.firstChild){
        rejilla.removeChild(rejilla.firstChild);
    }
    const doblePersonajes = arrayPersonajes.concat(arrayPersonajes).sort(() => 0.5 - Math.random());
    
    var contador = 0;
    var primerSeleccionado = "";
    var segundoSeleccionado = "";
    var selPrevio = null;
    var segundos = 10;
    rejilla.setAttribute("class", "rejilla");
    game.appendChild(rejilla);
    
    doblePersonajes.forEach(personaje => {
        const { nombre, rutaImagen } = personaje;
        tarjeta = document.createElement("div");
        tarjeta.classList.add ("tarjeta");
        tarjeta.dataset.name = nombre;
        /*Para que se den la vuelta los muñecos*/
        anverso = document.createElement("div");
        anverso.classList.add("anverso");
        reverso = document.createElement("div");
        reverso.classList.add("reverso");
        reverso.style.backgroundImage = `url(${rutaImagen})`;
    
        rejilla.appendChild(tarjeta);
        tarjeta.appendChild(anverso);
        tarjeta.appendChild(reverso);});
}

// Música
boton.addEventListener("click",function(){
    song.play();
});