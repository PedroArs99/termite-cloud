export class HomeConfig {
  private constructor(readonly bridgeState: 'online' | 'offline') {}

  setBridgeState(bridgeState: "online" | "offline"): HomeConfig {
    return {
      ...this,
      bridgeState
    }
  }

  static create(bridgeState: "online" | "offline"): HomeConfig{
    return new HomeConfig(bridgeState);
  }
}
