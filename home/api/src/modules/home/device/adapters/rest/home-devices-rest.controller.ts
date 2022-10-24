import { Controller, Get } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { GetAllDevicesQuery } from "../../application/queries/GetAllDevices.query";
import { DeviceDto } from "./models/device-dto.model";

@Controller("/devices")
export class HomeDevicesRestController {
    constructor(private queryBus: QueryBus){}

    @Get()
    async getAllDevices(): Promise<Array<DeviceDto>>{
        return this.queryBus.execute(new GetAllDevicesQuery())
    }
}