let inscription_button = document.querySelector(".button_inscription");
let connexion_button = document.querySelector(".button_connection");
console.log(inscription_button);
console.log("hello");

inscription_button.addEventListener('click', function(){
    window.location = window.location.href + "inscription/"
    console.log("click")
}) 

connexion_button.addEventListener('click', function(){
    window.location = window.location.href + "connexion/"
    console.log("click")
})