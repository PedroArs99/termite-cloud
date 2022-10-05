import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { HomeStateCacheKeys } from "../../../domain/HomeState.model";
import { CacheManagerPort } from "../../ports/CacheManager.port";
import { RegisterDevicesCommand } from "./registerDevices.command";

@CommandHandler(RegisterDevicesCommand)
export class RegisterDevicesCommandHandler implements ICommandHandler<RegisterDevicesCommand> {
    constructor(private cacheManager: CacheManagerPort){}
    
    async execute(command: RegisterDevicesCommand): Promise<any> {
        // Filter coordinator devices
        const devices = command.devices.filter(device => device.type !== 'Coordinator');

        this.cacheManager.set(HomeStateCacheKeys.devices, devices);
    }
}