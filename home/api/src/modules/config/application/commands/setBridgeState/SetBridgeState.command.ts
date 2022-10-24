export class SetBridgeStateCommand {
    constructor(
        readonly bridgeState: "online" | "offline"
    ){}
}