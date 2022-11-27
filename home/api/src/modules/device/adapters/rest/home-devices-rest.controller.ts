import { Controller, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Device } from '../../models/Device.model';
import { DeviceDto } from './models/device-dto.model';
import { GetAllDevicesQuery } from '../../application/queries/GetAllDevices.handler'; 

@Controller('/devices')
export class HomeDevicesRestController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async getAllDevices(): Promise<Array<DeviceDto>> {
    const result = await this.queryBus.execute(new GetAllDevicesQuery());

    return result.map((device: Device) => DeviceDto.fromDomain(device));
  }

  // @Put('/:friendlyName')
  // async updateDeviceState(
  //   @Param('friendlyName') friendlyName: string,
  // ): Promise<DeviceDto> {
  //   const command = new UpdateDeviceStateCommand(
  //     friendlyName,
  //   );

  //   const result = await this.commandBus.execute(command);

  //   return DeviceDto.fromDomain(result);
  // }
}
