import { Inject, Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Device } from "src/modules/device/models/Device.model";
import { DeviceMqttContextUpdated } from "src/modules/device/models/events/DeviceMqttContextUpdated.event";
import { DeviceRepository } from "../../ports/DeviceRepository.port";
import { UpdateDeviceStateCommand } from "./updateState.command";

@CommandHandler(UpdateDeviceStateCommand)
export class UpdateDeviceStateHandler implements ICommandHandler<UpdateDeviceStateCommand, Device> {
    private logger = new Logger(UpdateDeviceStateHandler.name);

    constructor(@Inject("DeviceRepository") private deviceRepo: DeviceRepository){}

    async execute(command: UpdateDeviceStateCommand): Promise<Device> {
        let device = await this.deviceRepo.findByFriendlyName(command.friendlyName)
        
        if(!device) {
            this.logger.log(`New device registered on runtime: ${command.friendlyName}`,)
            device = Device.create(command.friendlyName, command.deviceState)
        } else {
            device = device.updateState(command.deviceState)
        }

        if(command.publishToBroker){
            device.addEvent(new DeviceMqttContextUpdated(device));
        }

        this.deviceRepo.upsert(device)

        return device
    }
    
}