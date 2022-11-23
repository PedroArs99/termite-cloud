import { DomainObject } from "src/modules/common/DomainObject.model";

export class HomeConfig extends DomainObject {
  private constructor(
    readonly bridgeState: 'online' | 'offline',
    readonly permitJoin: boolean,
  ) {
    super()
  }

  updateBridgeState(bridgeState: 'online' | 'offline'): HomeConfig {
    return new HomeConfig(bridgeState, this.permitJoin);
  }

  updateBridgeInfo(permitJoin: boolean): HomeConfig {
    return new HomeConfig(this.bridgeState, permitJoin);
  }

  static create(
    bridgeState: 'online' | 'offline',
    permitJoin: boolean,
  ): HomeConfig {
    return new HomeConfig(bridgeState, permitJoin);
  }
}
