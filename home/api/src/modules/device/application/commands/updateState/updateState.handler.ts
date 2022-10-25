import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Device } from "src/modules/device/models/Device.model";
import { DeviceRepository } from "../../ports/DeviceRepository.port";
import { UpdateDeviceStateCommand } from "./updateState.command";

@CommandHandler(UpdateDeviceStateCommand)
export class UpdateDeviceStateHandler implements ICommandHandler<UpdateDeviceStateCommand, Device> {
    
    constructor(@Inject("DeviceRepository") private deviceRepo: DeviceRepository){}

    async execute(command: UpdateDeviceStateCommand): Promise<Device> {
        let device = this.deviceRepo.findByFriendlyName(command.friendlyName)
        device = device.updateState(command.deviceState)

        this.deviceRepo.upsert(device)

        return device
    }
    
}