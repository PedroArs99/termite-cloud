import { Controller, Sse } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { GetDevicesEventSourceQuery } from '../../application/queries/GetDevicesEventSource.handler';
import { Device } from '../../models/Device.model';
import { DeviceDto } from '../rest/models/device-dto.model';

@Controller('/devices')
export class DevicesEventsController {
  constructor(private queryBus: QueryBus) {}

  @Sse('events')
  async getDevicesEventSource(): Promise<Observable<MessageEvent>> {
    const query = new GetDevicesEventSourceQuery();
    const eventSource: Observable<Device> = await this.queryBus.execute(query); 
    return eventSource.pipe(
      map(device => ({
        data: DeviceDto.fromDomain(device)
      }) as MessageEvent)
    )
  }
}
