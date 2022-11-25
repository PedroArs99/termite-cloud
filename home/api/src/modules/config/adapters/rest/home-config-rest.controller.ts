import { Body, Controller, Get, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateBridgeInfoCommand } from '../../application/commands/updateBridgeInfo/UpdateBridgeInfo.command';
import { GetHomeConfigQuery } from '../../application/queries/getHomeConfig/GetHomeConfig.query';
import { HomeConfig } from '../../models/HomeConfig.model';
import { HomeConfigRestDto } from './models/HomeConfigRestDto.model';
import { UpdateHomeConfigDto } from './models/UpdateHomeConfig.dto';

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

  @Put()
  async togglePermitJoin(@Body() homeConfigDto: UpdateHomeConfigDto): Promise<HomeConfigRestDto> {    
    const homeConfig: HomeConfig = await this.commandBus.execute(
      new UpdateBridgeInfoCommand(homeConfigDto.permitJoin, true),
    );
    return HomeConfigRestDto.fromDomain(homeConfig);
  }
}
