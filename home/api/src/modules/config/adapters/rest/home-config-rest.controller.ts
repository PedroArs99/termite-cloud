import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetHomeConfigQuery } from '../../application/queries/getHomeConfig/GetHomeConfig.query';
import { HomeConfig } from '../../models/HomeConfig.model';
import { HomeConfigRestDto } from './models/HomeConfigRestDto.model';

@Controller('/config')
export class HomeConfigRestController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getHomeConfig(): Promise<HomeConfigRestDto> {
    const homeConfig: HomeConfig = await this.queryBus.execute(
      new GetHomeConfigQuery(),
    );
    return HomeConfigRestDto.fromDomain(homeConfig);
  }
}
