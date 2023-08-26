let chat_box = document.querySelector(".chat_box")
let name_box = document.querySelector(".name_box")


chat_box.addEventListener("click", function(){
let chatroom_name = name_box.value
let websocket = new WebSocket("ws://"+ window.location.host+"/ws/"+`${name_box.value}`)
websocket.onopen
document.location.replace(`http://127.0.0.1:8000/chat/${chatroom_name}`)})