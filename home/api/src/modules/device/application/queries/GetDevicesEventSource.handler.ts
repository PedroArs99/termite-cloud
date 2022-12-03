import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { interval, map, Observable } from 'rxjs';
import { Device } from '../../models/Device.model';

export class GetDevicesEventSourceQuery {
  constructor() {}
}

@QueryHandler(GetDevicesEventSourceQuery)
export class GetDevicesEventSourceHandler
  implements IQueryHandler<GetDevicesEventSourceQuery, Observable<MessageEvent>>
{
  constructor() {}

  async execute(_: GetDevicesEventSourceQuery): Promise<Observable<MessageEvent>> {
    return interval(1000).pipe(
      map(
        (_) =>
          ({
            data: {
              date: new Date(),
            },
          } as MessageEvent),
      ),
    );
  }
}
