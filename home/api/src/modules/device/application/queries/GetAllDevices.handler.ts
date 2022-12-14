import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Device } from '../../models/Device.model';
import { DeviceRepository } from '../ports/Device.repository';

export class GetAllDevicesQuery {
  constructor(){}
}

@QueryHandler(GetAllDevicesQuery)
export class GetAllDevicesHandler
  implements IQueryHandler<GetAllDevicesQuery, Array<Device>>
{
  constructor(
    @Inject('DeviceRepository') private deviceRepo: DeviceRepository,
  ) {}

  async execute(_: GetAllDevicesQuery): Promise<Device[]> {
    const results = await this.deviceRepo.findAll();

    const sortedResults = results.sort((d1, d2) =>
      d1.friendlyName.localeCompare(d2.friendlyName),
    );

    return sortedResults;
  }
}
