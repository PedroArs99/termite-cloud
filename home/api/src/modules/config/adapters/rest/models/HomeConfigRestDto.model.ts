import { HomeConfig } from '../../../models/HomeConfig.model';

export class HomeConfigRestDto {
  bridgeState: 'online' | 'offline';
  permitJoin: boolean;

  static fromDomain(homeConfig: HomeConfig): HomeConfigRestDto {
    return {
      bridgeState: homeConfig.bridgeState,
      permitJoin: homeConfig.permitJoin,
    };
  }
}
