import { OnEvent } from "@nestjs/event-emitter";
import { OnGatewayInit, WebSocketGateway } from "@nestjs/websockets";
import { DeviceEvent } from "../../models/Device.event";
import { Namespace } from "socket.io"

@WebSocketGateway({ namespace: "/events"})
export class DeviceWebSocketsGateway implements OnGatewayInit<Namespace> {
    private namespace!: Namespace;

    afterInit(namespace: Namespace) {
        this.namespace = namespace
    }

    @OnEvent("device")
    notifyDeviceChange(_: DeviceEvent): void{
        this.namespace.emit("device");
    }
}