import { Injectable } from '@nestjs/common';
import { HomeConfig } from '../../models/HomeConfig.model';
import { HomeConfigRepository } from '../../application/ports/HomeConfigRepository.port';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Event } from '../../../common/Event.model';

@Injectable()
export class InMemoryHomeConfigRepository implements HomeConfigRepository {
  private homeConfig: HomeConfig;

  constructor(private readonly eventEmitter: EventEmitter2) {
    this.homeConfig = HomeConfig.create('offline', false);
  }

  get(): HomeConfig {
    return this.homeConfig;
  }

  save(homeConfig: HomeConfig): void {
    this.homeConfig = HomeConfig.create(
      homeConfig.bridgeState,
      homeConfig.permitJoin,
    );

    this.triggerEvents(homeConfig);
  }

  private triggerEvents(homeConfig: HomeConfig): void;
  private triggerEvents(homeConfig: Array<HomeConfig>): void;
  private triggerEvents(homeConfig: HomeConfig | Array<HomeConfig>): void {
    if (!Array.isArray(homeConfig)) homeConfig = [homeConfig];

    homeConfig
      .map((device) => device.getEvents())
      .flat()
      .reduce((acc, event) => (acc.includes(event) ? acc : [...acc, event]), [])
      .forEach((event: Event) =>
        this.eventEmitter.emit(event.eventName, event),
      );
  }
}
