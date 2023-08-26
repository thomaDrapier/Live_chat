from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def websocket_connect(self, message):
       self.room_group_name = "general_chat"
       await self.channel_layer.group_add(self.room_group_name, self.channel_name)
       await self.accept()
       print("Websocket connection opened")

    async def websocket_receive(self, text_data):
        # Le message est reçu sous la forme d'un dic
        # {'type' : 'websocket_receive', 'text' : '{"message": "ceci est le message"}'}
        # json.loads est utilisé pour parser un objet json, text_data est un dic python donc pas possible
        # d'utiliser directement la méthode dessus.
        # Mais la valeur de la clé 'text' est un string JSON qui contient le message, on va donc parser la valeur de
        # cette clé : désérialiser -> on retrouve un dictionnaire python
        data = json.loads(text_data["text"])
        # data sous la forme d'un dictionnaire python {"message" : "ceci est le message"}
        # Et on envoit ensuite à tout les websocket du même groupe
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": data["message"]
            }
        )
        print("Data has been sent back to the websocket")

    async def chat_message(self, event):
        message = event["message"]
        print(message)
        # le message est émis sous la forme d'un dictionnaire puis sérialisé par json.dumps pour ensuite être envoyé
        # au client de la websocket.
        await self.send(json.dumps({"message": message}))
        print("données envoyées au client")

