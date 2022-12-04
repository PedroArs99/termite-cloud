import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { Device } from '../../models/Device.model';
import { DeviceService } from '../ports/Device.service';

export class GetDevicesEventSourceQuery {
  constructor() {}
}

@QueryHandler(GetDevicesEventSourceQuery)
export class GetDevicesEventSourceHandler
  implements IQueryHandler<GetDevicesEventSourceQuery, Observable<Device>>
{
  constructor(@Inject('DeviceService') private deviceService: DeviceService) {}

  async execute(_: GetDevicesEventSourceQuery): Promise<Observable<Device>> {
    return this.deviceService.eventSource;
  }
}
