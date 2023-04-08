import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io'
import { OnModuleInit } from "@nestjs/common";

@WebSocketGateway({ cors: true })
export class MyGateway implements OnModuleInit{

  messages = []

  @WebSocketServer()
  server: Server

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id)
      console.log('Connected')
    })
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any){
    // this.messages.push(body)
    console.log(body)
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body
    })
  }
  // @SubscribeMessage('getAllMessages')
  // onGetAllMessages(@MessageBody() body: any){
  //   this.server.emit('onGetAllMessages',{
  //     messages: [...this.messages]
  //   })
  // }
}