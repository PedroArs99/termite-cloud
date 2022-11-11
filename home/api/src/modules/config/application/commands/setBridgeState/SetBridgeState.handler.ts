import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SetBridgeStateCommand } from "./SetBridgeState.command";
import { HomeConfigRepository } from "../../ports/HomeConfigRepository.port"
import { HomeConfig } from "../../../models/HomeConfig.model";

@CommandHandler(SetBridgeStateCommand)
export class SetBridgeStateHandler implements ICommandHandler<SetBridgeStateCommand> {
  constructor(@Inject("HomeConfigRepository") private repository: HomeConfigRepository) {}

    async execute(command: SetBridgeStateCommand): Promise<HomeConfig> {
    const config = HomeConfig.create(command.bridgeState)
    this.repository.save(config)

    return config
  }
}