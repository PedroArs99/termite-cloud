import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Device } from "src/modules/device/models/Device.model";
import { UpdateDeviceStateCommand } from "./updateState.command";

@CommandHandler(UpdateDeviceStateCommand)
export class UpdateDeviceStateHandler implements ICommandHandler<UpdateDeviceStateCommand, Device> {
    
    async execute(command: UpdateDeviceStateCommand): Promise<Device> {
        throw new Error("Method not implemented.");
    }
    
}