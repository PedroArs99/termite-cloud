import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HomeConfig } from 'src/modules/config/models/HomeConfig.model';
import { BridgeInfoUpdatedEvent } from 'src/modules/config/models/HomeConfigUpdated.event';
import { HomeConfigRepository } from '../../ports/HomeConfigRepository.port';

export class UpdateBridgeInfoCommand {
  constructor(
    readonly permitJoin: boolean,
    readonly publishNewState: boolean = false
  ) {}
}

@CommandHandler(UpdateBridgeInfoCommand)
export class UpdateBridgeInfoCommandHandler
  implements ICommandHandler<UpdateBridgeInfoCommand, HomeConfig>
{
  constructor(
    @Inject('HomeConfigRepository')
    private readonly configRepo: HomeConfigRepository,
  ) {}

  async execute(command: UpdateBridgeInfoCommand): Promise<HomeConfig> {
    let config = this.configRepo.get();
    const updatedConfig = config.updateBridgeInfo(command.permitJoin);

    if(command.publishNewState){
      updatedConfig.addEvent(new BridgeInfoUpdatedEvent(updatedConfig))
    }

    this.configRepo.save(updatedConfig);

    return config;
  }
}
