import { Controller, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { BridgeState } from "../domain/BridgeState.model";

@Controller({})
export class HomeStateMqttController {
    logger = new Logger(HomeStateMqttController.name);

    @MessagePattern('zigbee2mqtt/bridge/state')
    retainZigbee2MqttBridgeState(@Payload() state: string){
        this.logger.log(`zigbee2mqtt/bridge/state: ${JSON.parse(state).state}`)
    }
}