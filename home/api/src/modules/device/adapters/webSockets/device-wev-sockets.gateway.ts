import { OnEvent } from "@nestjs/event-emitter";
import { OnGatewayInit, WebSocketGateway } from "@nestjs/websockets";
import { DeviceUpsertedEvent } from "../../models/DeviceUpserted.event";
import { Namespace } from "socket.io"

@WebSocketGateway({ 
    namespace: "/events",
    cors: true
})
export class DeviceWebSocketsGateway implements OnGatewayInit<Namespace> {
    private namespace!: Namespace;

    afterInit(namespace: Namespace) {
        this.namespace = namespace
    }

    @OnEvent("device")
    notifyDeviceChange(_: DeviceUpsertedEvent): void{
        this.namespace.emit("device");
    }
}