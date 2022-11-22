import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HomeConfig } from 'src/modules/config/models/HomeConfig.model';
import { HomeConfigRepository } from '../../ports/HomeConfigRepository.port';

export class UpdateBridgeInfoCommand {
  constructor(
    readonly permitJoin: boolean,
    readonly permitJoinTimeout: number,
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
    const updatedConfig = config.updateBridgeInfo(command.permitJoin, command.permitJoinTimeout);

    this.configRepo.save(updatedConfig);

    return config;
  }
}
