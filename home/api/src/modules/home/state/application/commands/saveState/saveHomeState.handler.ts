import { SaveHomeStateCommand } from "./saveHomeState.command";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CacheManagerPort } from "../../ports/CacheManager.port";

@CommandHandler(SaveHomeStateCommand)
export class SaveHomeStateCommandHandler implements ICommandHandler<SaveHomeStateCommand> {
    constructor(private cacheManager: CacheManagerPort){}

    async execute(command: SaveHomeStateCommand) {
        this.cacheManager.set(command.key, command.value)
    }
}