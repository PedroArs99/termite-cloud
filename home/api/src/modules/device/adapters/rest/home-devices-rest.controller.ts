import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateDeviceStateCommand } from '../../application/commands/updateState/updateState.command';
import { GetAllDevicesQuery } from '../../application/queries/GetAllDevices.query';
import { Device } from '../../models/Device.model';
import { DeviceDto } from './models/device-dto.model';
import {
  DeviceStateDto,
  deviceStateDtoToDomain,
} from './models/device-state-dto.model';

@Controller('/devices')
export class HomeDevicesRestController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async getAllDevices(): Promise<Array<DeviceDto>> {
    return this.queryBus.execute(new GetAllDevicesQuery());
  }

  @Put('/{friendlyName}')
  async updateDeviceState(
    @Param('friendlyName') friendlyName: string,
    @Body() newState: DeviceStateDto,
  ): Promise<DeviceDto> {
    const command = new UpdateDeviceStateCommand(
      friendlyName,
      deviceStateDtoToDomain(newState),
      true,
    );

    return this.commandBus.execute(command);
  }
}
