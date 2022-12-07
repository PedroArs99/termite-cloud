import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Device } from '../../models/Device.model';
import { DeviceDto } from './models/device-dto.model';
import { GetAllDevicesQuery } from '../../application/queries/GetAllDevices.handler';
import { ModifyDeviceStateCommand } from '../../application/commands/modifyDeviceState.command';

@Controller('/devices')
export class HomeDevicesRestController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async getAllDevices(): Promise<Array<DeviceDto>> {
    const result = await this.queryBus.execute(new GetAllDevicesQuery());

    return result.map((device: Device) => DeviceDto.fromDomain(device));
  }

  @Put('/:friendlyName')
  updateDeviceState(
    @Param('friendlyName') friendlyName: string,
    @Body() newState: Map<string, any>,
  ) {
    const command = new ModifyDeviceStateCommand(friendlyName, newState);

    this.commandBus.execute(command);
  }
}
