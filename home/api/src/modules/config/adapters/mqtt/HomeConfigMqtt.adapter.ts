import { Controller, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SetBridgeStateCommand } from '../../application/commands/setBridgeState/SetBridgeState.command';
import { UpdateBridgeInfoCommand } from '../../application/commands/updateBridgeInfo/UpdateBridgeInfo.command';

@Controller()
export class HomeConfigMqttController {
  private readonly logger = new Logger(HomeConfigMqttController.name);

  constructor(private commandBus: CommandBus) {}

  @MessagePattern('zigbee2mqtt/bridge/info')
  updateBridgeInfo(@Payload() bridgeInfo: any) {
    const permitJoin = bridgeInfo['permit_join'];
    const permitJoinTimeout = bridgeInfo['permit_join_timeout'];

    this.logger.log(
      `Bridge Info received: Permit Join[${permitJoin}], Permit Join Timeout[${permitJoinTimeout}]`,
    );

    const command = new UpdateBridgeInfoCommand(
      permitJoin,
      permitJoinTimeout ? permitJoinTimeout : 0,
    );

    this.commandBus.execute(command);
  }

  @MessagePattern('zigbee2mqtt/bridge/state')
  setBridgeState(@Payload() { state }: any) {
    this.logger.log(`Bridge State received: ${JSON.stringify(state)}`);

    if (state !== 'online' && state !== 'offline') {
      throw new TypeError(`"${state} cannot be mapped to bridgeState`);
    }

    let command = new SetBridgeStateCommand(state);
    this.commandBus.execute(command);
  }
}
