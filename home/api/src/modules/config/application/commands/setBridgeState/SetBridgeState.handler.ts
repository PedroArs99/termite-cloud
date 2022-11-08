import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SetBridgeStateCommand } from "./SetBridgeState.command";
import { HomeConfigRepository } from "../../ports/HomeConfigRepository.port"
import { HomeConfig } from "../../../models/HomeConfig.model";

@CommandHandler(SetBridgeStateCommand)
export class SetBridgeStateHandler implements ICommandHandler<SetBridgeStateCommand> {
  constructor(@Inject("HomeConfigRepository") private repository: HomeConfigRepository) {}

    async execute(command: SetBridgeStateCommand): Promise<HomeConfig> {
    const config = this.repository.get();
    this.repository.save(config.updateBridgeState(command.bridgeState))

    return config
  }
}