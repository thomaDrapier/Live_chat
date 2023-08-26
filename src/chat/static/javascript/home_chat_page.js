let button_send_message = document.querySelector('.button_send')
let input_message = document.querySelector('.input_message')

let websocket = new WebSocket(`ws://${window.location.host}`)

websocket.onopen = function() {
  alert('[open] Connection established');
};

button_send_message.addEventListener('click', function(){
    console.log("send button has been clicked")
    let message = input_message.value;
    try {
      messageObject = {"message" : message}
      // Le message est envoyé sous forme de string JSON au serveur
      websocket.send(JSON.stringify(messageObject));
      console.log(JSON.stringify(messageObject))
      console.log(`${message} : sent to the server`)
    } catch (error) {
      alert("Impossible d'envoyer le message")
      console.error("Erreur lors de l'envoie des données : ", error)
    }
})

websocket.onmessage = function(event){
  console.log("A message has been received")
  data = JSON.parse(event.data)
  alert(`[message] Data received from server: ${data.message}`);

};


websocket.onclose = function(event) {
    if (event.wasClean) {
      alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
      alert('[close] Connection died');
    }
  };
  
websocket.onerror = function(error) {
    alert(`[error]`);
  };

