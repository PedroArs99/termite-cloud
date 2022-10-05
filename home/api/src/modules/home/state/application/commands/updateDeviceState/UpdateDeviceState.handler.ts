import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Device } from "../../../domain/device/Device.model";
import { HomeStateCacheKeys } from "../../../domain/HomeState.model";
import { CacheManagerPort } from "../../ports/CacheManager.port";
import { UpdateDeviceStateCommand } from "./UpdateDeviceState.command";

@CommandHandler(UpdateDeviceStateCommand)
export class UpdateDeviceStateCommandHandler implements ICommandHandler<UpdateDeviceStateCommand> {
    constructor(private cacheManager: CacheManagerPort){}
    
    async execute(command: UpdateDeviceStateCommand): Promise<any> {
        // Filter coordinator devices
        const devices: Device[] = this.cacheManager.get(HomeStateCacheKeys.devices)
        const device = devices.find((device) => device.friendlyName === command.friendly_name)

        device.state = command.state;

        this.cacheManager.set(HomeStateCacheKeys.devices, devices);
    }
}