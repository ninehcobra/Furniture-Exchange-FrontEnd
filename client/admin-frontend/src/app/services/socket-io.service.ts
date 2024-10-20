import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  private socket: Socket;

  constructor() {}

  connect(): void {
    this.socket = io(environment.SOCKET_URL);

    this.socket.on('connect', () => {
      console.log('Connected to server via Socket.IO');
    });

    this.socket.on('newMessage', (data: any) => {
      console.log('Message from server:', data);
    });
  }

  sendMessage(msg: any): void {
    this.socket.emit('newMessage', msg);
  }

  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      console.log('Listening for event:', eventName);
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  joinRoom(roomId: string): void {
    this.socket.emit('joinRoom', roomId);
  }
}
