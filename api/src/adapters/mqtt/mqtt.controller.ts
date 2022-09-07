import {
  Controller,
  Logger,
} from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class MqttController {
  private logger = new Logger(MqttController.name);

  @MessagePattern('zigbee2mqtt/bridge/state')
  getNotifications(
    @Payload() state: any,
    @Ctx() context: MqttContext,
  ) {
    this.logger.log(`MQTT message received on ${context.getTopic()}: ${JSON.stringify(state)}`);
  }
}
