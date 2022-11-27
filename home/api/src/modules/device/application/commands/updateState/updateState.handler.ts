import { Inject, Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Device } from "src/modules/device/models/Device.model";
import { DeviceRepository } from "../../ports/Device.repository";
import { UpdateDeviceStateCommand } from "./updateState.command";

@CommandHandler(UpdateDeviceStateCommand)
export class UpdateDeviceStateHandler implements ICommandHandler<UpdateDeviceStateCommand, Device> {
    private logger = new Logger(UpdateDeviceStateHandler.name);

    constructor(@Inject("DeviceRepository") private deviceRepo: DeviceRepository){}

    async execute(command: UpdateDeviceStateCommand): Promise<Device> {
        let device = await this.deviceRepo.findByFriendlyName(command.friendlyName)
        
        return device
    }
    
}