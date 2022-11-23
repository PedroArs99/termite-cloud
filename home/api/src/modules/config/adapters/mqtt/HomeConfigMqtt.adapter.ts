import { Controller, Inject, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SetBridgeStateCommand } from '../../application/commands/setBridgeState/SetBridgeState.command';
import { UpdateBridgeInfoCommand } from '../../application/commands/updateBridgeInfo/UpdateBridgeInfo.command';
import { HomeConfigService } from '../../application/ports/HomeConfigService.port';
import { BridgeInfoUpdatedEvent } from '../../models/HomeConfigUpdated.event';

@Controller()
export class HomeConfigMqttController {
  private readonly logger = new Logger(HomeConfigMqttController.name);

  constructor(
    private commandBus: CommandBus,
    @Inject('HomeConfigService') private homeConfigService: HomeConfigService,
  ) {}

  @MessagePattern('zigbee2mqtt/bridge/info')
  updateBridgeInfo(@Payload() bridgeInfo: any) {
    const permitJoin = bridgeInfo['permit_join'];

    this.logger.log(
      `Bridge Info received: Permit Join[${permitJoin}]`,
    );

    const command = new UpdateBridgeInfoCommand(
      permitJoin,
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

  @OnEvent('bridgeInfoUpdated')
  updateDeviceMqttContext(event: BridgeInfoUpdatedEvent): void {
    this.homeConfigService.publishHomeConfig(event.config);
  }
}
