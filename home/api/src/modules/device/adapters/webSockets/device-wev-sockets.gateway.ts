import { OnEvent } from '@nestjs/event-emitter';
import { OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
import { DeviceUpsertedEvent } from '../../models/DeviceUpserted.event';
import { Namespace } from 'socket.io';

@WebSocketGateway({
  namespace: '/events/devices',
  cors: true,
})
export class DeviceWebSocketsGateway implements OnGatewayInit<Namespace> {
  private namespace!: Namespace;

  afterInit(namespace: Namespace) {
    this.namespace = namespace;
  }

  @OnEvent('deviceUpserted')
  notifyDeviceChange(event: DeviceUpsertedEvent): void {
    this.namespace.emit(event.eventName);
  }
}
