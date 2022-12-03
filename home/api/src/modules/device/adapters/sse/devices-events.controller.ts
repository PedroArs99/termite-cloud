import { Controller, Sse } from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';

@Controller('/devices')
export class DevicesEventsController {
  
  @Sse('events')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({
        data: {
          date: new Date(),
        },
      } as MessageEvent)),
    );
  }
}
