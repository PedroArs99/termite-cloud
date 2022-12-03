import { Controller, Sse } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { GetDevicesEventSourceQuery } from '../../application/queries/GetDevicesEventSource.handler';

@Controller('/devices')
export class DevicesEventsController {
  constructor(private queryBus: QueryBus) {}

  @Sse('events')
  async getDevicesEventSource(): Promise<Observable<MessageEvent>> {
    const query = new GetDevicesEventSourceQuery();
    return await this.queryBus.execute(query);
  }
}
