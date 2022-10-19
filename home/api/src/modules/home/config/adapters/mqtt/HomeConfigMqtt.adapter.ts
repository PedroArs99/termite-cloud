import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class HomeConfigMqttController {
    private readonly logger = new Logger(HomeConfigMqttController.name)

    @MessagePattern('zigbee2mqtt/bridge/state')
    setBridgeState(@Payload() { state }: any) {
      this.logger.log(`Bridge State: ${JSON.stringify(state)}`)
    }
}