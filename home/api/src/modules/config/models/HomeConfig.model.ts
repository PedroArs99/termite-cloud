export class HomeConfig {
  private constructor(readonly bridgeState: 'online' | 'offline') {}

  updateBridgeState(bridgeState: "online" | "offline"): HomeConfig {
    return {
      ...this,
      bridgeState
    }
  }

  static create(bridgeState: "online" | "offline"): HomeConfig{
    return new HomeConfig(bridgeState);
  }
}
