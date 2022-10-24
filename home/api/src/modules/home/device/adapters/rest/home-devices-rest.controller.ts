import { Controller, Get } from "@nestjs/common";
import { DeviceDto } from "./models/device-dto.model";

@Controller("/devices")
export class HomeDevicesRestController {

    @Get()
    async getAllDevices(): Promise<Array<DeviceDto>>{
        return await new Array<DeviceDto>();
    }
}