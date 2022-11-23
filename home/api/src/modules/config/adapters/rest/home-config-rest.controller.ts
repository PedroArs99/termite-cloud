import { Controller, Get, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateBridgeInfoCommand } from '../../application/commands/updateBridgeInfo/UpdateBridgeInfo.command';
import { GetHomeConfigQuery } from '../../application/queries/getHomeConfig/GetHomeConfig.query';
import { HomeConfig } from '../../models/HomeConfig.model';
import { HomeConfigRestDto } from './models/HomeConfigRestDto.model';

@Controller('/config')
export class HomeConfigRestController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async getHomeConfig(): Promise<HomeConfigRestDto> {
    const homeConfig: HomeConfig = await this.queryBus.execute(
      new GetHomeConfigQuery(),
    );
    return HomeConfigRestDto.fromDomain(homeConfig);
  }

  @Put('/permitJoin')
  async togglePermitJoin(): Promise<HomeConfigRestDto> {
    const homeConfig: HomeConfig = await this.commandBus.execute(
      new UpdateBridgeInfoCommand(true, 0, true),
    );
    return HomeConfigRestDto.fromDomain(homeConfig);
  }
}
