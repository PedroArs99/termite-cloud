import { DomainObject } from "src/modules/common/DomainObject.model";

export class HomeConfig extends DomainObject {
  private constructor(
    readonly bridgeState: 'online' | 'offline',
    readonly permitJoin: boolean,
    readonly permitJoinTimeout: number,
  ) {
    super()
  }

  updateBridgeState(bridgeState: 'online' | 'offline'): HomeConfig {
    return new HomeConfig(bridgeState, this.permitJoin, this.permitJoinTimeout);
  }

  updateBridgeInfo(permitJoin: boolean, permitJoinTimeout: number): HomeConfig {
    return new HomeConfig(this.bridgeState, permitJoin, permitJoinTimeout);
  }

  static create(
    bridgeState: 'online' | 'offline',
    permitJoin: boolean,
    permitJoinTimeout: number,
  ): HomeConfig {
    return new HomeConfig(bridgeState, permitJoin, permitJoinTimeout);
  }
}
