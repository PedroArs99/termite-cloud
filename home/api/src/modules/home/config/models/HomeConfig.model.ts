export class HomeConfig {
  private constructor(private readonly bridgeState: 'online' | 'offline') {}

  static create(bridgeState: "online" | "offline"): HomeConfig{
    return new HomeConfig(bridgeState);
  }
}
