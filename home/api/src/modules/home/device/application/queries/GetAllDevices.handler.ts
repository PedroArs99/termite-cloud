import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Device } from '../../models/Device.model';
import { DeviceRepository } from '../ports/DeviceRepository.port';
import { GetAllDevicesQuery } from './GetAllDevices.query';

@QueryHandler(GetAllDevicesQuery)
export class GetAllDevicesHandler
  implements IQueryHandler<GetAllDevicesQuery, Array<Device>> {
    constructor(@Inject("DeviceRepository") private deviceRepo: DeviceRepository){}

    async execute(query: GetAllDevicesQuery): Promise<Device[]> {
        return this.deviceRepo.findAll()
    }
    
  }
