import { HomeConfig } from '../../../models/HomeConfig.model';

export class HomeConfigRestDto {
  bridgeState: 'online' | 'offline';
  permitJoin: boolean;
  permitJoinTimeout: number;

  static fromDomain(homeConfig: HomeConfig): HomeConfigRestDto {
    return {
      bridgeState: homeConfig.bridgeState,
      permitJoin: homeConfig.permitJoin,
      permitJoinTimeout: homeConfig.permitJoinTimeout,
    };
  }
}
